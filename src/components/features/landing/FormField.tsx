"use client";

import type { ChangeEvent, FocusEvent } from "react";
import type { ContactField } from "@/services/contact";

interface FormFieldProps {
  name: ContactField;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FIELD_BASE =
  "w-full rounded-xl bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-white/30 outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-accent-glow";

function controlClass(hasError: boolean): string {
  const border = hasError
    ? "border border-brand-error/70"
    : "border border-brand-teal/15 focus:border-brand-teal/50";
  return `${FIELD_BASE} ${border}`;
}

export default function FormField({
  name,
  label,
  placeholder,
  value,
  error,
  type = "text",
  autoComplete,
  multiline = false,
  onChange,
  onBlur,
}: FormFieldProps) {
  const hasError = Boolean(error);
  const errorId = `${name}-error`;
  const ariaInvalid = hasError ? "true" : undefined;
  const describedBy = hasError ? errorId : undefined;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-white/80"
      >
        {label}{" "}
        <span className="text-brand-error" aria-hidden>
          *
        </span>
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={4}
          required
          aria-required="true"
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${controlClass(hasError)} resize-none`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          aria-required="true"
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={controlClass(hasError)}
        />
      )}
      {hasError ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-brand-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
