import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { createGroup } from '@/services/groups'

export default function CreateGroup() {
  const { currentUser } = useAuth()
  const formRef = useRef<HTMLFormElement>(null)

  const {
    mutate: handleCreateGroup,
    isLoading,
    isError
  } = useMutation(
    async (name: string) =>
      await createGroup({
        name,
        creatorId: currentUser?.id ?? ''
      })
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const groupName = formRef.current?.groupName.value
    if (!groupName) return

    handleCreateGroup(groupName)
    formRef.current?.reset()
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          name="groupName"
          id="groupName"
          placeholder="Group name..."
          className="border rounded-md px-2 py-1.5"
        />
        <button
          disabled={isLoading}
          className="px-2 py-1 transition rounded-md sm:text-sm bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
          Create group
        </button>
      </form>
      {isError && (
        <p className="p-1.5 px-3 mx-auto w-fit bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
          Failed to create group
        </p>
      )}
    </div>
  )
}
