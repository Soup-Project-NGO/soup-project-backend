/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};