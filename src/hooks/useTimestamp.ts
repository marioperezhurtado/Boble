export default function useTimestamp(timestamp: string) {
  const initialDate = new Date(Date.parse(timestamp))
  const time = initialDate.toLocaleTimeString(navigator.language, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${time}`
}
