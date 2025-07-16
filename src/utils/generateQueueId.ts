export const generateQueueId = (hostName: string): string => {
  const cleanName = hostName.toLowerCase().replace(/\s+/g, '').substring(0, 5)
  const unique = Math.random().toString(36).substring(2, 8)
  return `${cleanName}-${unique}`
}
