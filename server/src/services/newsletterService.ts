import { PrismaClient } from '@prisma/client';
import { emailService } from './emailService';

const prisma = new PrismaClient();

export class NewsletterService {
  async subscribe(email: string) {
    // Check if already exists
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email }
    });

    if (existing) {
      if (!existing.isActive) {
        // Re-activate
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { isActive: true }
        });
        await emailService.sendWelcomeNewsletter(email);
      }
      return existing;
    }

    const sub = await prisma.newsletterSubscription.create({
      data: { email }
    });

    // Send welcome email
    await emailService.sendWelcomeNewsletter(email);

    return sub;
  }

  async unsubscribe(email: string) {
    return await prisma.newsletterSubscription.update({
      where: { email },
      data: { isActive: false }
    });
  }

  async getSubscriptions() {
    return await prisma.newsletterSubscription.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const newsletterService = new NewsletterService();
