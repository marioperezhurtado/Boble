import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { uploadUserAvatar } from '@/services/avatar'

import Avatar from '@/layout/Avatar/Avatar'

import type { User } from '@/types/chat'

export default function ChangeUserAvatar({ profile }: { profile: User }) {
  const { currentUser } = useAuth()
  const [date, setDate] = useState<number>(Date.now())

  const refreshAvatar = () => {
    setDate(Date.now())
  }

  const { mutate } = useMutation({
    mutationFn: async ({ avatar }: { avatar: File }) => {
      await uploadUserAvatar({
        id: currentUser?.id ?? '',
        avatar
      })
    },
    onSuccess: refreshAvatar
  })

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    mutate({ avatar: file })
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative overflow-hidden rounded-full w-fit group">
        <div className="transition group-hover:brightness-50">
          <Avatar
            avatarUrl={`${profile.avatar_url ?? ''}?${date}`}
            size={'medium'}
            name={profile.full_name ?? profile.email}
          />
        </div>
        <div className="absolute font-bold text-white transition -translate-x-1/2 -translate-y-1/2 opacity-0 cursor-pointer group-hover:opacity-100 top-1/2 left-1/2">
          <img src="/camera.svg" alt="Upload avatar" />
        </div>
        <input
          onChange={handleChangeAvatar}
          type="file"
          name="avatar"
          accept="image/*"
          className="absolute top-0 left-0 z-10 w-full h-full opacity-0"
          title=""
          aria-label="Upload avatar"
        />
      </div>
    </div>
  )
}
