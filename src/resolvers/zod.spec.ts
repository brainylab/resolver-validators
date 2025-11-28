import { describe, expect, it } from "vitest";
import { z } from "zod";

import { rv } from "..";
import { resolver } from "./zod";

describe("Zod Resolver", () => {
  it("resolver core schema to zod validator", () => {
    const schema = {
      name: "john doe",
      age: "30",
      description: "teste",
      isActive: true,
      other: {
        name: "Jane Doe",
        age: 25,
      },
      hobbies: ["development"],
      cities: ["New York", 10],
      date: new Date("2025-01-01"),
    };

    const coreSchema = rv.object({
      name: rv.string({ description: "description test", coerce: true }),
      age: rv.optional(rv.number({ min: 2, coerce: true })),
      isActive: rv.boolean(),
      description: rv.nullable(rv.string()),
      other: rv.object({
        name: rv.string(),
        age: rv.number(),
      }),
      hobbies: rv.array(rv.string()),
      cities: rv.tuple([rv.string(), rv.number()]),
      date: rv.or(rv.date(), rv.string()),
    });

    const zodSchema = z.object({
      name: z.string().describe("description test"),
      age: z.coerce.number().min(2).optional(),
      isActive: z.boolean(),
      description: z.string().nullable(),
      other: z.object({
        name: z.string(),
        age: z.number(),
      }),
      hobbies: z.array(z.string()),
      cities: z.tuple([z.string(), z.number()]),
      date: z.date().or(z.string()),
    });

    const resolvedZod = resolver(coreSchema);

    expect(resolvedZod.parse(schema)).toEqual(zodSchema.parse(schema));
  });

  it("resolve zod schema with optinal and nullable", () => {
    const schema = {
      name: {
        reference: "5087",
      },
    };

    const coreSchema = rv.object({
      name: rv.nullable(
        rv.optional(
          rv.object({
            reference: rv.string(),
          }),
        ),
      ),
    });

    const zodSchema = z.object({
      name: z
        .object({
          reference: z.string(),
        })
        .optional()
        .nullable(),
    });

    const resolvedZod = resolver(coreSchema);

    expect(resolvedZod.parse(schema)).toEqual(zodSchema.parse(schema));
  });
});
