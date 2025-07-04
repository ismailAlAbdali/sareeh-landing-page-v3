import { NextRequest, NextResponse } from 'next/server';
import { createEmailTransporter, validateEmailConfig } from '@/lib/email-config';
import { createUserConfirmationEmail } from '@/lib/email-templates';
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

    const body = await request.json();
    const { email, language = 'en' } = body;

    // Validate email configuration
    if (!validateEmailConfig()) {
      return NextResponse.json(
        { error: 'Email configuration is missing' },
        { status: 500 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    const transporter = createEmailTransporter();

    // Test data for user confirmation email
    const testData = {
      businessname: 'Test Business',
      contactname: 'Test Contact',
      email: email,
      phone: '+1234567890',
      industry: 'Retail',
      otherindustry: '',
      language: language
    };

    // Create user confirmation email
    const userEmailHTML = createUserConfirmationEmail(testData, language);

    // Send user confirmation email
    const info = await transporter.sendMail({
      from: `"Sareeh POS System" <${process.env.NEXT_PUBLIC_SMTP_USER}>`,
      to: email,
      subject: language === 'ar' 
        ? `تأكيد طلب التجربة - نظام صريح`
        : `Demo Request Confirmation - Sareeh System`,
      html: userEmailHTML,
      text: language === 'ar'
        ? `شكراً لك على طلب تجربة نظام صريح. لقد استلمنا طلبك بنجاح وسيقوم فريقنا بالتواصل معك قريباً.`
        : `Thank you for requesting a demo of the Sareeh POS system. We have successfully received your request and our team will contact you soon.`,
    });

    console.log('User confirmation test email sent successfully:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'User confirmation test email sent successfully'
    });

  } catch (error) {
    console.error('Error sending user confirmation test email:', error);
    return NextResponse.json(
      { error: 'Failed to send user confirmation test email', details: error },
      { status: 500 }
    );
  }
} 