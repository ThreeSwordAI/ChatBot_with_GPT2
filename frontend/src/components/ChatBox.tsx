import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AutoGenerate from './AutoGenerate';

interface ChatBoxProps {
  userId: number;
  otherUserId: number;
  onBack: () => void;
}

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender_id: number;
  receiver_id: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({ userId, otherUserId, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showAutoGenerate, setShowAutoGenerate] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  console.log(`ChatBox received userId: ${userId}, otherUserId: ${otherUserId}`); //debugging
  useEffect(() => {
    fetchMessages();
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  
  const fetchMessages = async () => {
    try {
      //const params = { user_id: userId }; //
      //console.log('API params:', params);//
      //const response = await axios.get(`http://localhost:8000/chat_history/${otherUserId}`, { params });//
      console.log(`Fetching messages with userId: ${userId}, otherUserId: ${otherUserId}`);
      const response = await axios.get(`http://localhost:8000/chat_history/${otherUserId}`, {
        params: { user_id: userId },
      });
      console.log('Fetched messages:', response.data);
      setMessages(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    try {
      const response = await axios.post(
        'http://localhost:8000/send_message',
        {
          content: newMessage,
          receiver_id: otherUserId,
        },
        {
          params: { user_id: userId },
        }
      );
      console.log('Sent message:', response.data);
      fetchMessages(); // Refresh messages after sending
      setNewMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAutoGenerateClick = () => {
    setShowAutoGenerate(true);
  };

  const handleGeneratedText = (text: string) => {
    setNewMessage(text);
    setShowAutoGenerate(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={onBack}>Back to Chats</button>
      <div style={{ border: '1px solid black', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ textAlign: msg.sender_id === userId ? 'right' : 'left' }}>
            <p>
              <strong>{msg.sender_id === userId ? 'You' : 'Them'}:</strong> {msg.content}
            </p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {showAutoGenerate ? (
        <AutoGenerate onGeneratedText={handleGeneratedText} />
      ) : (
        <div>
          <textarea
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={3}
            style={{ width: '100%', resize: 'none' }}
          />
          <br />
          <button onClick={handleSendMessage}>Send</button>
          <button onClick={handleAutoGenerateClick}>AutoGenerate</button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;


