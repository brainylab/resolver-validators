import z, { type ZodDate } from "zod"

export function ZDDate(): ZodDate {
  return z.date()
}
