import { useState } from 'react'
import { createPortal } from 'react-dom'

import CopyInviteCode from '../CopyInviteCode/CopyInviteCode'

interface Props {
  size: 'small' | 'medium' | 'large'
  avatarUrl: string | null
  name: string
  id?: string
}

const SIZES = {
  small: 'w-8 h-8',
  medium: 'w-14 h-14',
  large: 'w-20 h-20'
}

export default function Avatar({ size, avatarUrl, name, id }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const defaultLetter = name[0]?.toUpperCase()

  const handleLoad = () => setLoaded(true)
  const handleError = () => setError(true)

  const handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setExpanded(true)
  }
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setExpanded(false)
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
    <>
      <div
        onClick={handleExpand}
        className={`overflow-hidden rounded-full min-w-fit cursor-pointer ${SIZES[size]}`}>
        <img
          onLoad={handleLoad}
          onError={handleError}
          src={avatarUrl}
          alt={`${name} avatar`}
          className={`object-cover w-full h-full aspect-square bg-zinc-100 dark:bg-zinc-800 
        ${loaded ? '' : 'hidden'}`}
        />
      </div>
      {expanded &&
        createPortal(
          <>
            <div
              onClick={handleClose}
              className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-75 dark:opacity-50"
            />
            <div
              className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-md sm:shadow-md lg:max-w-xl overflow-hidden border dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800
              ${loaded ? '' : 'hidden'}`}>
              <img
                onLoad={handleLoad}
                onError={handleError}
                src={avatarUrl}
                alt={`${name} avatar expanded`}
                className="w-full"
              />
              <div className="flex items-center justify-between max-w-full p-1 break-words gap-4">
                <p className="ml-2 font-semibold text-zinc-700 dark:text-zinc-200">
                  ~ {name}
                </p>
                {id && <CopyInviteCode id={id} />}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  )
}
