export enum MediaSort {
  ID = "ID",
  ID_DESC = "ID_DESC",
  TITLE_ROMAJI = "TITLE_ROMAJI",
  TITLE_ROMAJI_DESC = "TITLE_ROMAJI_DESC",
  TITLE_ENGLISH = "TITLE_ENGLISH",
  TITLE_ENGLISH_DESC = "TITLE_ENGLISH_DESC",
  TITLE_NATIVE = "TITLE_NATIVE",
  TITLE_NATIVE_DESC = "TITLE_NATIVE_DESC",
  TYPE = "TYPE",
  TYPE_DESC = "TYPE_DESC",
  FORMAT = "FORMAT",
  FORMAT_DESC = "FORMAT_DESC",
  START_DATE = "START_DATE",
  START_DATE_DESC = "START_DATE_DESC",
  END_DATE = "END_DATE",
  END_DATE_DESC = "END_DATE_DESC",
  SCORE = "SCORE",
  SCORE_DESC = "SCORE_DESC",
  POPULARITY = "POPULARITY",
  POPULARITY_DESC = "POPULARITY_DESC",
  TRENDING = "TRENDING",
  TRENDING_DESC = "TRENDING_DESC",
  EPISODES = "EPISODES",
  EPISODES_DESC = "EPISODES_DESC",
  DURATION = "DURATION",
  DURATION_DESC = "DURATION_DESC",
  STATUS = "STATUS",
  STATUS_DESC = "STATUS_DESC",
  CHAPTERS = "CHAPTERS",
  CHAPTERS_DESC = "CHAPTERS_DESC",
  VOLUMES = "VOLUMES",
  VOLUMES_DESC = "VOLUMES_DESC",
  UPDATED_AT = "UPDATED_AT",
  UPDATED_AT_DESC = "UPDATED_AT_DESC",
  SEARCH_MATCH = "SEARCH_MATCH",
  FAVOURITES = "FAVOURITES",
  FAVOURITES_DESC = "FAVOURITES_DESC",
  AVERAGE_SCORE = "AVERAGE_SCORE",
  AVERAGE_SCORE_DESC = "AVERAGE_SCORE_DESC",
}

export type Anime = {
  id: number
  title: {
    romaji: string | null
    english: string | null
    native: string | null
  }
  startDate: {
    year: number | null
    month: number | null
    day: number | null
  }
  endDate: {
    year: number | null
    month: number | null
    day: number | null
  }
  description: string | null
  coverImage: {
    extraLarge: string | null
    large: string | null
    medium: string | null
    color: string | null
  }
  status: string | null
  format: string | null
  episodes: number | null
  duration: number | null
  genres: string[]
  averageScore: number | null
  popularity: number | null
  siteUrl: string | null
  nextAiringEpisode: {
    airingAt: number | null
    timeUntilAiring: number | null
    episode: number | null
  } | null
  isAdult: boolean | null
}

export interface AnimeDetails extends Anime {
  id: number
  title: {
    romaji: string | null
    english: string | null
    native: string | null
  }
  startDate: {
    year: number | null
    month: number | null
    day: number | null
  }
  endDate: {
    year: number | null
    month: number | null
    day: number | null
  }
  description: string | null
  coverImage: {
    extraLarge: string | null
    large: string | null
    medium: string | null
    color: string | null
  }
  type: string | null
  status: string | null
  format: string | null
  episodes: number | null
  duration: number | null
  genres: string[]
  averageScore: number | null
  popularity: number | null
  siteUrl: string | null
  nextAiringEpisode: {
    airingAt: number | null
    timeUntilAiring: number | null
    episode: number | null
  } | null
  isAdult: boolean | null
  trailer: {
    id: string | null
    site: string | null
    thumbnail: string | null
  } | null
  characters: {
    edges: {
      node: {
        id: number
        name: {
          first: string | null
          last: string | null
          full: string | null
          native: string | null
        }
        image: {
          large: string | null
        }
      }
      role: string | null
      voiceActors: {
        id: number
        name: {
          first: string | null
          last: string | null
          full: string | null
          native: string | null
        }
        image: {
          large: string | null
        }
      }[]
    }[]
  }
  staff: {
    edges: {
      node: {
        id: number
        name: {
          first: string | null
          last: string | null
          full: string | null
          native: string | null
        }
      }
      role: string | null
    }[]
  }
  studios: {
    edges: {
      node: {
        id: number
        name: string | null
      }
    }[]
  }
  relations: {
    edges: {
      node: {
        id: number
        title: {
          romaji: string | null
          english: string | null
        }
        coverImage: {
          medium: string | null
        }
        averageScore: number | null
        popularity: number | null
        type: string | null
      }
      relationType: string | null
    }[]
  }
}

export type AnimeResponse = {
  Page: {
    pageInfo: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
    }
    media: Anime[]
  }
}
