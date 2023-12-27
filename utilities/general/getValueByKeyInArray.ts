export const getValueByKeyInArray = (array: any[], keyToFind: string) => {
  const keyValueObject = array?.find((item) => item.key === keyToFind);

  return keyValueObject ? keyValueObject.value : undefined;
};
