export enum Providers {
  AnimePahe = "animepahe",
  Enime = "enime",
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
  speed: number
  provider: Providers
  error?: ErrorInfo
}