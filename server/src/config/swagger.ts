import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './index';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ASAF Platform API',
      version: '1.0.0',
      description: 'API Documentation for ASAF Platform.\n\n**Conçu et Développé par Felicien Mukamba Aumsoft**',
      contact: {
        name: 'Felicien Mukamba Aumsoft',
        url: 'https://aumsoft.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Assumes running from root of server (ts-node) or built (dist)
};

export const specs = swaggerJsdoc(options);
