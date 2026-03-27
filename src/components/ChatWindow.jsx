import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';
import InputBar from './InputBar';
import { clearError } from '../store/chatSlice';

import { FaRobot } from 'react-icons/fa'
import { BsChatDots } from 'react-icons/bs';    
import { MdClose } from 'react-icons/md';

const ChatWindow = () => {
  const { messages, isLoading, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', maxWidth: '800px',
      margin: '0 auto', background: '#fff',
      boxShadow: '0 0 40px rgba(0,0,0,0.1)',
    }}>
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: '#fff', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ fontSize: '24px' }}><FaRobot size={30} color="#fff" /></span>
        <div>
          <div style={{ fontWeight: '700', fontSize: '16px' }}>ChatGPT Assistant</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Powered by OpenAI GPT-3.5</div>
        </div>
      </div>

      {error && (
        <div style={{
          background: '#fef2f2', borderBottom: '1px solid #fecaca',
          padding: '10px 16px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          color: '#dc2626', fontSize: '13px',
        }}>
          <span>{error}</span>
          <button onClick={() => dispatch(clearError())}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontSize: '18px' }}>
            <MdClose size={20} />
          </button>
        </div>
      )}

      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px 8px',
        background: '#fafafa',
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '60px' }}>
            <BsChatDots size={52} color="#c4b5fd" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '16px', fontWeight: '600' }}>Start a conversation!</div>
            <div style={{ fontSize: '13px' }}>Type a message below to chat with AI.</div>
          </div>
        )}

        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {isLoading && <LoadingSpinner />}
        <div ref={messagesEndRef} />
      </div>

      <InputBar />
    </div>
  );
};

export default ChatWindow;