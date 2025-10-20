export type FixedLengthArray<T, N extends number, A extends T[] = []> =
    A['length'] extends N
        ? A
        : FixedLengthArray<T, N, [...A, T]>;
