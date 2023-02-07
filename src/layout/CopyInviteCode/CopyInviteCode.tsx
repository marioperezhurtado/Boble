import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import CopyIcon from '@/assets/CopyIcon'

interface Props {
  id?: string
}

export default function CopyInviteCode({ id }: Props) {
  const { t } = useTranslation('global')
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyIdToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!id) return

    await navigator.clipboard?.writeText(id)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  return (
    <button
      onClick={handleCopyIdToClipboard}
      type="button"
      aria-label="Copy your invite code"
      title={t('create-chat.clipboard')}
      className="p-1.5 border rounded-md bg-white hover:bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600 relative text-sm font-normal">
      <CopyIcon />
      {isCopied && (
        <span className="absolute -top-10 right-0 p-1.5 bg-white rounded-md dark:bg-zinc-700 border dark:border-zinc-600 w-max text-zinc-700 dark:text-zinc-200">
          {t('create-chat.clipboard-success')}
        </span>
      )}
    </button>
  )
}
