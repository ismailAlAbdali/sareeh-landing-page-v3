export function createAdminNotificationEmail(data: any, language: string) {
  const isArabic = language === 'ar';
  
  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isArabic ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isArabic ? 'طلب تجربة جديد - نظام صريح' : 'New Demo Request - Sareeh System'}</title>
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
        }
        .email-container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: ${isArabic ? 'right' : 'left'};
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
        .info-section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .info-section h3 {
          margin: 0 0 15px 0; 
          color: #1f2937;
          text-align: ${isArabic ? 'right' : 'left'};
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 15px;
        }
        .info-item {
          background: white;
          padding: 15px;
          border-radius: 6px;
          border-${isArabic ? 'right' : 'left'}: 4px solid #2563eb;
          text-align: ${isArabic ? 'right' : 'left'};
        }
        .info-label {
          font-weight: bold;
          color: #374151;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-value {
          color: #1f2937;
          font-size: 16px;
          margin-top: 5px;
        }
        .industry-badge {
          display: inline-block;
          background: #2563eb;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        .industry-section {
          margin-top: 20px;
          text-align: ${isArabic ? 'right' : 'left'};
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
          .info-grid {
            grid-template-columns: 1fr;
          }
          body {
            padding: 10px;
          }
          .email-container {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
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
              <div class="info-value">${data.businessname}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">${isArabic ? 'اسم المسؤول' : 'Contact Name'}</div>
              <div class="info-value">${data.contactname}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">${isArabic ? 'البريد الإلكتروني' : 'Email Address'}</div>
              <div class="info-value">${data.email}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">${isArabic ? 'رقم الهاتف' : 'Phone Number'}</div>
              <div class="info-value">${data.phone}</div>
            </div>
          </div>
          
          <div class="industry-section">
            <div class="info-label">${isArabic ? 'القطاع' : 'Industry'}</div>
            <div style="margin-top: 8px;">
              <span class="industry-badge">${data.industry}</span>
              ${data.otherindustry ? `<div style="margin-top: 8px; color: #6b7280; font-size: 14px;">${isArabic ? 'تفاصيل إضافية:' : 'Additional details:'} ${data.otherindustry}</div>` : ''}
            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" class="cta-button">
            ${isArabic ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
          </a>
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