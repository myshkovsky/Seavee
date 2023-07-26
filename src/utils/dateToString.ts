function dateToString(date: Date) {
  const formatted = new Date(date.getTime() - (date.getTimezoneOffset()*60*1000))
  return `${String(formatted.getMonth() + 1).padStart(2, '0')}/${formatted.getFullYear()}`
}

export default dateToString