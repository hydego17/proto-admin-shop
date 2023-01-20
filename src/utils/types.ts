import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

export type CustomQueryOptions<T = unknown, E = unknown> = Omit<UseQueryOptions<T, E, T, any>, 'queryKey' | 'queryFn'>;

export type CustomMutationOptions<T = unknown, E = unknown, V = any> = UseMutationOptions<T, E, V, any>;

/**
 * Retrieve element type info from array type
 */
export type InferArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;
