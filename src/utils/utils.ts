export const computeId = (data: string): string => {
  const extractedId = data.match(/\d+/);
  return extractedId ? extractedId.toString() : "";
};

export const getPropertiesById = <Type>(propertyName: string, stringData: Array<string>, allData: Array<Type>) => {
  return allData.filter(value =>
    stringData.some(stringValue => (value as any).url == stringValue)).map(value=> (value as any)[propertyName]);
};