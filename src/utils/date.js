export const formatFecha = fecha => {
  if (!fecha) return null

  const date = new Date(fecha)

  if (isNaN(date.getTime())) return null

  if (date.getUTCFullYear() === 1900) return null

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const toISOString = fecha => {
  if (!fecha) return null

  const date = new Date(fecha)

  if (isNaN(date.getTime())) return null

  return date.toISOString()
}
