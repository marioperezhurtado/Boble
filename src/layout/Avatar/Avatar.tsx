import { useState } from 'react'

interface Props {
  size: 'small' | 'medium' | 'large'
  avatarUrl: string | null
  name: string
}

const SIZES = {
  small: 'w-8 h-8',
  medium: 'w-14 h-14',
  large: 'w-20 h-20'
}

export default function Avatar({ size, avatarUrl, name }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const defaultLetter = name[0].toUpperCase()

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true)
  }
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setError(true)
  }

  if (!avatarUrl || error) {
    return (
      <div
        className={`overflow-hidden rounded-full min-w-fit items-center flex justify-center  bg-cyan-700 text-cyan-50 ${SIZES[size]}`}>
        <p className="text-2xl font-bold">{defaultLetter}</p>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden rounded-full min-w-fit ${SIZES[size]}`}>
      <img
        onLoad={handleLoad}
        onError={handleError}
        src={avatarUrl}
        alt={`${name} avatar`}
        className={`object-cover w-full h-full aspect-square 
        ${loaded ? '' : 'hidden'}`}
      />
    </div>
  )
}
