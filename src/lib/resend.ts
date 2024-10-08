import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);       // Import resend in 1 variable using secret api key and export it