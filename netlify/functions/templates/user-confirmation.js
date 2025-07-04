// User confirmation email template
function createUserConfirmationTemplate(requestNumber, data, language = 'en') {
  const isArabic = language === 'ar';
  
  return `
    <!DOCTYPE html>
    <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isArabic ? 'تأكيد طلب التجربة' : 'Demo Request Confirmation'}</title>
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
          background: linear-gradient(135deg, #059669 0%, #047857 100%); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 24px; 
          font-weight: bold; 
        }
        .header p { 
          margin: 10px 0 0 0; 
          opacity: 0.9; 
        }
        .content { 
          padding: 30px 20px; 
          background: #f0fdf4; 
        }
        .greeting { 
          font-size: 18px; 
          color: #065f46; 
          margin-bottom: 20px; 
        }
        .request-number { 
          background: #dcfce7; 
          color: #166534; 
          padding: 15px; 
          border-radius: 8px; 
          text-align: center; 
          font-weight: bold; 
          margin: 20px 0; 
          border: 2px solid #16a34a; 
        }
        .details { 
          background: white; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0; 
          border-left: 4px solid #059669; 
        }
        .detail-row { 
          display: flex; 
          justify-content: space-between; 
          margin-bottom: 10px; 
          padding: 8px 0; 
          border-bottom: 1px solid #e5e7eb; 
        }
        .detail-row:last-child { 
          border-bottom: none; 
        }
        .detail-label { 
          font-weight: bold; 
          color: #374151; 
        }
        .detail-value { 
          color: #1f2937; 
        }
        .next-steps { 
          background: #dbeafe; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0; 
          border: 1px solid #93c5fd; 
        }
        .next-steps h3 { 
          color: #1e40af; 
          margin-top: 0; 
        }
        .next-steps ul { 
          margin: 10px 0; 
          padding-left: ${isArabic ? '0' : '20px'}; 
          padding-right: ${isArabic ? '20px' : '0'}; 
        }
        .next-steps li { 
          margin-bottom: 8px; 
          color: #1e3a8a; 
        }
        .contact-info { 
          background: #fef3c7; 
          padding: 15px; 
          border-radius: 8px; 
          margin: 20px 0; 
          border: 1px solid #f59e0b; 
        }
        .footer { 
          background: #1f2937; 
          color: white; 
          padding: 20px; 
          text-align: center; 
          font-size: 14px; 
        }
        .logo { 
          font-size: 20px; 
          font-weight: bold; 
          color: #059669; 
          margin-bottom: 10px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${isArabic ? 'شكراً لك!' : 'Thank You!'}</h1>
          <p>${isArabic ? 'تم استلام طلبك بنجاح' : 'Your request has been received successfully'}</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            ${isArabic ? 'مرحباً' : 'Hello'} ${data.contactname},
          </div>
          
          <p>${isArabic 
            ? 'شكراً لك على طلب تجربة نظام صريح لنقاط البيع. لقد استلمنا طلبك بنجاح وسيقوم فريقنا بالتواصل معك في أقرب وقت ممكن.'
            : 'Thank you for requesting a demo of the Sareeh POS system. We have successfully received your request and our team will contact you as soon as possible.'
          }</p>
          
          <div class="request-number">
            ${isArabic ? 'رقم الطلب' : 'Request Number'}: ${requestNumber}
          </div>
          
          <div class="details">
            <h3>${isArabic ? 'تفاصيل طلبك' : 'Your Request Details'}:</h3>
            <div class="detail-row">
              <span class="detail-label">${isArabic ? 'اسم النشاط التجاري' : 'Business Name'}:</span>
              <span class="detail-value">${data.businessname}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${isArabic ? 'القطاع' : 'Industry'}:</span>
              <span class="detail-value">${data.industry}${data.otherindustry ? ` - ${data.otherindustry}` : ''}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${isArabic ? 'رقم الهاتف' : 'Phone Number'}:</span>
              <span class="detail-value">${data.phone}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${isArabic ? 'تاريخ الطلب' : 'Request Date'}:</span>
              <span class="detail-value">${new Date().toLocaleDateString(isArabic ? 'ar-OM' : 'en-US')}</span>
            </div>
          </div>
          
          <div class="next-steps">
            <h3>${isArabic ? 'الخطوات التالية' : 'Next Steps'}:</h3>
            <ul>
              <li>${isArabic 
                ? 'سنقوم بالتواصل معك خلال 24 ساعة'
                : 'We will contact you within 24 hours'
              }</li>
              <li>${isArabic 
                ? 'جدولة موعد مناسب لعرض النظام'
                : 'Schedule a convenient time for system demonstration'
              }</li>
              <li>${isArabic 
                ? 'توضيح جميع المميزات والخدمات المتاحة'
                : 'Explain all available features and services'
              }</li>
              <li>${isArabic 
                ? 'تقديم عرض السعر المناسب لاحتياجاتك'
                : 'Provide pricing proposal tailored to your needs'
              }</li>
            </ul>
          </div>
          
          <div class="contact-info">
            <h3>${isArabic ? 'معلومات التواصل' : 'Contact Information'}:</h3>
            <p>${isArabic 
              ? 'إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا:'
              : 'If you have any questions, please don\'t hesitate to contact us:'
            }</p>
            <p><strong>${isArabic ? 'الهاتف' : 'Phone'}:</strong> +968 9554 4746</p>
            <p><strong>${isArabic ? 'البريد الإلكتروني' : 'Email'}:</strong> sales@omancloud.com</p>
            <p><strong>${isArabic ? 'الموقع' : 'Location'}:</strong> ${isArabic ? 'بوشهر، غلا، برج الخليج، عمان' : 'Bousher, Ghala, Khaleej Tower, Oman'}</p>
          </div>
          
          <p>${isArabic 
            ? 'نتطلع للقائك قريباً وتقديم أفضل حلول نقاط البيع لعملك!'
            : 'We look forward to meeting you soon and providing the best POS solutions for your business!'
          }</p>
        </div>
        
        <div class="footer">
          <div class="logo">صريح | Sareeh</div>
          <p>${isArabic ? 'مع تحيات فريق صريح' : 'Best regards, Sareeh Team'}</p>
          <p>${isArabic ? 'عمان كلود' : 'OmanCloud'}</p>
          <p>${isArabic ? 'الحل الرائد لنقاط البيع في عمان' : 'The leading POS solution in Oman'}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = { createUserConfirmationTemplate }; 