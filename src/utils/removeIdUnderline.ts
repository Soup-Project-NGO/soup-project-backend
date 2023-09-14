import type { WithId } from 'mongodb';

/**
 * Remove o campo _id de um objeto e renomeia-o para id.
 * @param data O objeto com _id a ser transformado.
 * @returns Um novo objeto com _id removido e renomeado para id.
 */
export const removeIdUnderline = <T>(data: WithId<T>) => {
  const { _id, ...rest } = data;

  return {
    id: _id.toHexString(),
    ...rest
  };
};