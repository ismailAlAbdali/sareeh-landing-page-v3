// import { NextRequest, NextResponse } from 'next/server';
// import { createEmailTransporter, validateEmailConfig, getRecipientEmail } from '@/lib/email-config';
// import { createAdminNotificationEmail, createUserConfirmationEmail } from '@/lib/email-templates';
// import { demoFormRateLimiter } from '@/lib/rate-limiter';

// export async function POST(request: NextRequest) {
//   try {
//     // Rate limiting
//     const clientIP = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
//     if (!demoFormRateLimiter.isAllowed(clientIP)) {
//       const timeLeft = demoFormRateLimiter.getRemainingTime(clientIP);
//       const minutes = Math.ceil(timeLeft / 60000);
//       return NextResponse.json(
//         { error: `Rate limit exceeded. Please wait ${minutes} minutes before submitting another request.` },
//         { status: 429 }
//       );
//     }

//     const body = await request.json();
//     const { businessname, contactname, email, phone, industry, otherindustry, language } = body;

//     // Validate required fields
//     if (!businessname || !contactname || !phone || !industry) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Validate email configuration
//     if (!validateEmailConfig()) {
//       return NextResponse.json(
//         { error: 'Email configuration is missing' },
//         { status: 500 }
//       );
//     }

//     // Create transporter
//     const transporter = createEmailTransporter();
//     const recipientEmail = getRecipientEmail();

//     // Create email content
//     const adminEmailHTML = createAdminNotificationEmail(body, language || 'en');
//     const userEmailHTML = createUserConfirmationEmail(body, language || 'en');
    
//     // Send admin notification email
//     const adminInfo = await transporter.sendMail({
//       from: `"Sareeh POS System" <${process.env.NEXT_PUBLIC_SMTP_USER}>`,
//       to: recipientEmail,
//       subject: language === 'ar' 
//         ? `طلب تجربة جديد - ${businessname}`
//         : `New Demo Request - ${businessname}`,
//       html: adminEmailHTML,
//       text: language === 'ar'
//         ? `طلب تجربة جديد من ${businessname} - ${contactname} - ${email || 'بدون بريد إلكتروني'} - ${phone} - ${industry}`
//         : `New demo request from ${businessname} - ${contactname} - ${email || 'No email'} - ${phone} - ${industry}`,
//     });

//     let userInfo = null;
//     if (email && email.trim() !== '') {
//       userInfo = await transporter.sendMail({
//         from: `"Sareeh POS System" <${process.env.NEXT_PUBLIC_SMTP_USER}>`,
//         to: email,
//         subject: language === 'ar' 
//           ? `تأكيد طلب التجربة - نظام صريح`
//           : `Demo Request Confirmation - Sareeh System`,
//         html: userEmailHTML,
//         text: language === 'ar'
//           ? `شكراً لك على طلب تجربة نظام صريح. لقد استلمنا طلبك بنجاح وسيقوم فريقنا بالتواصل معك قريباً.`
//           : `Thank you for requesting a demo of the Sareeh POS system. We have successfully received your request and our team will contact you soon.`,
//       });
//     }

//     console.log('Admin email sent successfully:', adminInfo.messageId);
//     if (userInfo) {
//       console.log('User confirmation email sent successfully:', userInfo.messageId);
//     }

//     return NextResponse.json({ 
//       success: true, 
//       adminMessageId: adminInfo.messageId,
//       userMessageId: userInfo?.messageId || null
//     });

//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { error: 'Failed to send email' },
//       { status: 500 }
//     );
//   }
// }

// Export a dummy function to make this a valid module
export async function GET() {
  return new Response('This endpoint has been moved to Netlify Functions', { status: 404 });
}
