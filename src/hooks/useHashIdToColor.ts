interface HashIdToColor {
  id: string
  userId: string
}

export function useHashIdToColor({ id, userId }: HashIdToColor) {
  const colors = [
    'bg-orange-300 text-orange-900',
    'bg-blue-300 text-blue-900',
    'bg-green-300 text-green-900',
    'bg-red-300 text-red-900',
    'bg-purple-300 text-purple-900',
    'bg-yellow-300 text-yellow-900'
  ]

  const hash = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
  }

  const color = colors[hash(id + userId) % colors.length] || colors[0]

  return color
}
