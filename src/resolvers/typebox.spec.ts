import { Type } from "typebox";
import { Compile } from "typebox/compile";
import { describe, expect, it } from "vitest";

import { rv } from "..";
import { resolver } from "./typebox";
import { TBDate } from "./typebox-helpers";

describe("TypeBox Resolver", () => {
  it("resolver core schema to typebox validator", () => {
    const schema = {
      name: "john doe",
      age: 30,
      description: 45,
      isActive: true,
      other: {
        name: "Jane Doe",
        age: 25,
      },
      hobbies: ["development"],
      cities: ["New York", 10],
      date: new Date("2023-01-01"),
    };

    const coreSchema = rv.object({
      name: rv.string({ description: "description test" }),
      age: rv.optional(rv.number()),
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

    const typeBoxSchema = Type.Object({
      name: Type.String({ description: "description test" }),
      age: Type.Optional(Type.Number()),
      isActive: Type.Boolean(),
      description: Type.Union([Type.String(), Type.Null()]),
      other: Type.Object({
        name: Type.String(),
        age: Type.Number(),
      }),
      hobbies: Type.Array(Type.String()),
      cities: Type.Tuple([Type.String(), Type.Number()]),
      date: Type.Required(Type.Union([TBDate, Type.String()])),
    });

    const resolvedTypeBox = resolver(coreSchema);

    expect(Compile(resolvedTypeBox).Parse(schema)).toEqual(
      Compile(typeBoxSchema).Parse(schema),
    );
  });
});
