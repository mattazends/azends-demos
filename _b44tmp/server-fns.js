import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const QuoteRequestInput = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).default(""),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  notes: z.string().trim().max(2000).default(""),
  property_type: z.string().max(80).default(""),
  locations: z.string().max(40).default(""),
  boroughs: z.array(z.string().max(40)).max(10).default([]),
  services: z.array(z.string().max(60)).max(10).default([]),
  source_page: z.string().max(200).default("/"),
});

// Saves a quote request from the public website form. Anyone can submit,
// so input is validated and bounded; only admins can read the records (entity RLS).
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator(QuoteRequestInput)
  .handler(async ({ data, context }) => {
    const base44 = context.getBase44();
    await base44.entities.QuoteRequest.create({ ...data, status: "new" });
    return { ok: true };
  });
