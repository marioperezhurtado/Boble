import { useState } from 'react'
import { createPortal } from 'react-dom'

export default function Media({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = () => {
    setIsExpanded(true)
  }
  const handleClose = () => {
    setIsExpanded(false)
  }

  return (
    <div className="relative">
      {children}
      <button
        onClick={handleExpand}
        className="absolute px-1 overflow-hidden rounded-md bottom-1 right-1 backdrop-invert backdrop-opacity-20">
        <img src="/expand.svg" alt="Expand media" className="w-5 h-5" />
      </button>
      {isExpanded &&
        createPortal(
          <>
            <div
              onClick={handleClose}
              role="presentation"
              className="fixed top-0 left-0 z-10 w-full h-screen bg-black opacity-75 dark:opacity-50"
            />
            <div className="fixed z-20 -translate-x-1/2 -translate-y-1/2 w-fit top-1/2 left-1/2">
              <div className="mx-4 border rounded-md shadow-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200">
                {children}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  )
}
