// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bodyValidator = (body: Record<string, any> = {}, requiredProps: string[]) => {
  const missingProps: string[] = [];

  for (const prop of requiredProps) {
    if (!(prop in body) || !body[prop] && (typeof body[prop] !== 'boolean')) missingProps.push(prop);
  }

  const formattedMissingProps: string = missingProps.length ? missingProps.join(', ') : '';

  return {
    missingProps,
    formattedMissingProps,
  };
};
