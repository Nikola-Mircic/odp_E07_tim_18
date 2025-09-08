export const dateFormatter = (date: string): string => {
  return date.slice(0, 19).replace("T", " ");
}
