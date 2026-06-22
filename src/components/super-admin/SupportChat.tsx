'use client';

import React, { useState } from 'react';
import { Card, Typography, Input, Button, Avatar, Space } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import './SupportChat.css';

const { Text } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  text: string;
  sender: 'admin' | 'tenant';
  time: string;
}

interface SupportChatProps {
  messages: Message[];
  tenantName?: string;
  onSend?: (text: string) => void;
}

const SupportChat: React.FC<SupportChatProps> = ({
  messages,
  tenantName = 'Tenant',
  onSend,
}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend?.(input.trim());
    setInput('');
  };

  return (
    <div className="super-support-chat">
      <div className="chat-header">
        <Text strong style={{ color: 'var(--theme-text)' }}>Conversation with {tenantName}</Text>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'admin' ? 'message-admin' : 'message-tenant'}`}>
            <div className="chat-bubble-wrap">
              {msg.sender === 'tenant' && (
                <Avatar size={28} icon={<UserOutlined />} style={{ flexShrink: 0 }} />
              )}
              <div className="chat-bubble">
                <Text className="chat-bubble-text">{msg.text}</Text>
                <Text className="chat-bubble-time">{msg.time}</Text>
              </div>
              {msg.sender === 'admin' && (
                <Avatar size={28} icon={<UserOutlined />} style={{ flexShrink: 0, background: 'var(--theme-primary)' }} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-bar">
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your reply..."
          autoSize={{ minRows: 1, maxRows: 3 }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="chat-input"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          className="chat-send-btn"
        />
      </div>
    </div>
  );
};

export default SupportChat;
