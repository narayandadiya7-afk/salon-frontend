'use client';

import React from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';

interface WhatsAppFloatProps {
  phoneNumber?: string;
}

export default function WhatsAppFloat({ phoneNumber = '' }: WhatsAppFloatProps) {
  const href = phoneNumber
    ? `https://wa.me/${phoneNumber.replace(/\D/g, '')}`
    : '#';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 28,
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
      }}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppOutlined />
    </a>
  );
}
