--SQL Queries to create the database tables

--chats
create table chats(
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now() not null,
  user1 uuid references profiles (id) on delete cascade not null,
  user2 uuid references profiles (id) on delete cascade not null,
);

--chat messages
create table chat_messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now() not null,
  sender_id uuid references profiles (id) on delete cascade not null,
  chat_id uuid references chats (id) on delete cascade not null,
  text text,
  media_link text,
  audio_link text
);

--groups
create table groups(
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now() not null,
  creator_id uuid references profiles (id) on delete cascade,
  name text not null,
  image_url text
);

--group participants 
create table group_participants (
  joined_at timestamp default now() not null,
  user_id uuid references profiles (id) on delete cascade,
  group_id uuid references group_channels (id) on delete cascade,
  primary key (user_id, group_id)
);

--group messages
create table group_messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now() not null,
  sender_id uuid references profiles (id) on delete cascade,
  group_id uuid references group_channels (id) on delete cascade,
  text text,
  media_link text,
  audio_link text
);

-- RLS Table Policies

--chats table policies

--Users can select their own channels
--Users can insert their own channels
((uid() = user1) OR (uid() = user2))

--chats messages table policies

-- Users can select messages in chats they belong to
-- Users can insert messages in chats they belong to
((uid() IN ( SELECT chats.user1
  FROM chats
  WHERE (chat_messages.chat_id = chats.id))) 
OR (uid() IN ( SELECT chats.user2
  FROM chats
  WHERE (chat_messages.chat_id = chats.id))
))

-- RLS Bucket Policies

--avatars bucket policies

--Avatars are publicly accessible
--Users can select their own avatars
--Users can insert their own avatars
((bucket_id = 'avatars'::text) AND (name = (uid())::text))

--chat-media bucket policies

--Users can select media from chats they belong to
--Users can insert media in chats they belong to
((bucket_id = 'chat-media'::text) AND 
((uid() IN ( SELECT chats.user1
  FROM chats
  WHERE ((chats.id)::text = (storage.foldername(objects.name))[1]))) 
OR 
(uid() IN ( SELECT chats.user2
  FROM chats
  WHERE ((chats.id)::text = (storage.foldername(objects.name))[1])))
))

--group-media bucket policies

--Users can select media from groups they belong to
--Users can insert media in groups they belong to
(bucket_id = 'group-media'::text) AND 
(uid() IN ( SELECT group_participants.user_id
  FROM group_participants
  WHERE ((group_participants.group_id)::text = 
  (storage.foldername(objects.name))[1]))
)

--group-avatars bucket policies

--Users can select avatars from groups they belong
(bucket_id = 'group-avatars'::text) AND 
(uid() IN ( SELECT group_participants.user_id
  FROM group_participants
  WHERE ((group_participants.group_id)::text = 
  (storage.foldername(objects.name))[1]))
)

--Users can insert avatars in groups they created
--Users can update avatars in groups they created
(bucket_id = 'group-avatars'::text) AND 
((uid() IN ( SELECT groups.creator_id
  FROM groups
  WHERE ((groups.id)::text = (storage.foldername(objects.name))[1])))
)
