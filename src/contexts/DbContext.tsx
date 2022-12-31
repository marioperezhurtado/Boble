import { createContext, useContext } from 'react'
import { supabase } from '../supabase'

interface Props {
  children: React.ReactNode
}

interface PrivateMessagesParams {
  senderId: string
  receiverId: string
}

interface DbContext {
  getPrivateMessages: (params: PrivateMessagesParams) => Promise<any>
}

const initialDbCtx = {
  getPrivateMessages: async () => {}
}

const DbCtx = createContext<DbContext>(initialDbCtx)

export function DbProvider({ children }: Props) {
  const getPrivateMessages = async ({
    senderId,
    receiverId
  }: PrivateMessagesParams) => {
    const { data, error } = await supabase
      .from('private_messages')
      .select('*')
      .match({
        sender_id: senderId,
        receiver_id: receiverId
      })
    if (error) throw Error('Failed to get private messages')
    return data
  }

  const dbValues = {
    getPrivateMessages
  }

  return <DbCtx.Provider value={dbValues}>{children}</DbCtx.Provider>
}

export const useDb = () => useContext(DbCtx)
