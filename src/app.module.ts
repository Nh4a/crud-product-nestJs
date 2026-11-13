import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module.js';
import databaseConfig from './config/database.config.js';
import cloudinaryConfig from './config/cloudinary.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, cloudinaryConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.userName'),
        password: configService.get<string>('database.password'),
        database: configService.get('database.databaseName'),
        // entities: ['src/**/*.entity.ts'],
        // migrations: ['src/migrations/*.ts'],

        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: false,
        migrationsTableName: 'migrations',
      }),
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
