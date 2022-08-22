export type RegistrationData = {
  email: string,
  name: string,
  password: string,
}

export type AutenticationData = {
  email: string,
  password: string,
}

export type SignInResponse = {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string,
}
