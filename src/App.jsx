import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Provider store={store}>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
        <ChatWindow />
      </div>
    </Provider>
  );
}

export default App;