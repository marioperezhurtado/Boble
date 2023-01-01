import { createContext, useContext } from 'react'
import { supabase } from '../supabase'

interface Props {
  children: React.ReactNode
}

interface GetPrivateMessages {
  channelId: string
}

interface SendMessage {
  senderId: string
  channelId: string
  text: string
}

interface PrivateMessagesListener {
  channelId: string
  callback: () => void
}

interface DbContext {
  getPrivateMessages: (params: GetPrivateMessages) => Promise<any>
  sendPrivateMessage: (params: SendMessage) => Promise<any>
  privateMessagesListener: (params: PrivateMessagesListener) => any
}

const initialDbCtx = {
  getPrivateMessages: async () => {},
  sendPrivateMessage: async () => {},
  privateMessagesListener: () => {}
}

const DbCtx = createContext<DbContext>(initialDbCtx)

export function DbProvider({ children }: Props) {
  const getPrivateMessages = async ({ channelId }: GetPrivateMessages) => {
    const { data, error } = await supabase
      .from('private_messages')
      .select('*')
      .eq('private_channel_id', channelId)
    if (error) throw Error('Failed to get private messages')
    return data
  }

  const sendPrivateMessage = async ({
    senderId,
    channelId,
    text
  }: SendMessage) => {
    const { error } = await supabase
      .from('private_messages')
      .insert({ sender_id: senderId, private_channel_id: channelId, text })
    if (error) throw Error('Failed to send private message')
  }

  const privateMessagesListener = ({
    channelId,
    callback
  }: PrivateMessagesListener) => {
    return supabase
      .channel('public:private_messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'private_messages',
          filter: `private_channel_id=eq.${channelId}`
        },
        callback
      )
      .subscribe()
  }

  const dbValues = {
    getPrivateMessages,
    sendPrivateMessage,
    privateMessagesListener
  }

  return <DbCtx.Provider value={dbValues}>{children}</DbCtx.Provider>
}

export const useDb = () => useContext(DbCtx)
