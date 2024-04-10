export interface SignInProps {
  signIn: (signInData: SignInTypes) => void;
}
export type SignInTypes = {
  email: string;
  password: string;
};
