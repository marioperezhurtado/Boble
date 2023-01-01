import { createContext, useContext } from 'react'
import { supabase } from '../supabase'

interface Props {
  children: React.ReactNode
}

interface GetPrivateMessages {
  senderId: string
  receiverId: string
}

interface SendPrivateMessage {
  senderId: string
  receiverId: string
  text: string
}

interface DbContext {
  getPrivateMessages: (params: GetPrivateMessages) => Promise<any>
  sendPrivateMessage: (params: SendPrivateMessage) => Promise<any>
}

const initialDbCtx = {
  getPrivateMessages: async () => {},
  sendPrivateMessage: async () => {}
}

const DbCtx = createContext<DbContext>(initialDbCtx)

export function DbProvider({ children }: Props) {
  const getPrivateMessages = async ({
    senderId,
    receiverId
  }: GetPrivateMessages) => {
    const { data, error } = await supabase
      .from('private_messages')
      .select('*')
      .or(
        `and(sender_id.eq.${senderId}, receiver_id.eq.${receiverId}), and(sender_id.eq.${receiverId}, receiver_id.eq.${senderId})`
      )
    if (error) throw Error('Failed to get private messages')
    return data
  }

  const sendPrivateMessage = async ({
    senderId,
    receiverId,
    text
  }: SendPrivateMessage) => {
    const { error } = await supabase
      .from('private_messages')
      .insert({ sender_id: senderId, receiver_id: receiverId, text })
    if (error) throw Error('Failed to send private message')
  }

  const dbValues = {
    getPrivateMessages,
    sendPrivateMessage
  }

  return <DbCtx.Provider value={dbValues}>{children}</DbCtx.Provider>
}

export const useDb = () => useContext(DbCtx)
