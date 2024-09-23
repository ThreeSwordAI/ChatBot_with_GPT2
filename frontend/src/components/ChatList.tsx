// src/components/ChatList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ChatListProps {
  userId: number;
  onSelectChat: (otherUserId: number) => void;
}

interface User {
  id: number;
  name: string;
  username: string;
}

const ChatList: React.FC<ChatListProps> = ({ userId, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [chatPartners, setChatPartners] = useState<User[]>([]);
  console.log(`ChatList received userId: ${userId}`); //debugging
  useEffect(() => {
    fetchChatPartners();
  }, []);

  const fetchChatPartners = async () => {
    try {
      console.log(`Fetching chat partners for userId: ${userId}`);
      const response = await axios.get('http://localhost:8000/chat_partners', {
        params: { user_id: userId },
      });
      setChatPartners(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/search_users', {
        params: { query: searchQuery },
      });
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Chat List</h2>
      <h3>Your Conversations</h3>
      <ul>
        {chatPartners.map((user) => (
          <li key={user.id}>
            {user.name} ({user.username})
            <button onClick={() => onSelectChat(user.id)}>Chat</button>
          </li>
        ))}
      </ul>
      <h3>Search Users</h3>
      <input
        type="text"
        placeholder="Search by name or username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /><br />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {users.map((user) => (
          user.id !== userId && (
            <li key={user.id}>
              {user.name} ({user.username})
              <button onClick={() => onSelectChat(user.id)}>Chat</button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default ChatList;