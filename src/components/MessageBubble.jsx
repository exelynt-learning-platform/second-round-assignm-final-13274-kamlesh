import React from 'react';
import { FaRobot, FaUser } from 'react-icons/fa'
const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '12px',
      padding: '0 8px',
    }}>
      {!isUser && (
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: '#6366f1', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', fontSize: '16px',
          marginRight: '8px', flexShrink: 0,
        }}><FaRobot size={20} color="#fff" /></div>
      )}

      <div style={{
        maxWidth: '70%',
        padding: '10px 14px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? '#6366f1' : '#f3f4f6',
        color: isUser ? '#fff' : '#111827',
        fontSize: '14px',
        lineHeight: '1.5',
        wordBreak: 'break-word',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      }}>
        {message.content}
      </div>

      {isUser && (
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: '#10b981', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', fontSize: '16px',
          marginLeft: '8px', flexShrink: 0,
        }}><FaUser size={18} color="#fff" /></div>
      )}
    </div>
  );
};

export default MessageBubble;