

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BotpressChat = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/home' || initialized) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;

    script.onload = () => {
      window.botpressWebChat.init({
        botId: '64fe5268-c29e-4d0d-81d0-322c7996cd56',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '64fe5268-c29e-4d0d-81d0-322c7996cd56',
        exposeStore: true,
        useSessionStorage: true,
        enablePersistHistory: true,
        stylesheet: 'https://webchat-styler-css.botpress.app/prod/code/27b13f84-3c7f-4f83-bc8c-25ede6b6a8b9/v214/style.css',
      });

      if (window.botpressWebChat.store && window.botpressWebChat.store.dispatch) {
        window.botpressWebChat.store.dispatch({
          type: 'WebChat/reset',
        });
      }

      setInitialized(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      document.head.removeChild(script);
    };
  }, [location.pathname, initialized]);

  const webChatStyle = {
    height: '300px !important',
  };

  return location.pathname === '/home' ? <div id="webchat" style={webChatStyle} /> : null;
};

export default BotpressChat;

