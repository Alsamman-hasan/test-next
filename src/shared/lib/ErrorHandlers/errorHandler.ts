export const errorHandler = <T>(formData: T, fields: Array<keyof T>) => {
  const errors = fields
    .map(i => {
      if (!formData[i]) return `${i.toString()}`;
      return '';
    })
    .filter(i => !!i.length);
  if (errors.length) return errors;
  return undefined;
};

export const errorMessage = (value: string, name: string, error?: string[]) => {
  if (error) {
    if (error.includes(value)) return `${name} обязательное поле`;
    return undefined;
  }
  return undefined;
};

export const errorBasic = (
  value: string,
  message: string,
  error?: string[],
) => {
  if (error) {
    if (error.includes(value)) return message;
    return undefined;
  }
  return undefined;
};
