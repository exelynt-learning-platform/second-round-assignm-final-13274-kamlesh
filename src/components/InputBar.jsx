import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/chatThunks';
const InputBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.chat.isLoading);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    dispatch(sendMessage(trimmed));
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      padding: '12px 16px',
      borderTop: '1px solid #e5e7eb',
      background: '#fff',
      display: 'flex', gap: '8px', alignItems: 'flex-end',
    }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading}
        rows={1}
        style={{
          flex: 1, padding: '10px 14px',
          border: '1.5px solid #e5e7eb',
          borderRadius: '20px', fontSize: '14px',
          resize: 'none', outline: 'none',
          fontFamily: 'inherit', lineHeight: '1.4',
          maxHeight: '120px', overflowY: 'auto',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !input.trim()}
        style={{
          padding: '10px 20px',
          background: isLoading || !input.trim() ? '#d1d5db' : '#6366f1',
          color: '#fff', border: 'none', borderRadius: '20px',
          fontSize: '14px', fontWeight: '600', cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default InputBar;