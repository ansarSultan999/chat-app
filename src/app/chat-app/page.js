"use client";
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../database/firebase-config'; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

function ChatApp() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

 
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc')); 
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: message,
          timestamp: serverTimestamp(),
          user: auth.currentUser?.email || 'Anonymous' 
        });
        setMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-app flex flex-col items-center justify-center m-10 p-6 bg-gray-100">
      <div className="messages border rounded-lg w-full max-w-lg h-80 overflow-auto p-4 bg-white mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="message mb-2 p-2 border-b">
            <span className="font-bold">{msg.user}</span>: {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex w-full max-w-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-grow p-2 border rounded-l-md outline-none"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md">Send</button>
      </form>
    </div>
  );
}

export default ChatApp;
