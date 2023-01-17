import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { getProfile } from '../../hooks/useProfile'

import Avatar from '../../layout/Avatar/Avatar'
import LoadSpinner from '../../layout/LoadSpinner/LoadSpinner'

export default function ChangeAvatar() {
  const { currentUser } = useAuth()

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', currentUser?.id],
    queryFn: async () => await getProfile(currentUser?.id ?? '')
  })

  return (
    <div className="flex flex-wrap items-center gap-4">
      {isProfileLoading && <LoadSpinner />}
      {profile && (
        <div className="relative overflow-hidden w-fit rounded-full hover:opacity-70 transition">
          <Avatar
            avatarUrl={profile?.avatar_url}
            size={'medium'}
            name={`${profile.email}'s avatar`}
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="opacity-0 absolute top-0 left-0 h-full w-full"
            title=""
          />
        </div>
      )}
    </div>
  )
}
