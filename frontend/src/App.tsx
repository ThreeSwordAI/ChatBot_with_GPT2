// frontend/src/App.tsx

import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ChatList from './components/ChatList';
import ChatBox from './components/ChatBox';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  //const [userId, setUserId] = useState<number | null>(null);
  const [chatUserId, setChatUserId] = useState<number | null>(null);

  const [userId, setUserId] = useState<number | null>(null);

  const handleLoginSuccess = (id: number) => {
    console.log(`handleLoginSuccess called with id: ${id}`);
    setUserId(id);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setChatUserId(null);
  };

  const switchToSignup = () => {
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        showSignup ? (
          <Signup switchToLogin={switchToLogin} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} switchToSignup={switchToSignup} />
        )
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {!chatUserId ? (
            <ChatList userId={userId!} onSelectChat={(otherUserId) => setChatUserId(otherUserId)} />
          ) : (
            <ChatBox userId={userId!} otherUserId={chatUserId} onBack={() => setChatUserId(null)} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
