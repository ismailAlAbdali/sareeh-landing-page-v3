// Admin notification email template
function createAdminNotificationTemplate(requestNumber, data, language = 'en') {
  const isArabic = language === 'ar';
  
  return `
    <!DOCTYPE html>
    <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isArabic ? 'طلب تجربة جديد' : 'New Demo Request'}</title>
      <style>
        body { 
          font-family: ${isArabic ? 'Arial, Tahoma, sans-serif' : 'Arial, sans-serif'}; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: #ffffff; 
        }
        .header { 
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 24px; 
          font-weight: bold; 
        }
        .request-number { 
          background: #fef3c7; 
          color: #92400e; 
          padding: 10px; 
          border-radius: 6px; 
          font-weight: bold; 
          margin: 10px 0; 
          display: inline-block; 
        }
        .content { 
          padding: 30px 20px; 
          background: #f8fafc; 
        }
        .field { 
          margin-bottom: 20px; 
          background: white; 
          padding: 15px; 
          border-radius: 8px; 
          border-left: 4px solid #2563eb; 
        }
        .label { 
          font-weight: bold; 
          color: #374151; 
          margin-bottom: 5px; 
          font-size: 14px; 
        }
        .value { 
          color: #1f2937; 
          font-size: 16px; 
        }
        .priority-badge { 
          background: #dc2626; 
          color: white; 
          padding: 5px 10px; 
          border-radius: 20px; 
          font-size: 12px; 
          font-weight: bold; 
          display: inline-block; 
          margin-bottom: 20px; 
        }
        .footer { 
          background: #1f2937; 
          color: white; 
          padding: 20px; 
          text-align: center; 
          font-size: 14px; 
        }
        .contact-actions { 
          margin-top: 20px; 
          padding: 15px; 
          background: #dbeafe; 
          border-radius: 8px; 
          border: 1px solid #93c5fd; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${isArabic ? 'طلب تجربة جديد' : 'New Demo Request'}</h1>
          <div class="request-number">
            ${isArabic ? 'رقم الطلب' : 'Request Number'}: ${requestNumber}
          </div>
          <div class="priority-badge">
            ${isArabic ? 'عالية الأولوية' : 'HIGH PRIORITY'}
          </div>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">${isArabic ? 'اسم النشاط التجاري' : 'Business Name'}</div>
            <div class="value">${data.businessname}</div>
          </div>
          
          <div class="field">
            <div class="label">${isArabic ? 'اسم المسؤول' : 'Contact Person'}</div>
            <div class="value">${data.contactname}</div>
          </div>
          
          <div class="field">
            <div class="label">${isArabic ? 'البريد الإلكتروني' : 'Email Address'}</div>
            <div class="value">${data.email || (isArabic ? 'غير محدد' : 'Not provided')}</div>
          </div>
          
          <div class="field">
            <div class="label">${isArabic ? 'رقم الهاتف' : 'Phone Number'}</div>
            <div class="value">${data.phone}</div>
          </div>
          
          <div class="field">
            <div class="label">${isArabic ? 'القطاع' : 'Industry'}</div>
            <div class="value">${data.industry}${data.otherindustry ? ` - ${data.otherindustry}` : ''}</div>
          </div>
          
          <div class="field">
            <div class="label">${isArabic ? 'تاريخ ووقت الطلب' : 'Request Date & Time'}</div>
            <div class="value">${new Date().toLocaleString(isArabic ? 'ar-OM' : 'en-US')}</div>
          </div>
          
          <div class="contact-actions">
            <h3>${isArabic ? 'الإجراءات المطلوبة' : 'Required Actions'}:</h3>
            <ul>
              <li>${isArabic ? 'التواصل مع العميل خلال 24 ساعة' : 'Contact customer within 24 hours'}</li>
              <li>${isArabic ? 'جدولة عرض النظام' : 'Schedule system demonstration'}</li>
              <li>${isArabic ? 'إرسال عرض السعر المناسب' : 'Send appropriate pricing proposal'}</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>${isArabic ? 'تم إرسال هذا الطلب من موقع صريح' : 'This request was sent from Sareeh website'}</p>
          <p>${isArabic ? 'عمان كلود - نظام صريح' : 'OmanCloud - Sareeh System'}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = { createAdminNotificationTemplate }; 