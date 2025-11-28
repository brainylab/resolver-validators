import {
  array,
  boolean,
  date,
  nullable,
  number,
  object,
  optional,
  or,
  string,
  tuple,
} from "./rv";
import { isArray, isObject, isTuple } from "./utils";

export type { InferTypes, RVSchema } from "./types";

export const rv = {
  array,
  boolean,
  date,
  number,
  object,
  optional,
  nullable,
  or,
  string,
  tuple,
  isArray,
  isObject,
  isTuple,
};
