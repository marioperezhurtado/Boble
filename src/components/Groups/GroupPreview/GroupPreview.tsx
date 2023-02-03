import { Link, useLocation } from 'wouter'

import Avatar from '@/layout/Avatar/Avatar'

import InfoIcon from '@/assets/InfoIcon'

import type { Group } from '@/types/chat'

interface Props {
  group: Group
}

export default function ChannelPreview({ group }: Props) {
  const { id, name, avatar_url: imageUrl } = group

  const [, setLocation] = useLocation()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setLocation(`/groups/${id}/info`)
  }

  return (
    <Link
      to={`/groups/${id}`}
      className="flex items-center w-full gap-4 px-6 py-3 border-t dark:border-zinc-700">
      <Avatar size="medium" avatarUrl={imageUrl} name={name} />
      <p className="font-bold break-all">{name}</p>
      <button
        onClick={handleClick}
        className="p-2 ml-auto transition rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-600">
        <InfoIcon />
      </button>
    </Link>
  )
}
