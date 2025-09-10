import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';

function Messaging({ user, messages }) {
  const conversationPartners = Object.keys(messages);
  const [activePartner, setActivePartner] = useState(conversationPartners[0] || null);
  const messageEndRef = useRef(null);

  // Scroll to the bottom of the messages when a new message is added or conversation is switched
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activePartner, messages]);

  if (!activePartner) {
    return (
      <>
        <Sidebar user={user} />
        <div className="messagingPage">
          <div className="messagingPage__no-conversations">
            <h1>Messaging</h1>
            <p>You have no messages. Start a conversation from a user's post!</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar user={user} />
      <div className="messagingPage">
        <div className="messagingPage__sidebar">
          <h2>Conversations</h2>
          {conversationPartners.map(partner => (
            <div 
              key={partner} 
              className={`messagingPage__partner ${partner === activePartner ? 'active' : ''}`}
              onClick={() => setActivePartner(partner)}
            >
              {partner}
            </div>
          ))}
        </div>
        <div className="messagingPage__chat-window">
          <div className="messagingPage__chat-header">
            <h3>{activePartner}</h3>
          </div>
          <div className="messagingPage__messages">
            {messages[activePartner]?.map((msg, index) => (
              <div key={index} className={`messageBubble ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messaging;