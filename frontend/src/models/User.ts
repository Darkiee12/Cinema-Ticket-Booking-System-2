export default interface User {
  userId?: number;
  name: string;
  gender: string;
  email: string;
  password: string;
  phoneNumber: number;
  dateOfBirth: string;
  tier: string;
}

export interface Credential{
  email: string;
  password: string;
}