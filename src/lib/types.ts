export type Message = {
  id: string;
  sender: 'me' | 'contact';
  type: 'text' | 'image' | 'video' | 'document';
  content: string;
  timestamp: string;
};

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTimestamp: string;
};

export type User = {
    id: string;
    name: string;
    avatar: string;
}
