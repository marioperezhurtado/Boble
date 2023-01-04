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
interface GetChannels {
  userId: string
}
interface CreateChannel {
  userId: string
  friendId: string
}
interface PrivateMessagesListener {
  channelId: string
  callback: () => void
}
interface ChannelsListener {
  userId: string
  callback: () => void
}

interface DbContext {
  getPrivateMessages: (params: GetPrivateMessages) => Promise<any>
  sendPrivateMessage: (params: SendMessage) => Promise<any>
  getChannels: (params: GetChannels) => Promise<any>
  createChannel: (params: CreateChannel) => Promise<any>
  privateMessagesListener: (params: PrivateMessagesListener) => any
  channelsListener: (params: ChannelsListener) => any
}

const initialDbCtx = {
  getPrivateMessages: async () => {},
  sendPrivateMessage: async () => {},
  getChannels: async () => {},
  createChannel: async () => {},
  privateMessagesListener: () => {},
  channelsListener: () => {}
}

const DbCtx = createContext<DbContext>(initialDbCtx)

export function DbProvider({ children }: Props) {
  const getPrivateMessages = async ({ channelId }: GetPrivateMessages) => {
    const { data, error } = await supabase
      .from('private_messages')
      .select('*')
      .eq('private_channel_id', channelId)
      .order('created_at', { ascending: true })
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

  const getChannels = async ({ userId }: GetChannels) => {
    const { data, error } = await supabase
      .from('private_channels')
      .select('*, user1(*), user2(*)')
      .or(`user1.eq.${userId},user2.eq.${userId}`)
      .order('created_at', { ascending: false })
    if (error) throw Error('Failed to get channel list')
    return data
  }

  const createChannel = async ({ userId, friendId }: CreateChannel) => {
    const { error } = await supabase
      .from('private_channels')
      .insert({ user1: userId, user2: friendId })
    if (error) throw Error('Failed to create channel')
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

  const channelsListener = ({ userId, callback }: ChannelsListener) => {
    return supabase
      .channel('public:private_channels')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'private_channels',
          filter: `user1=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }

  const dbValues = {
    getPrivateMessages,
    sendPrivateMessage,
    getChannels,
    createChannel,
    privateMessagesListener,
    channelsListener
  }

  return <DbCtx.Provider value={dbValues}>{children}</DbCtx.Provider>
}

export const useDb = () => useContext(DbCtx)
