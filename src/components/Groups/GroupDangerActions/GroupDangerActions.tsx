import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useLocation } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'
import { removeParticipant } from '@/services/participants'
import { deleteGroup } from '@/services/groups'
import { useTranslation } from 'react-i18next'

import Modal from '@/layout/Modal/Modal'

interface Props {
  groupId: string
  creatorId: string | null
}

export default function GroupDangerActions({ groupId, creatorId }: Props) {
  const { t } = useTranslation('global')
  const [, setLocation] = useLocation()
  const { currentUser } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const isCreator = currentUser?.id === creatorId

  const { mutate: handleDeleteGroup } = useMutation({
    mutationFn: async () => await deleteGroup({ groupId }),
    onSuccess: () => setLocation('/groups')
  })

  const { mutate: handleLeaveGroup } = useMutation({
    mutationFn: async () =>
      await removeParticipant({ groupId, userId: currentUser?.id ?? '' }),
    onSuccess: () => setLocation('/groups')
  })

  const handleCancel = () => {
    setIsDeleting(false)
    setIsLeaving(false)
  }

  return (
    <div className="flex flex-wrap justify-end gap-2">
      {isCreator && (
        <button
          onClick={() => setIsDeleting(true)}
          className="px-3 py-2 text-sm text-red-700 transition bg-red-100 rounded-md shadow-md hover:bg-red-200">
          {t('group-info.delete')}
        </button>
      )}
      <button
        onClick={() => setIsLeaving(true)}
        className="px-3 py-2 text-sm transition bg-red-700 rounded-md shadow-md text-red-50 hover:bg-red-600">
        {t('group-info.leave')}
      </button>
      {isDeleting && (
        <Modal onClose={handleCancel}>
          <h1 className="text-2xl font-semibold text-center">
            {t('group-actions.delete.title')}
          </h1>
          <h2 className="mt-5 text-center">
            {t('group-actions.delete.info')}
            <strong> {t('group-actions.delete.info2')} </strong>
            {t('group-actions.delete.info3')}
          </h2>
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => handleDeleteGroup()}
              className="bg-red-7 bg-red-200 text-red-800 shadow-md rounded-md px-2 py-1.5 text-sm hover:bg-red-300 transition">
              {t('group-actions.delete.delete')}
            </button>
            <button
              onClick={handleCancel}
              className="bg-cyan-700 text-cyan-50 rounded-md px-2 py-1.5 text-sm shadow-md hover:bg-cyan-600 transition">
              {t('group-actions.delete.cancel')}
            </button>
          </div>
        </Modal>
      )}
      {isLeaving && (
        <Modal onClose={handleCancel}>
          <h1 className="text-2xl font-semibold text-center">
            {t('group-actions.leave.title')}
          </h1>
          <h2 className="mt-5 text-center">{t('group-actions.leave.info')}</h2>
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => handleLeaveGroup()}
              className="bg-red-7 bg-red-200 text-red-800 shadow-md rounded-md px-2 py-1.5 text-sm hover:bg-red-300 transition">
              {t('group-actions.leave.leave')}
            </button>
            <button
              onClick={handleCancel}
              className="bg-cyan-700 text-cyan-50 rounded-md px-2 py-1.5 text-sm shadow-md hover:bg-cyan-600 transition">
              {t('group-actions.leave.cancel')}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
