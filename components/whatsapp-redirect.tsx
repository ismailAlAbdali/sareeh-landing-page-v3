'use client';

import { useState } from 'react';
import LoadingOverlay from '@/components/loading-overlay';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

interface WhatsAppRedirectProps {
  children: React.ReactNode;
  message: string;
  loadingMessage: string;
}

export default function WhatsAppRedirect({ children, message, loadingMessage }: WhatsAppRedirectProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!WHATSAPP_NUMBER) {
    throw new Error('Missing WhatsApp number environment variable');
  }

  const handleRedirect = () => {
    setIsRedirecting(true);
    const encodedMessage = encodeURIComponent(message);
    
    setTimeout(() => {
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
     
      
      window.location.href = whatsappURL;
      setIsRedirecting(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isRedirecting && <LoadingOverlay message={loadingMessage} />}
      </AnimatePresence>
      {React.cloneElement(children as React.ReactElement, {
        onClick: handleRedirect,
        disabled: isRedirecting
      })}
    </>
  );
}