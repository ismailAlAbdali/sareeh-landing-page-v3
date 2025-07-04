'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function TestEmailPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [userEmail, setUserEmail] = useState('');

  const testEmail = async () => {
    setIsTesting(true);
    setTestResults(null);
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Test email sent successfully!');
        setTestResults({ success: true, data: result });
      } else {
        toast.error(`Failed to send test email: ${result.error}`);
        setTestResults({ success: false, error: result.error });
      }
    } catch (error) {
      toast.error('Error testing email configuration');
      setTestResults({ success: false, error: error });
    } finally {
      setIsTesting(false);
    }
  };

  const testDemoEmail = async () => {
    setIsTesting(true);
    setTestResults(null);
    
    try {
      const testData = {
        businessname: 'Test Business',
        contactname: 'Test Contact',
        email: 'test@example.com',
        phone: '+1234567890',
        industry: 'Retail',
        otherindustry: '',
        language: 'en'
      };

      const response = await fetch('/.netlify/functions/send-demo-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Demo emails sent successfully! (Admin + User)');
        setTestResults({ success: true, data: result });
      } else {
        toast.error(`Failed to send demo email: ${result.error}`);
        setTestResults({ success: false, error: result.error });
      }
    } catch (error) {
      toast.error('Error testing demo email');
      setTestResults({ success: false, error: error });
    } finally {
      setIsTesting(false);
    }
  };

  const testUserEmail = async () => {
    if (!userEmail) {
      toast.error('Please enter an email address');
      return;
    }

    setIsTesting(true);
    setTestResults(null);
    
    try {
      const response = await fetch('/api/test-user-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, language: 'en' }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('User confirmation email sent successfully!');
        setTestResults({ success: true, data: result });
      } else {
        toast.error(`Failed to send user email: ${result.error}`);
        setTestResults({ success: false, error: result.error });
      }
    } catch (error) {
      toast.error('Error testing user email');
      setTestResults({ success: false, error: error });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Email Testing Dashboard</CardTitle>
              <CardDescription>
                Test your email configuration and see the results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={testEmail}
                  disabled={isTesting}
                  className="w-full"
                >
                  {isTesting ? 'Testing...' : 'Send Test Email'}
                </Button>
                
                <Button
                  onClick={testDemoEmail}
                  disabled={isTesting}
                  variant="outline"
                  className="w-full"
                >
                  {isTesting ? 'Testing...' : 'Send Demo Email (Admin + User)'}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="userEmail">Test User Confirmation Email:</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="Enter email to test user confirmation"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={testUserEmail}
                      disabled={isTesting || !userEmail}
                      size="sm"
                    >
                      {isTesting ? 'Sending...' : 'Send'}
                    </Button>
                  </div>
                </div>
              </div>

              {testResults && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(testResults, null, 2)}
                  </pre>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Environment Variables Check:
                </h4>
                <div className="text-sm space-y-1">
                  <div>SMTP Host: {process.env.NEXT_PUBLIC_SMTP_HOST ? '✅ Set' : '❌ Missing'}</div>
                  <div>SMTP Port: {process.env.NEXT_PUBLIC_SMTP_PORT ? '✅ Set' : '❌ Missing'}</div>
                  <div>SMTP User: {process.env.NEXT_PUBLIC_SMTP_USER ? '✅ Set' : '❌ Missing'}</div>
                  <div>SMTP Pass: {process.env.NEXT_PUBLIC_SMTP_PASS ? '✅ Set' : '❌ Missing'}</div>
                  <div>Mail To: {process.env.NEXT_PUBLIC_MAIL_TO ? '✅ Set' : '❌ Missing'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 