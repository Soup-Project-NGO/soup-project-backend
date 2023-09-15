import type { WithId } from 'mongodb';

export const removeIdUnderline = <T>(data: WithId<T> | null) => {
  if (!data) return null;

  const { _id, ...rest } = data;

  return {
    id: _id.toHexString(),
    ...rest
  };
};