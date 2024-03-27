import { supabase } from "../client";
import { SignUpTypes } from "@/types/auth";

export class UserService {
  static async updateUsername(username: SignUpTypes["username"]) {
    const response = await supabase.auth.updateUser({
      data: {
        username,
      },
    });

    return response;
  }

  static async uploadFile(fileName: string, file: FileList) {
    const response = await supabase.storage
      .from("images")
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      .upload(fileName, file?.item(0)!, {
        cacheControl: "3600",
        upsert: false,
      });

    return response;
  }

  static async updateProfilePicture(profilePic: string) {
    const response = await supabase.auth.updateUser({
      data: {
        profilePic,
      },
    });

    return response;
  }

  static async getUser() {
    const response = await supabase.auth.getUser();

    return response;
  }
}
