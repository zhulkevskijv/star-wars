export const computeId = (data: string): string => {
  const extractedId = data.match(/\d+/);
  return extractedId ? extractedId.toString() : "";
};