import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const allowedOrigins = [
    /^https:\/\/.*\.cloudfront\.net$/,
    /^http:\/\/localhost:\d+$/,
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests from CloudFront and localhost for development
      const allowedOrigins = [
        /^https:\/\/.*\.cloudfront\.net$/,
        /^http:\/\/localhost:\d+$/,
      ];

      if (!origin || allowedOrigins.some((pattern) => pattern.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global prefix (optional)
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
