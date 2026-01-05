import { PrismaClient } from '@prisma/client';
import { emailService } from './emailService';

const prisma = new PrismaClient();

export class ContactMessageService {
  async saveMessage(data: { name: string; email: string; subject?: string; message: string }) {
    const msg = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      }
    });

    // Send acknowledgment email to user
    await emailService.sendContactAcknowledgment(data.email, data.name);

    return msg;
  }

  async getMessages() {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async markAsRead(id: string) {
    return await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
  }

  async deleteMessage(id: string) {
    return await prisma.contactMessage.delete({
      where: { id }
    });
  }
}

export const contactMessageService = new ContactMessageService();
