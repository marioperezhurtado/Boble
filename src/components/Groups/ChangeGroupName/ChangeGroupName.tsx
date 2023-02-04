import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateGroup } from '@/services/groups'
import { useAuth } from '@/contexts/AuthContext'
import useOnClickOutside from '@/hooks/useOnClickOutside'

import EditIcon from '@/assets/EditIcon'

import type { Group } from '@/types/chat'

export default function ChangeGroupName({ group }: { group: Group }) {
  const ref = useRef<HTMLFormElement>(null)
  const { currentUser } = useAuth()
  const { id: groupId, name } = group
  const [currentName, setCurrentName] = useState(name)
  const [isEditing, setIsEditing] = useState(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: updateGroup,
    onSuccess: () => setIsEditing(false)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentName || currentName === name) return

    mutate({
      groupId,
      name: currentName
    })
  }

  const handleStartEditing = () => setIsEditing(true)
  const handleStopEditing = () => {
    setIsEditing(false)
    setCurrentName(name)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentName(e.target.value)

  const isCreator = currentUser?.id === group.creator_id

  useOnClickOutside({
    ref,
    handler: handleStopEditing
  })

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <h1 className="ml-2 text-lg font-semibold border border-transparent">
          {name}
        </h1>
        {isCreator && (
          <button onClick={handleStartEditing}>
            <EditIcon />
          </button>
        )}
      </div>
    )
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      name="updateGroupName"
      className="flex flex-wrap justify-center gap-2">
      <input
        value={currentName}
        onChange={handleChange}
        type="text"
        name="groupName"
        id="groupName"
        className="px-2 py-0.5 mr-auto text-lg font-semibold border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder:text-zinc-300"
        autoComplete="off"
      />
      <button
        disabled={isLoading}
        className="px-2 py-1 mr-auto text-sm transition rounded-md bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
        Guardar cambios
      </button>
    </form>
  )
}
