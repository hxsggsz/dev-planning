import { SignUpTypes } from "@/types/auth";

export type AuthType = Pick<SignUpTypes, "email" | "password">;
