"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import CheckIcon from "@/components/ui/icons/CheckIcon";
import SendIcon from "@/components/ui/icons/SendIcon";
import { CONTACT_EMAIL } from "@/constants/landing";
import {
  type ContactErrors,
  type ContactField,
  type ContactInput,
  validateContact,
} from "@/services/contact";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

interface FieldConfig {
  name: ContactField;
  label: string;
  placeholder: string;
  type: string;
  autoComplete: string;
}

const TEXT_FIELDS: readonly FieldConfig[] = [
  {
    name: "name",
    label: "Your name",
    placeholder: "Jane Doe",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Work email",
    placeholder: "jane@company.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "company",
    label: "Company",
    placeholder: "Company name",
    type: "text",
    autoComplete: "organization",
  },
];

const EMPTY_FORM: ContactInput = { name: "", email: "", company: "", message: "" };
const SENT_RESET_MS = 6000;

const LABEL_CLASS = "mb-1.5 block text-sm font-medium text-white/80";
const FIELD_BASE =
  "w-full rounded-xl bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-white/30 outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-accent-glow";

function fieldClass(hasError: boolean): string {
  const border = hasError
    ? "border border-brand-error/70"
    : "border border-brand-teal/15 focus:border-brand-teal/50";
  return `${FIELD_BASE} ${border}`;
}

export default function ContactForm() {
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

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border border-brand-teal/10 bg-white/5 p-8"
    >
      {TEXT_FIELDS.map((field) => {
        const error = errors[field.name];
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className={LABEL_CLASS}>
              {field.label}{" "}
              <span className="text-brand-error" aria-hidden>
                *
              </span>
            </label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required
              aria-required="true"
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error ? `${field.name}-error` : undefined}
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass(Boolean(error))}
            />
            {error ? (
              <p
                id={`${field.name}-error`}
                role="alert"
                className="mt-1.5 text-sm text-brand-error"
              >
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      <div>
        <label htmlFor="message" className={LABEL_CLASS}>
          How can we help?{" "}
          <span className="text-brand-error" aria-hidden>
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your team and goals..."
          rows={4}
          required
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${fieldClass(Boolean(errors.message))} resize-none`}
        />
        {errors.message ? (
          <p
            id="message-error"
            role="alert"
            className="mt-1.5 text-sm text-brand-error"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isBusy}
        className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-teal-dark py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-glow disabled:cursor-default disabled:hover:scale-100"
      >
        {status === "sending" ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden
            />
            Sending…
          </>
        ) : status === "sent" ? (
          <>
            <CheckIcon className="h-4 w-4" />
            Message sent
          </>
        ) : (
          <>
            <SendIcon className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>

      {status === "sent" ? (
        <p className="text-center text-sm text-brand-teal-light">
          Thanks — your message is on its way. We&apos;ll be in touch shortly.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="text-center text-sm text-brand-error">
          Sorry, something went wrong. Please email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand-teal-light underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}

      <p role="status" aria-live="polite" className="sr-only">
        {status === "sent"
          ? "Your message has been sent."
          : status === "error"
            ? "Your message could not be sent."
            : ""}
      </p>
    </form>
  );
}
