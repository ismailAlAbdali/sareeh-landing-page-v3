import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
import { createAdminNotificationEmail, createUserConfirmationEmail } from './email-templates';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  MAIL_TO,
  RECAPTCHA_SECRET_KEY,
} = process.env;

// Validate required environment variables
const validateEnvironment = () => {
  const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

const verifyRecaptcha = async (token: string) => {
  if (!RECAPTCHA_SECRET_KEY) return true; // If not set, skip verification
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  return data.success;
};

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Validate environment variables first
    validateEnvironment();
    
    const body = JSON.parse(event.body || '{}');
    const { businessname, contactname, email, phone, industry, otherindustry, language, recaptchaToken } = body;

    // Validate required fields
    if (!businessname || !contactname || !phone || !industry) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Verify reCAPTCHA if token is provided
    if (recaptchaToken) {
      const recaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaValid) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'reCAPTCHA verification failed' }),
        };
      }
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Create email content using templates
    const adminEmailHTML = createAdminNotificationEmail(body, language || 'en');
    const userEmailHTML = createUserConfirmationEmail(body, language || 'en');

    // Send admin notification email
    const adminInfo = await transporter.sendMail({
      from: `"Sareeh POS System" <${SMTP_USER}>`,
      to: MAIL_TO,
      subject: language === 'ar' ? `طلب تجربة جديد - ${businessname}` : `New Demo Request - ${businessname}`,
      html: adminEmailHTML,
      text: language === 'ar'
        ? `طلب تجربة جديد من ${businessname} - ${contactname} - ${email || 'بدون بريد إلكتروني'} - ${phone} - ${industry}`
        : `New demo request from ${businessname} - ${contactname} - ${email || 'No email'} - ${phone} - ${industry}`,
    });

    let userInfo: nodemailer.SentMessageInfo | null = null;
    if (email && email.trim() !== '') {
      userInfo = await transporter.sendMail({
        from: `"Sareeh POS System" <${SMTP_USER}>`,
        to: email,
        subject: language === 'ar' ? `تأكيد طلب التجربة - نظام صريح` : `Demo Request Confirmation - Sareeh System`,
        html: userEmailHTML,
        text: language === 'ar'
          ? `شكراً لك على طلب تجربة نظام صريح. لقد استلمنا طلبك بنجاح وسيقوم فريقنا بالتواصل معك قريباً.`
          : `Thank you for requesting a demo of the Sareeh POS system. We have successfully received your request and our team will contact you soon.`,
      });
    }

    console.log('Admin email sent successfully:', adminInfo.messageId);
    if (userInfo) {
      console.log('User confirmation email sent successfully:', userInfo.messageId);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        adminMessageId: adminInfo.messageId,
        userMessageId: userInfo?.messageId || null,
      }),
    };
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Don't expose internal errors to the client
    const errorMessage = error.message?.includes('Missing required environment variables') 
      ? 'Server configuration error' 
      : 'Failed to send email';
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler }; 