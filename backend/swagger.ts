import fs = require('fs');
import swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Time to document that Express API you built',
      version: '1.0.0',
      description:
        'A test project to understand how easy it is to document and Express API',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'Info@SmartBear.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:7000',
      },
    ],
  },
  apis: [
    './models/*.ts',
    './routes/*.ts',
  ],
};
const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;

export const generateSwaggerJSON = (): void => {
  console.log('GENERATE swagger.json');
  fs.writeFile('swagger.json', JSON.stringify(swaggerSpec), (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};
