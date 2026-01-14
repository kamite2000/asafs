
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient() as any;

export class SettingsService {
  async getSettings() {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' }
    });


    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: 'default',
          facebookUrl: '',
          twitterUrl: '',
          instagramUrl: '',
          linkedinUrl: '',
          missionVideoUrl: ''
        }
      });
    }

    return settings;
  }

  async updateSettings(data: { facebookUrl?: string; twitterUrl?: string; instagramUrl?: string; linkedinUrl?: string; missionVideoUrl?: string }) {
    return await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {
        ...data,
        updatedAt: new Date()
      },
      create: {
        id: 'default',
        ...data
      }
    });
  }

}


export const settingsService = new SettingsService();
