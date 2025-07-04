import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  secure: boolean;
  mailTo: string;
}

export function getEmailConfig(): EmailConfig {
  const host = process.env.NEXT_PUBLIC_SMTP_HOST;
  const port = parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || '587');
  const user = process.env.NEXT_PUBLIC_SMTP_USER;
  const pass = process.env.NEXT_PUBLIC_SMTP_PASS;
  const mailTo = process.env.NEXT_PUBLIC_MAIL_TO;

  if (!host || !user || !pass || !mailTo) {
    throw new Error('Missing SMTP configuration or recipient email');
  }

  return {
    host,
    port,
    user,
    pass,
    secure: port === 465, // true for 465, false for other ports
    mailTo,
  };
}

export function createEmailTransporter() {
  const config = getEmailConfig();
  
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export function validateEmailConfig(): boolean {
  try {
    getEmailConfig();
    return true;
  } catch {
    return false;
  }
}

export function getRecipientEmail(): string {
  const config = getEmailConfig();
  return config.mailTo;
} 