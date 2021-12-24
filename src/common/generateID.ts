export const generateID = (): string => {
  const ID = Math.floor(Math.random() * (9999 - 1000)) + 1000

  return ID.toString()
}
