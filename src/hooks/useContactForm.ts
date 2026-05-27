"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import {
  type ContactErrors,
  type ContactField,
  type ContactInput,
  validateContact,
} from "@/services/contact";

export type SubmitStatus = "idle" | "sending" | "sent" | "error";

const EMPTY_FORM: ContactInput = {
  name: "",
  email: "",
  message: "",
};
const SENT_RESET_MS = 6000;

export function useContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const isBusy = status === "sending" || status === "sent";

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    const fieldErrors = validateContact({
      ...values,
      [field]: event.target.value,
    });
    setErrors((previous) => ({ ...previous, [field]: fieldErrors?.[field] }));
  }

  async function sendMessage(input: ContactInput) {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("sent");
      setValues(EMPTY_FORM);
      window.setTimeout(() => setStatus("idle"), SENT_RESET_MS);
    } catch {
      setStatus("error");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateContact(values);
    if (validationErrors) {
      setErrors(validationErrors);
      window.setTimeout(() => {
        formRef.current
          ?.querySelector<HTMLElement>("[aria-invalid='true']")
          ?.focus();
      }, 0);
      return;
    }
    setErrors({});
    void sendMessage(values);
  }

  return {
    values,
    errors,
    status,
    isBusy,
    formRef,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
