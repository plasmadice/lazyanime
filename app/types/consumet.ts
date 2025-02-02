export enum Providers {
  AnimePahe = "animepahe",
  Gogoanime = "gogoanime",
  Marin = "marin",
  Zoro = "zoro",
}

export interface ErrorInfo {
  error: string
  description: string
}

export type Speed = number | ErrorInfo

export interface AnimeSpeeds {
  [key: string]: Speed
}

export interface Ping {
  provider: Providers
  speed?: number
  error?: ErrorInfo
}