import { describe, expect, it } from "vitest";
import { z } from "zod";

import { rv } from "..";
import { resolver } from "./zod";

describe("Zod Resolver", () => {
  it("resolver core schema to zod validator", () => {
    const schema = {
      name: "john doe",
      age: 30,
      description: "teste",
      isActive: true,
      other: {
        name: "Jane Doe",
        age: 25,
      },
      hobbies: ["development"],
      cities: ["New York", 10],
      date: "",
    };

    const coreSchema = rv.object({
      name: rv.string({ description: "description test" }),
      age: rv.optional(rv.number({ min: 2 })),
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
      age: z.number().min(2).optional(),
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
});
