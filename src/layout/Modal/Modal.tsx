import { createPortal } from 'react-dom'

interface Props {
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children }: Props) {
  return createPortal(
    <>
      <div
        onClick={onClose}
        role="presentation"
        className="fixed top-0 left-0 z-10 w-full h-screen bg-black opacity-75 dark:opacity-50"
      />
      <div className="fixed z-20 w-full -translate-x-1/2 -translate-y-1/2 sm:w-10/12 top-1/2 sm:top-1/3 left-1/2 sm:max-w-xl">
        <div className="p-6 mx-4 border rounded-md shadow-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200">
          {children}
        </div>
      </div>
    </>,
    document.body
  )
}
