import { type Session } from "next-auth"

export interface AnimeSession extends Session {
  isAdult?: boolean
}
