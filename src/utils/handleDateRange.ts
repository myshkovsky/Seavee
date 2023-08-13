// eslint-disable-next-line
// @ts-ignore
export function handleDateRange(entry, rawValues) {
  const newEntry = entry
  if (Array.isArray(rawValues.range)) {
    newEntry.started = rawValues.range[0]["$d"]
    newEntry.ended = rawValues.range[1]["$d"]
    newEntry.current = false
  } else {
    newEntry.started = rawValues.single?.$d as Date
    newEntry.current = true
  }
  return newEntry
}