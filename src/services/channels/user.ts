import { supabase } from "../client";

export const joinRoom = supabase.channel("JOIN_ROOM");
export const listenRoom = supabase.channel("JOIN_ROOM");
