import { Person } from "types";

export const computeId = (data: string): string => {
  const extractedId = data.match(/\d+/);
  return extractedId ? extractedId.toString() : "";
};

export const getPropertiesById = <Type>(propertyName: string, stringData: Array<string>, allData: Array<Type>) => {
  return allData.filter(value =>
    stringData.some(stringValue => (value as any).url == stringValue)).map(value=> (value as any)[propertyName]);
};

export const comparePeople = (a : Person, b : Person) : number => +computeId(a.url) - +computeId(b.url);

export const computeYear = (year : string) : number => {
  const extractedYear = year.match(/\d+/);
  if (extractedYear)
    return +extractedYear.toString() * (year.slice(-3)[0] === "B" ? -1 : 1 );
  return 0;
};