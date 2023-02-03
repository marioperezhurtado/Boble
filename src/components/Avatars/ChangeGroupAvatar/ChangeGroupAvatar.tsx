import { uploadGroupAvatar } from '@/services/avatar'
import { useAuth } from '@/contexts/AuthContext'

import Avatar from '@/layout/Avatar/Avatar'

import type { Group } from '@/types/chat'

export default function ChangeGroupAvatar({ group }: { group: Group }) {
  const { currentUser } = useAuth()
  const isUserCreator = currentUser?.id === group.creator_id
  const { id: groupId, avatar_url: imageUrl, name } = group

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    await uploadGroupAvatar({
      groupId,
      avatar: file
    })
  }

  return (
    <div className="relative overflow-hidden rounded-full w-fit group">
      <div
        className={`transition ${
          isUserCreator ? 'group-hover:brightness-50' : ''
        }`}>
        <Avatar avatarUrl={imageUrl} size="large" name={name} />
      </div>
      {isUserCreator && (
        <>
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
        </>
      )}
    </div>
  )
}
