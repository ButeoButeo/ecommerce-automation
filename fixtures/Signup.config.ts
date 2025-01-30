export const getEmailAndPasswordWithUniqueSuffix = (uniqueId: string) => ({
  email: `test+${uniqueId}@gmail.com`,
  password: `${uniqueId}@Password2025`,
})
