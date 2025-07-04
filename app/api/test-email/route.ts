import { NextRequest, NextResponse } from 'next/server';
import { createEmailTransporter, validateEmailConfig, getRecipientEmail } from '@/lib/email-config';
import { emailRateLimiter } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
    if (!emailRateLimiter.isAllowed(clientIP)) {
      const timeLeft = emailRateLimiter.getRemainingTime(clientIP);
      const minutes = Math.ceil(timeLeft / 60000);
      return NextResponse.json(
        { error: `Rate limit exceeded. Please wait ${minutes} minutes before trying again.` },
        { status: 429 }
      );
    }

    // Validate email configuration
    if (!validateEmailConfig()) {
      return NextResponse.json(
        { error: 'Email configuration is missing' },
        { status: 500 }
      );
    }

    const transporter = createEmailTransporter();
    const recipientEmail = getRecipientEmail();

    // Send test email
    const info = await transporter.sendMail({
      from: `"Sareeh POS System" <${process.env.NEXT_PUBLIC_SMTP_USER}>`,
      to: recipientEmail,
      subject: 'Test Email - Sareeh POS System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Test Email</h2>
          <p>This is a test email to verify that the email configuration is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p>If you received this email, your SMTP configuration is working properly!</p>
        </div>
      `,
      text: 'This is a test email to verify that the email configuration is working correctly.',
    });

    console.log('Test email sent successfully:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Test email sent successfully'
    });

  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email', details: error },
      { status: 500 }
    );
  }
} 