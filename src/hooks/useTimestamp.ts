interface UseTimestamp {
  timestamp: string | null
  type: 'time' | 'date' | 'datetime'
}

export default function useTimestamp({ timestamp, type }: UseTimestamp) {
  if (!timestamp) return ''

  const initialDate = new Date(Date.parse(timestamp))

  switch (type) {
    case 'date':
      return initialDate.toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
    case 'datetime':
      return initialDate.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    case 'time':
      return initialDate.toLocaleTimeString(navigator.language, {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    default:
      return ''
  }
}
