--SQL Queries to create the database tables

--chats
create table chats(
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now(),
  user1 uuid references profiles (id) on delete cascade not null,
  user2 uuid references profiles (id) on delete cascade not null,
  unique (user1, user2)
);

--chat messages
create table chat_messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now(),
  sender_id uuid references profiles (id) on delete cascade not null,
  chat_id uuid references chats (id) on delete cascade not null,
  text text,
  media_link text,
  audio_link text,
);

--groups
create table groups(
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now(),
  creator_id uuid references profiles (id) on delete cascade not null,
  name text not null,
  image_url text
);

--group participants 
create table group_participants (
  joined_at timestamp default now(),
  user_id uuid references profiles (id) on delete cascade not null,
  group_id uuid references groups (id) on delete cascade not null,
  primary key (user_id, group_id)
);

--group messages
create table group_messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now(),
  sender_id uuid references profiles (id)  on delete cascade not null,
  group_id uuid references groups (id)  on delete cascade not null,
  text text,
  media_link text,
  audio_link text
);

-- RLS Table Policies

--PROFILES table policies
--Public profiles are viewable by anyone (select authenticated)
true
--Users can insert their own profile
--Users can update their own profile
(uid() = id)

--CHATS table policies

--Users can select their own chats
--Users can insert their own chats
--Users can delete their own chats
((uid() = user1) OR (uid() = user2))

--CHATS_MESSAGES table policies

-- Users can select all messages in chats they belong to
((uid() IN ( SELECT chats.user1
  FROM chats
  WHERE (chat_messages.chat_id = chats.id))) OR 
(uid() IN ( SELECT chats.user2
  FROM chats
  WHERE (chat_messages.chat_id = chats.id))))

-- Users can insert their own messages in chats they belong to
(((uid() = sender_id) AND 
(uid() IN ( SELECT chats.user1
  FROM chats
  WHERE (chat_messages.chat_id = chats.id)))) OR 
(uid() IN ( SELECT chats.user2
  FROM chats
  WHERE (chat_messages.chat_id = chats.id))))

--GROUPS table policies

--Authenticated users can select all groups
true
--Users can insert their own groups
--Users can update their own groups
(uid() = creator_id)

--GROUP_PARTICIPANTS table policies

--Authenticated users can select all participants
--Users can insert participants in groups they created
(uid() IN ( SELECT groups.creator_id
  FROM groups
  WHERE (group_participants.group_id = groups.id)))

--Users can remove participants from groups they created
(uid() IN ( SELECT groups.creator_id
  FROM groups
  WHERE (group_participants.group_id = groups.id)))

--Users can remove themselves from a group
(uid() = user_id)

--GROUP_MESSAGES table policies

--Users can select all messages from groups they belong to
(uid() IN ( SELECT group_participants.user_id
  FROM group_participants
  WHERE (group_participants.group_id = group_messages.group_id)))
  
--Users can insert their own messages in groups they belong to
((uid() = sender_id) AND 
(uid() IN ( SELECT group_participants.user_id
  FROM group_participants
  WHERE (group_participants.group_id = group_messages.group_id))))

-- RLS Bucket Policies

--AVATARS bucket policies

--Avatars are publicly accessible
(bucket_id = 'avatars'::text)

--Users can select their own avatars
--Users can insert their own avatars
((bucket_id = 'avatars'::text) AND (name = (uid())::text))

--CHAT-MEDIA bucket policies

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

--GROUP-MEDIA bucket policies

--Users can select media from groups they belong to
--Users can insert media in groups they belong to
(bucket_id = 'group-media'::text) AND 
(uid() IN ( SELECT group_participants.user_id
  FROM group_participants
  WHERE ((group_participants.group_id)::text = 
  (storage.foldername(objects.name))[1]))
)

--GROUP-AVATARS bucket policies

--Users can select avatars from groups they belong
--Users can insert avatars in groups they created
--Users can update avatars in groups they created
(bucket_id = 'group-avatars'::text) AND 
((uid() IN ( SELECT groups.creator_id
  FROM groups
  WHERE ((groups.id)::text = storage.filename(objects.name))))
)