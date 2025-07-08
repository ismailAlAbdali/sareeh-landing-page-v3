const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');
const { createAdminNotificationTemplate, createUserConfirmationTemplate } = require('./templates');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

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
    // Validate environment variables first
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

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
    
    console.log('Processing demo request:', {
      requestNumber,
      businessname,
      contactname,
      email,
      phone,
      industry,
      otherindustry,
      language
    });

    // 1. Insert into Supabase database (if available)
    let dbData = null;
    if (supabase) {
      try {
        const { data, error: dbError } = await supabase
          .from('demo_requests')
          .insert([
            {
              businessname,
              contactname,
              email: email || null,
              phone,
              industry,
              otherindustry: otherindustry || null,
            }
          ])
          .select()
          .single();

        if (dbError) {
          console.error('Database error:', dbError);
          // Don't fail the entire request, just log the error
          console.log('Continuing with email sending despite database error');
        } else {
          dbData = data;
          console.log('Database record created:', dbData);
        }
      } catch (dbError) {
        console.error('Database connection error:', dbError);
        console.log('Continuing with email sending despite database error');
      }
    } else {
      console.log('Supabase not configured, skipping database save');
    }

    // 2. Configure and send emails
    // Configure transporter with secure options for production
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Secure settings for production
        rejectUnauthorized: true,
        ciphers: 'SSLv3'
      },
      // Additional security for production
      requireTLS: true,
      logger: process.env.NODE_ENV === 'development'
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
      otherindustry,
      requestNumber,
      id: dbData?.id,
      created_at: dbData?.created_at
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
        requestNumber: requestNumber,
        message: 'Demo request submitted successfully',
        data: {
          id: dbData?.id,
          businessname,
          contactname,
          industry,
          created_at: dbData?.created_at
        }
      }),
    };
  } catch (error) {
    // Log the full error for debugging
    console.error('Contact function error:', error);
    console.error('Error stack:', error.stack);
    
    // Check for specific error types
    let errorMessage = 'Failed to send email';
    
    if (error.message?.includes('Failed to connect to email server')) {
      errorMessage = 'Email server connection failed';
    } else if (error.message?.includes('Failed to send admin notification')) {
      errorMessage = 'Failed to send admin notification';
    } else if (error.message?.includes('Missing required environment variables')) {
      errorMessage = 'Server configuration error';
    }
    
    // Generic error message for production
    const finalErrorMessage = process.env.NODE_ENV === 'production' 
      ? 'An error occurred processing your request' 
      : errorMessage;
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      body: JSON.stringify({ 
        success: false, 
        error: finalErrorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
    };
  }
}; 