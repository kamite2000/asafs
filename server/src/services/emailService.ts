import nodemailer from 'nodemailer';
import { config } from '../config';

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (config.smtp.host && config.smtp.user && config.smtp.pass) {
      this.transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port || 587,
        secure: config.smtp.port === 465,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.pass,
        },
      });
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    if (!this.transporter) {
      console.warn('Email service not configured. Skipping email send.');
      return;
    }

    try {
      await this.transporter.sendMail({
        from: config.smtp.from || '"ASAFS" <noreply@asafs.org>',
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      // We don't throw here to avoid breaking the main flow (e.g., successful subscription)
    }
  }

  async sendWelcomeNewsletter(email: string) {
    const subject = 'Bienvenue à la Newsletter ASAFS';
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h1 style="color: #2563eb;">Bienvenue chez ASAFS !</h1>
        <p>Merci de vous être inscrit à notre newsletter.</p>
        <p>Vous recevrez désormais nos dernières actualités, événements et programmes directement dans votre boîte mail.</p>
        <hr />
        <p style="font-size: 0.8em; color: #666;">Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer ce message ou nous contacter.</p>
      </div>
    `;
    await this.sendEmail(email, subject, html);
  }

  async sendContactAcknowledgment(email: string, name: string) {
    const subject = 'Nous avons reçu votre message - ASAFS';
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #2563eb;">Bonjour ${name},</h2>
        <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
        <p>Notre équipe examine votre demande et vous répondra dans les plus brefs délais.</p>
        <br />
        <p>Cordialement,<br />L'équipe ASAFS</p>
      </div>
    `;
    await this.sendEmail(email, subject, html);
  }
}

export const emailService = new EmailService();
