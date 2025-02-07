// export * from "./snack"
export * from "./session"
export * from "./graphql"
export * from "./consumet"

export function formatDate(date: { year: number | null; month: number | null; day: number | null }) {
  if (!date.year || !date.month || !date.day) return "TBA"
  return new Date(date.year, date.month - 1, date.day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTimeUntilAiring(timeUntilAiring: number) {
  const seconds = timeUntilAiring
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  const parts = []
  if (days > 0) parts.push(`${days} day${days === 1 ? "" : "s"}`)
  if (hours > 0) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`)
  if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`)

  return parts.join(", ")
}