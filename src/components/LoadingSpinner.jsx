import React from 'react';
import { FaRobot } from 'react-icons/fa'
const LoadingSpinner = () => (
  <div style={{
    display: 'flex', justifyContent: 'flex-start',
    marginBottom: '12px', padding: '0 8px', alignItems: 'center',
  }}>
    <div style={{
      width: '36px', height: '36px', borderRadius: '50%',
      background: '#6366f1', display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: '#fff', fontSize: '16px',
      marginRight: '8px',
    }}><FaRobot size={20} color="#fff" /></div>

    <div style={{
      padding: '10px 14px',
      background: '#f3f4f6',
      borderRadius: '18px 18px 18px 4px',
      display: 'flex', gap: '4px', alignItems: 'center',
    }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#6b7280',
          animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
        }}/>
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  </div>
);

export default LoadingSpinner;