import { User } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export function decodeJWT(JWT: string) {
  const decodedJWT = jwtDecode<User>(JWT);

  return decodedJWT;
}
