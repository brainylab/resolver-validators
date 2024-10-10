/* eslint-disable import/order */
export type * from './types/infer-types';
export type * from './types/helpers';
export type * from './types/infer-types';
export type * from './types/params';
export type * from './types/schema';

import { array } from './core/array';
export type * from './types/array';

import { boolean } from './core/boolean';
export type * from './types/boolean';

import { date } from './core/date';
export type * from './types/date';

import { number } from './core/number';
export type * from './types/number';

import { object } from './core/object';
export type * from './types/object';

import { optional } from './core/optional';
export type * from './types/optional';

import { string } from './core/string';
export type * from './types/string';

import { tuple } from './core/tuple';
export type * from './types/tuple';

export * from './core/utils';
import { isArray, isObject, isTuple } from './core/utils';

export const rv = {
	array,
	boolean,
	date,
	number,
	object,
	optional,
	string,
	tuple,
	isArray,
	isObject,
	isTuple,
};
