export function createUserConfirmationEmail(data: any, language: string) {
  const isArabic = language === 'ar';
  
  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isArabic ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isArabic ? 'تأكيد طلب التجربة - نظام صريح' : 'Demo Request Confirmation - Sareeh System'}</title>
      <style>
        body {
          font-family: ${isArabic ? 'Arial, sans-serif' : 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'};
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
          direction: ${isArabic ? 'rtl' : 'ltr'};
          text-align: center;
        }
        .email-container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e9ecef;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #6b7280;
          font-size: 16px;
        }
        .success-icon-container {
          text-align: center;
          margin: 20px 0;
        }
        .success-icon {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: #10b981;
          border-radius: 50%;
          text-align: center;
          line-height: 60px;
          color: white;
          font-size: 24px;
          font-weight: bold;
        }
        .content-section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 25px;
          margin: 20px 0;
          text-align: center;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 15px;
        }
        .message {
          color: #4b5563;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .request-details {
          background: white;
          border-radius: 6px;
          padding: 20px;
          margin: 20px 0;
          border-${isArabic ? 'right' : 'left'}: 4px solid #2563eb;
          text-align: center;
          display: inline-block;
          min-width: 300px;
        }
        .detail-item {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
          flex-direction: row;
        }
        .detail-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .detail-label {
          font-weight: 600;
          color: #374151;
          margin: 0 5px;
        }
        .detail-value {
          color: #1f2937;
          margin: 0 5px;
        }
        .next-steps {
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .next-steps h3 {
          color: #1e40af;
          margin-bottom: 15px;
          font-size: 18px;
          text-align: center;
        }
        .step-list {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          display: inline-block;
          text-align: left;
        }
        .step-list li {
          padding: 8px 0;
          padding-left: 25px;
          position: relative;
          text-align: left;
        }
        .step-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
        }
        .contact-info {
          background: #fef3c7;
          border: 1px solid #fde68a;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .contact-info h3 {
          color: #92400e;
          margin-bottom: 10px;
          font-size: 16px;
          text-align: center;
        }
        .contact-method {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          flex-direction: row;
        }
        .contact-method:last-child {
          margin-bottom: 0;
        }
        .contact-icon {
          width: 20px;
          margin: 0 10px;
          color: #92400e;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          color: #6b7280;
          font-size: 14px;
        }
        .cta-button {
          display: inline-block;
          background: #2563eb;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin-top: 20px;
        }
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          .email-container {
            padding: 20px;
          }
          .request-details {
            min-width: unset;
          }
          .detail-item {
            flex-direction: column;
            gap: 5px;
          }
          .contact-method {
            flex-direction: column;
            align-items: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
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
            ${isArabic ? `مرحباً ${data.contactname}،` : `Hello ${data.contactname},`}
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
                ? `<span class="detail-label">اسم النشاط التجاري:</span><span class="detail-value">${data.businessname}</span>`
                : `<span class="detail-label">Business Name:</span> <span class="detail-value">${data.businessname}</span>`
              }
            </div>
            
            <div class="detail-item">
              ${isArabic
                ? `<span class="detail-label">القطاع:</span><span class="detail-value">${data.industry}</span>`
                : `<span class="detail-label">Industry:</span> <span class="detail-value">${data.industry}</span>`
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
            <h3>${isArabic ? 'معلومات التواصل:' : 'Contact Information:'}</h3>
            <div class="contact-method">
              <span class="contact-icon">📧</span>
              <span>${process.env.NEXT_PUBLIC_SMTP_USER}</span>
            </div>
            <div class="contact-method">
              <span class="contact-icon">📱</span>
              <span>${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}</span>
            </div>
            <div class="contact-method">
              <span class="contact-icon">🌐</span>
              <span>https://sareeh.omancloud.com</span>
            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" class="cta-button">
            ${isArabic ? 'تواصل معنا عبر واتساب' : 'Contact us via WhatsApp'}
          </a>
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