import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  console.log(configService.get('DB_NAME'), 'name');
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Set to false in production
    logging: configService.get('NODE_ENV') === 'development',
  };
};
