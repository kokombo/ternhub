type KeyValuePair = {
  key: string;
  value: string | number | boolean;
};

export const getValueByKeyInArray = (
  array: KeyValuePair[],
  keyToFind: string
) => {
  const keyValueObject = array?.find((item) => item.key === keyToFind);

  return keyValueObject ? keyValueObject.value : undefined;
};
