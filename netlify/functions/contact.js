const nodemailer = require('nodemailer');
const { createAdminNotificationTemplate, createUserConfirmationTemplate } = require('./templates');

// Sanitize inputs to prevent XSS
function sanitizeInput(input) {
  if (!input) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate unique request number
function generateRequestNumber() {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SR-${timestamp.slice(-6)}-${random}`;
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the incoming request body
    const body = JSON.parse(event.body);
    
    // Sanitize all inputs
    const businessname = sanitizeInput(body.businessname);
    const contactname = sanitizeInput(body.contactname);
    const email = sanitizeInput(body.email);
    const phone = sanitizeInput(body.phone);
    const industry = sanitizeInput(body.industry);
    const otherindustry = sanitizeInput(body.otherindustry);
    const language = sanitizeInput(body.language) || 'en';
    
    // Validate required fields
    if (!businessname || !contactname || !phone || !industry) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }
    
    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Generate a unique request number
    const requestNumber = generateRequestNumber();
    
    // Configure transporter with secure options
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      }
    });

    // Verify connection
    try {
      await transporter.verify();
    } catch (verifyError) {
      // Don't expose detailed error information
      throw new Error('Failed to connect to email server');
    }

    const emailData = {
      businessname,
      contactname,
      email,
      phone,
      industry,
      otherindustry
    };

    // Send email to admin
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.MAIL_TO,
        replyTo: email || process.env.SMTP_USER,
        subject: language === 'ar' ? `طلب تجربة جديد #${requestNumber} - ${businessname}` : `New Demo Request #${requestNumber} - ${businessname}`,
        html: createAdminNotificationTemplate(requestNumber, emailData, language),
      });
    } catch (adminEmailError) {
      throw new Error('Failed to send admin notification');
    }

    // Send confirmation email to the visitor if they provided an email
    if (email) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: language === 'ar' ? `تأكيد طلب التجربة - نظام صريح (#${requestNumber})` : `Demo Request Confirmation - Sareeh System (#${requestNumber})`,
          html: createUserConfirmationTemplate(requestNumber, emailData, language),
        });
      } catch (clientEmailError) {
        // We don't throw here to ensure the process continues even if confirmation fails
        console.error('Failed to send user confirmation email:', clientEmailError);
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      body: JSON.stringify({ 
        success: true, 
        requestNumber: requestNumber 
      }),
    };
  } catch (error) {
    // Generic error message for production
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'An error occurred processing your request' 
      : error.message || 'Failed to send email';
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      body: JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
    };
  }
}; 