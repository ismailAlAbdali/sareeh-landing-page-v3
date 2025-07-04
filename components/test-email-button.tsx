'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function TestEmailButton() {
  const [isTesting, setIsTesting] = useState(false);

  const testEmail = async () => {
    setIsTesting(true);
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Test email sent successfully!');
        console.log('Test email result:', result);
      } else {
        toast.error(`Failed to send test email: ${result.error}`);
        console.error('Test email error:', result);
      }
    } catch (error) {
      toast.error('Error testing email configuration');
      console.error('Test email error:', error);
    } finally {
      setIsTesting(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={testEmail}
        disabled={isTesting}
        variant="outline"
        size="sm"
        className="bg-white dark:bg-gray-800"
      >
        {isTesting ? 'Testing...' : 'Test Email'}
      </Button>
    </div>
  );
} 