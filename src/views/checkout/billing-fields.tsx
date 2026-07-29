// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Step 2 — the fiscal data that goes on every invoice. The tax-identifier label
 * follows the selected country, because "NIT" and "Partita IVA" are not
 * interchangeable on a real invoice.
 */
"use client";

import { SelectField, TextField } from "@/components/ui/field";
import type { CountryOption } from "@/data/mocks/checkout";

export interface BillingData {
  entity: "company" | "individual";
  legalName: string;
  taxId: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface BillingFieldsProps {
  countries: readonly CountryOption[];
  value: BillingData;
  errors: Partial<Record<keyof BillingData, string>>;
  onChange: <K extends keyof BillingData>(key: K, next: BillingData[K]) => void;
}

export const BillingFields = ({ countries, value, errors, onChange }: BillingFieldsProps) => {
  const country = countries.find((item) => item.code === value.country) ?? countries[0];
  const isCompany = value.entity === "company";

  return (
    <div className="flex flex-col gap-5">
      <fieldset className="flex flex-wrap gap-2">
        <legend className="mb-2 text-xs tracking-wide text-foreground-muted">
          Tipo de cuenta
        </legend>
        {(["company", "individual"] as const).map((option) => (
          <label
            key={option}
            className={`cursor-pointer rounded-pill border px-4 py-2 text-sm transition-colors duration-[var(--duration-fast)] ease-entrance ${
              value.entity === option
                ? "border-transparent bg-foreground text-background"
                : "border-border-hairline text-foreground-muted hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              name="entity"
              value={option}
              checked={value.entity === option}
              onChange={() => onChange("entity", option)}
              className="sr-only"
            />
            {option === "company" ? "Empresa" : "Persona natural"}
          </label>
        ))}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="legalName"
          name="legalName"
          label={isCompany ? "Razón social" : "Nombre completo"}
          value={value.legalName}
          onChange={(next) => onChange("legalName", next)}
          placeholder={isCompany ? "OddsTrading Analytics S.A.S." : "Ana Restrepo"}
          autoComplete={isCompany ? "organization" : "name"}
          hint={errors.legalName}
          invalid={Boolean(errors.legalName)}
          required
        />
        <SelectField
          id="country"
          name="country"
          label="País de facturación"
          value={value.country}
          onChange={(next) => onChange("country", next)}
          options={countries.map((item) => ({ value: item.code, label: item.label }))}
        />
        <TextField
          id="taxId"
          name="taxId"
          label={`Identificación fiscal (${country.taxId})`}
          value={value.taxId}
          onChange={(next) => onChange("taxId", next)}
          placeholder={country.taxId}
          hint={errors.taxId}
          invalid={Boolean(errors.taxId)}
          required
        />
        <TextField
          id="contactName"
          name="contactName"
          label="Persona de contacto"
          value={value.contactName}
          onChange={(next) => onChange("contactName", next)}
          autoComplete="name"
          hint={errors.contactName}
          invalid={Boolean(errors.contactName)}
          required
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Correo de facturación"
          value={value.email}
          onChange={(next) => onChange("email", next)}
          placeholder="facturacion@empresa.com"
          autoComplete="email"
          hint={errors.email}
          invalid={Boolean(errors.email)}
          required
        />
        <TextField
          id="phone"
          name="phone"
          type="tel"
          label="Teléfono"
          value={value.phone}
          onChange={(next) => onChange("phone", next)}
          autoComplete="tel"
          hint={errors.phone}
          invalid={Boolean(errors.phone)}
        />
        <TextField
          id="address"
          name="address"
          label="Dirección fiscal"
          value={value.address}
          onChange={(next) => onChange("address", next)}
          autoComplete="street-address"
          hint={errors.address}
          invalid={Boolean(errors.address)}
          required
          className="sm:col-span-2"
        />
        <TextField
          id="city"
          name="city"
          label="Ciudad"
          value={value.city}
          onChange={(next) => onChange("city", next)}
          autoComplete="address-level2"
          hint={errors.city}
          invalid={Boolean(errors.city)}
          required
        />
        <TextField
          id="postalCode"
          name="postalCode"
          label="Código postal"
          value={value.postalCode}
          onChange={(next) => onChange("postalCode", next)}
          autoComplete="postal-code"
        />
      </div>
    </div>
  );
};
