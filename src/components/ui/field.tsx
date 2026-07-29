// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Labelled form control. Every input is named and described by its own label —
 * placeholders are hints, never labels.
 */
import type { ReactNode } from "react";

const CONTROL =
  "w-full rounded-control border border-border-hairline bg-surface-glass px-4 py-3 text-[0.9375rem] transition-colors duration-[var(--duration-fast)] ease-entrance placeholder:text-foreground-subtle focus:border-accent-soft-strong focus:outline-none";

export interface FieldProps {
  id: string;
  label: string;
  children?: ReactNode;
  /** Rendered under the control — hint text or a validation message. */
  hint?: string;
  invalid?: boolean;
  className?: string;
}

export const Field = ({ id, label, children, hint, invalid, className = "" }: FieldProps) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label htmlFor={id} className="text-xs tracking-wide text-foreground-muted">
      {label}
    </label>
    {children}
    {hint && (
      <p className={`text-xs ${invalid ? "text-signal-down" : "text-foreground-subtle"}`}>{hint}</p>
    )}
  </div>
);

export interface TextFieldProps extends Omit<FieldProps, "children"> {
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

export const TextField = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required,
  hint,
  invalid,
  className,
}: TextFieldProps) => (
  <Field id={id} label={label} hint={hint} invalid={invalid} className={className}>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={invalid || undefined}
      onChange={(event) => onChange(event.target.value)}
      className={`${CONTROL} ${invalid ? "border-signal-down" : ""}`}
    />
  </Field>
);

export interface SelectFieldProps extends Omit<FieldProps, "children"> {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}

export const SelectField = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  hint,
  invalid,
  className,
}: SelectFieldProps) => (
  <Field id={id} label={label} hint={hint} invalid={invalid} className={className}>
    <select
      id={id}
      name={name}
      value={value}
      aria-invalid={invalid || undefined}
      onChange={(event) => onChange(event.target.value)}
      className={`${CONTROL} appearance-none bg-background-elevated ${invalid ? "border-signal-down" : ""}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-background-elevated">
          {option.label}
        </option>
      ))}
    </select>
  </Field>
);
