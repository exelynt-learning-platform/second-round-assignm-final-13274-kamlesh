import React from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';
import styles from './MessageBubble.module.css';

const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`${styles.messageRow} ${isUser ? styles.messageRowUser : styles.messageRowBot
            }`}>

            {!isUser && (
                <div className={`${styles.avatar} ${styles.avatarBot}`}>
                    <FaRobot size={20} color="#fff" />
                </div>
            )}

            <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleBot
                }`}>
                {message.content}
            </div>

            {isUser && (
                <div className={`${styles.avatar} ${styles.avatarUser}`}>
                    <FaUser size={18} color="#fff" />
                </div>
            )}

        </div>
    );
};

export default MessageBubble;