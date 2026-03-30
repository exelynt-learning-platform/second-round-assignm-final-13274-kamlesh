import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';
import InputBar from './InputBar';
import { clearError } from '../store/chatSlice';

import { FaRobot } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { MdClose, MdErrorOutline } from 'react-icons/md';

import styles from './ChatWindow.module.css';

const ChatWindow = () => {
  const { messages, isLoading, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <FaRobot size={30} color="#fff" />
        </span>
        <div>
          <div className={styles.headerTitle}>ChatGPT Assistant</div>
          <div className={styles.headerSubtitle}>Powered by OpenAI GPT-3.5</div>
        </div>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MdErrorOutline size={16} />
            {error}
          </span>
          <button
            className={styles.errorCloseBtn}
            onClick={() => dispatch(clearError())}
          >
            <MdClose size={20} />
          </button>
        </div>
      )}

      <div className={styles.messagesArea}>

        {messages.length === 0 && (
          <div className={styles.welcomeScreen}>
            <div className={styles.welcomeIcon}>
              <BsChatDots size={52} color="#c4b5fd" />
            </div>
            <div className={styles.welcomeTitle}>Start a conversation!</div>
            <div className={styles.welcomeSubtitle}>
              Type a message below to chat with AI.
            </div>
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

// ✅ Proper PropTypes (as reviewer suggested)
ChatWindow.propTypes = {
  messages: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default ChatWindow;