import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ContentService {
  async getAllPosts(query: any) {
    const { type, status } = query;
    const where: any = {};
    if (type) where.type = type as string;
    if (status) where.status = status as string;

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return posts;
  }

  async createPost(data: any, file?: Express.Multer.File) {
    const imageUrl = file ? `/uploads/${file.filename}` : undefined;
    
    // Note: data fields come as strings from FormData, might need parsing depending on usage
    // But Prisma handles string to string fine.
    
    return await prisma.post.create({
      data: {
        type: data.type,
        title: data.title,
        content: data.content,
        category: data.category,
        date: data.date,
        status: data.status,
        author: data.author,
        imageUrl: imageUrl
      }
    });
  }

  async updatePost(id: string, data: any, file?: Express.Multer.File) {
    const imageUrl = file ? `/uploads/${file.filename}` : data.imageUrl;

    return await prisma.post.update({
      where: { id },
      data: {
        type: data.type,
        title: data.title,
        content: data.content,
        category: data.category,
        date: data.date,
        status: data.status,
        author: data.author,
        imageUrl: imageUrl
      }
    });
  }

  async deletePost(id: string) {
    return await prisma.post.delete({ where: { id } });
  }
}

export const contentService = new ContentService();
