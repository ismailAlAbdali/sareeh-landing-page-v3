import axios from 'axios';
import type { NewDemoRequest } from '@/types/supabase';

export const sendDemoRequestEmail = async (data: NewDemoRequest) => {
    try {
      await axios.post('/api/send-email', {
        to: 'sales@omancloud.com',
        subject: 'New Demo Request',
        html: `
          <h1>New Demo Request</h1>
          <p>A new demo request has been submitted with the following details:</p>
          <ul>
            <li><strong>Business Name:</strong> ${data.businessname}</li>
            <li><strong>Contact Name:</strong> ${data.contactname}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
            <li><strong>Industry:</strong> ${data.industry}${data.otherindustry ? ` - ${data.otherindustry}` : ''}</li>
          </ul>
        `,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  }; 