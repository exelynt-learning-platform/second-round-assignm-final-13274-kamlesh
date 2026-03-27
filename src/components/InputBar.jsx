import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/chatThunks';
import { IoSend } from 'react-icons/io5';

import styles from './InputBar.module.css';

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

  const isDisabled = isLoading || !input.trim();

  return (
    <div className={styles.inputContainer}>

      {/* Textarea */}
      <textarea
        className={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading}
        rows={1}
      />

      {/* Send Button */}
      <button
        className={`${styles.sendButton} ${
          isDisabled ? styles.sendButtonDisabled : styles.sendButtonActive
        }`}
        onClick={handleSend}
        disabled={isDisabled}
      >
        {isLoading ? 'Sending...' : (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Send <IoSend size={16} />
          </span>
        )}
      </button>

    </div>
  );
};

export default InputBar;