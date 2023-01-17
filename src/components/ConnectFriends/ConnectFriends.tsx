import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'

import CopyIcon from '../../assets/CopyIcon'
import QRCode from 'react-qr-code'

export default function ConnectFriends() {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const id = currentUser?.id ?? ''
  const [codeCopied, setCodeCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const inviteLink = `${import.meta.env.VITE_APP_URL}/invite/${id}`

  const handleCopyCode = async () => {
    await navigator.clipboard?.writeText(id)
    setCodeCopied(true)
    setTimeout(() => {
      setCodeCopied(false)
    }, 1500)
  }

  const handleCopyLink = async () => {
    await navigator.clipboard?.writeText(inviteLink)
    setLinkCopied(true)
    setTimeout(() => {
      setLinkCopied(false)
    }, 1500)
  }

  return (
    <div className="max-w-xl p-6 mx-auto mt-5 bg-white border rounded-md shadow-md md:mt-10 dark:border-zinc-600 dark:bg-zinc-700">
      <h1 className="mb-5 text-xl font-semibold">
        {t('account.connect.title')}
      </h1>
      <h2 className="mb-2">{t('account.connect.description')}</h2>
      <p className="pt-5">{t('account.connect.code')}</p>
      <button
        onClick={handleCopyCode}
        title={t('account.connect.code-copy')}
        className="border px-2 py-1.5 rounded-md dark:border-zinc-500 dark:bg-zinc-600 bg-zinc-50 flex items-center gap-2 relative">
        <p className="text-left">{id}</p>
        <span className="w-fit">
          <CopyIcon />
          {codeCopied && (
            <span className="absolute -top-10 right-0 p-1.5 bg-white rounded-md dark:bg-zinc-600 border dark:border-zinc-500 w-max text-sm">
              {t('account.connect.copy-success')}
            </span>
          )}
        </span>
      </button>
      <p className="pt-5">{t('account.connect.link')}</p>
      <button
        onClick={handleCopyLink}
        title={t('account.connect.link-copy')}
        className="border px-2 py-1.5 rounded-md dark:border-zinc-500 dark:bg-zinc-600 bg-zinc-50 flex items-center gap-2 break-all relative">
        <p className="text-left">{inviteLink}</p>
        <span className="w-fit">
          <CopyIcon />
          {linkCopied && (
            <span className="absolute -top-10 right-0 p-1.5 bg-white rounded-md dark:bg-zinc-600 border dark:border-zinc-500 w-max text-sm">
              {t('account.connect.copy-success')}
            </span>
          )}
        </span>
      </button>
      <QRCode
        value={inviteLink}
        size={100}
        bgColor={'none'}
        fgColor={'#e4e4e7'}
        className="mt-10 filter invert dark:filter-none"
      />
    </div>
  )
}
