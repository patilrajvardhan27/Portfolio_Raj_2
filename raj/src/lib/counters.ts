/**
 * Public hit counters kept on Abacus (free, no account). The README badges
 * read the same counters, so renaming a key here means updating README.md too.
 */
const COUNTER_API_URL = "https://abacus.jasoncameron.dev"
const COUNTER_NAMESPACE = "raj-portfolio"
const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1"]

export type CounterKey = "visitors" | "music-plays"

/** Adds one to a counter. Never throws: a lost count must not break the site. */
export const hitCounter = async (key: CounterKey): Promise<void> => {
  if (LOCAL_HOSTNAMES.includes(window.location.hostname)) {
    console.log(`[counters] skipping ${key} on localhost`)
    return
  }

  try {
    const response = await fetch(
      `${COUNTER_API_URL}/hit/${COUNTER_NAMESPACE}/${key}`
    )
    const { value } = (await response.json()) as { value: number }
    console.log(`[counters] ${key}: ${value}`)
  } catch (error) {
    console.log(`[counters] could not count ${key}`, error)
  }
}
