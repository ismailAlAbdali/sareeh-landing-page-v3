import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createEmailTransporter, getRecipientEmail, validateEmailConfig } from '@/lib/email-config';
import { createUserConfirmationEmail } from '@/lib/email-templates/user-confirmation';
import { createAdminNotificationEmail } from '@/lib/email-templates/admin-notification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessname, contactname, email, phone, industry, otherindustry, language } = body;

    // Validate required fields
    if (!businessname || !contactname || !phone || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate a request number
    const requestNumber = `DEMO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

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

    // 1. Insert into Supabase database
    const { data: dbData, error: dbError } = await supabase
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
      return NextResponse.json(
        { error: 'Failed to save request to database' },
        { status: 500 }
      );
    }

    console.log('Database record created:', dbData);

    // 2. Send emails (only if email configuration is available)
    const emailPromises = [];
    
    if (validateEmailConfig()) {
      try {
        const transporter = createEmailTransporter();
        const adminEmail = getRecipientEmail();
        
        // Prepare email data
        const emailData = {
          ...body,
          requestNumber,
          id: dbData.id,
          created_at: dbData.created_at
        };

        // Admin notification email
        const adminEmailPromise = transporter.sendMail({
          from: process.env.NEXT_PUBLIC_SMTP_USER,
          to: adminEmail,
          subject: language === 'ar' 
            ? `طلب تجربة جديد - ${businessname}` 
            : `New Demo Request - ${businessname}`,
          html: createAdminNotificationEmail(emailData, language || 'en'),
        });

        emailPromises.push(adminEmailPromise);

        // User confirmation email (only if email is provided)
        if (email) {
          const userEmailPromise = transporter.sendMail({
            from: process.env.NEXT_PUBLIC_SMTP_USER,
            to: email,
            subject: language === 'ar' 
              ? 'تأكيد طلب التجربة - نظام صريح' 
              : 'Demo Request Confirmation - Sareeh System',
            html: createUserConfirmationEmail(emailData, language || 'en'),
          });

          emailPromises.push(userEmailPromise);
        }

        // Send all emails
        await Promise.all(emailPromises);
        console.log('Emails sent successfully');
        
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails, just log it
        console.log('Request saved to database but email sending failed');
      }
    } else {
      console.log('Email configuration not available, skipping email sending');
    }

    // 3. Return success response
    return NextResponse.json({ 
      success: true, 
      requestNumber: requestNumber,
      message: 'Demo request submitted successfully',
      data: {
        id: dbData.id,
        businessname,
        contactname,
        industry,
        created_at: dbData.created_at
      }
    });

  } catch (error) {
    console.error('Error processing demo request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 