// Simple HTML sanitization function to prevent XSS
const sanitizeHtml = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

export function createAdminNotificationEmail(data: any, language: string) {
  const isArabic = language === 'ar';
  
  // Sanitize user input data
  const sanitizedData = {
    businessname: sanitizeHtml(data.businessname || ''),
    contactname: sanitizeHtml(data.contactname || ''),
    email: sanitizeHtml(data.email || ''),
    phone: sanitizeHtml(data.phone || ''),
    industry: sanitizeHtml(data.industry || ''),
    otherindustry: sanitizeHtml(data.otherindustry || ''),
  };
  
  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isArabic ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isArabic ? 'طلب تجربة جديد' : 'New Demo Request'}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 8px;
        }
        .title {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .subtitle {
          color: #6b7280;
          font-size: 16px;
        }
        .info-section {
          margin-bottom: 30px;
        }
        .info-section h3 {
          color: #1f2937;
          margin-bottom: 20px;
          font-size: 18px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 8px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .info-item {
          background: #f9fafb;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }
        .info-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 5px;
          font-size: 14px;
        }
        .info-value {
          color: #1f2937;
          font-size: 16px;
        }
        .industry-section {
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #10b981;
        }
        .industry-badge {
          background: #10b981;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">${isArabic ? 'صريح' : 'Sareeh'}</div>
          <div class="title">${isArabic ? 'طلب تجربة جديد' : 'New Demo Request'}</div>
          <div class="subtitle">${isArabic ? 'تم استلام طلب تجربة جديد لنظام نقاط البيع' : 'A new POS system demo request has been received'}</div>
        </div>

        <div class="info-section">
          <h3>${isArabic ? 'تفاصيل الطلب' : 'Request Details'}</h3>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">${isArabic ? 'اسم النشاط التجاري' : 'Business Name'}</div>
              <div class="info-value">${sanitizedData.businessname}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">${isArabic ? 'اسم المسؤول' : 'Contact Name'}</div>
              <div class="info-value">${sanitizedData.contactname}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">${isArabic ? 'البريد الإلكتروني' : 'Email Address'}</div>
              <div class="info-value">${sanitizedData.email || (isArabic ? 'غير محدد' : 'Not provided')}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">${isArabic ? 'رقم الهاتف' : 'Phone Number'}</div>
              <div class="info-value">${sanitizedData.phone}</div>
            </div>
          </div>
          
          <div class="industry-section">
            <div class="info-label">${isArabic ? 'القطاع' : 'Industry'}</div>
            <div style="margin-top: 8px;">
              <span class="industry-badge">${sanitizedData.industry}</span>
              ${sanitizedData.otherindustry ? `<div style="margin-top: 8px; color: #6b7280; font-size: 14px;">${isArabic ? 'تفاصيل إضافية:' : 'Additional details:'} ${sanitizedData.otherindustry}</div>` : ''}
            </div>
          </div>
        </div>

        <div class="footer">
          <p>${isArabic ? 'تم إرسال هذا الطلب من نموذج التجربة في موقع صريح' : 'This request was submitted from the Sareeh demo form'}</p>
          <p>${new Date().toLocaleString(isArabic ? 'ar-SA' : 'en-US')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function createUserConfirmationEmail(data: any, language: string) {
  const isArabic = language === 'ar';
  
  // Sanitize user input data
  const sanitizedData = {
    businessname: sanitizeHtml(data.businessname || ''),
    contactname: sanitizeHtml(data.contactname || ''),
    email: sanitizeHtml(data.email || ''),
    phone: sanitizeHtml(data.phone || ''),
    industry: sanitizeHtml(data.industry || ''),
    otherindustry: sanitizeHtml(data.otherindustry || ''),
  };
  
  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isArabic ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isArabic ? 'تأكيد طلب التجربة' : 'Demo Request Confirmation'}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 8px;
        }
        .title {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .subtitle {
          color: #6b7280;
          font-size: 16px;
        }
        .success-icon-container {
          text-align: center;
          margin: 30px 0;
        }
        .success-icon {
          background: #10b981;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
        }
        .content-section {
          margin-bottom: 30px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 15px;
        }
        .message {
          color: #4b5563;
          margin-bottom: 25px;
          line-height: 1.7;
        }
        .request-details {
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 25px;
        }
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .detail-item:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 600;
          color: #374151;
        }
        .detail-value {
          color: #1f2937;
          text-align: ${isArabic ? 'left' : 'right'};
        }
        .next-steps {
          background: #eff6ff;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }
        .next-steps h3 {
          color: #1e40af;
          margin-bottom: 15px;
          font-size: 18px;
        }
        .step-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .step-list li {
          padding: 8px 0;
          color: #1e40af;
          position: relative;
          padding-${isArabic ? 'right' : 'left'}: 20px;
        }
        .step-list li:before {
          content: "✓";
          color: #10b981;
          font-weight: bold;
          position: absolute;
          ${isArabic ? 'right' : 'left'}: 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        .contact-info {
          background: #fef3c7;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
          text-align: center;
        }
        .contact-info p {
          margin: 5px 0;
          color: #92400e;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">${isArabic ? 'صريح' : 'Sareeh'}</div>
          <div class="title">${isArabic ? 'تأكيد طلب التجربة' : 'Demo Request Confirmation'}</div>
          <div class="subtitle">${isArabic ? 'شكراً لك على اهتمامك بنظام صريح' : 'Thank you for your interest in Sareeh'}</div>
        </div>

        <div class="success-icon-container">
          <div class="success-icon">✓</div>
        </div>

        <div class="content-section">
          <div class="greeting">
            ${isArabic ? `مرحباً ${sanitizedData.contactname}،` : `Hello ${sanitizedData.contactname},`}
          </div>
          
          <div class="message">
            ${isArabic 
              ? `شكراً لك على طلب تجربة نظام صريح لنقاط البيع. لقد استلمنا طلبك بنجاح وسيقوم فريقنا بالتواصل معك في أقرب وقت ممكن.`
              : `Thank you for requesting a demo of the Sareeh POS system. We have successfully received your request and our team will contact you as soon as possible.`
            }
          </div>

          <div class="request-details">
            <h3 style="margin: 0 0 15px 0; color: #1f2937; text-align: ${isArabic ? 'right' : 'left'};">
              ${isArabic ? 'تفاصيل طلبك:' : 'Your Request Details:'}
            </h3>
            
            <div class="detail-item">
              ${isArabic
                ? `<span class="detail-label">اسم النشاط التجاري:</span><span class="detail-value">${sanitizedData.businessname}</span>`
                : `<span class="detail-label">Business Name:</span> <span class="detail-value">${sanitizedData.businessname}</span>`
              }
            </div>
            
            <div class="detail-item">
              ${isArabic
                ? `<span class="detail-label">القطاع:</span><span class="detail-value">${sanitizedData.industry}</span>`
                : `<span class="detail-label">Industry:</span> <span class="detail-value">${sanitizedData.industry}</span>`
              }
            </div>
            
            <div class="detail-item">
              ${isArabic
                ? `<span class="detail-label">رقم الطلب:</span><span class="detail-value">#${Date.now().toString().slice(-6)}</span>`
                : `<span class="detail-label">Request ID:</span> <span class="detail-value">#${Date.now().toString().slice(-6)}</span>`
              }
            </div>
            
            <div class="detail-item">
              ${isArabic
                ? `<span class="detail-label">تاريخ الطلب:</span><span class="detail-value">${new Date().toLocaleDateString('ar-SA')}</span>`
                : `<span class="detail-label">Request Date:</span> <span class="detail-value">${new Date().toLocaleDateString('en-US')}</span>`
              }
            </div>
          </div>

          <div class="next-steps">
            <h3>${isArabic ? 'الخطوات التالية:' : 'What happens next?'}</h3>
            <ul class="step-list">
              <li>${isArabic ? 'سيقوم فريقنا بمراجعة طلبك خلال 24 ساعة' : 'Our team will review your request within 24 hours'}</li>
              <li>${isArabic ? 'سنقوم بالتواصل معك عبر الهاتف أو البريد الإلكتروني' : 'We will contact you via phone or email'}</li>
              <li>${isArabic ? 'سنقوم بجدولة جلسة تجربة مخصصة لاحتياجاتك' : 'We will schedule a personalized demo session for your needs'}</li>
              <li>${isArabic ? 'ستحصل على عرض أسعار مفصل ومخصص' : 'You will receive a detailed and customized quote'}</li>
            </ul>
          </div>

          <div class="contact-info">
            <p><strong>${isArabic ? 'للتواصل المباشر:' : 'For immediate contact:'}</strong></p>
            <p>${isArabic ? 'واتساب:' : 'WhatsApp:'} +968 1234 5678</p>
            <p>${isArabic ? 'البريد الإلكتروني:' : 'Email:'} info@sareeh.com</p>
          </div>
        </div>

        <div class="footer">
          <p>${isArabic ? 'شكراً لك على اختيار صريح' : 'Thank you for choosing Sareeh'}</p>
          <p>${isArabic ? 'فريق صريح' : 'The Sareeh Team'}</p>
        </div>
      </div>
    </body>
    </html>
  `;
} 