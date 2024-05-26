import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions.filter';
import { ResponseInterceptor } from './common/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('v1/api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Dokan - API')
    .setDescription('Dokan - eCommerce API collection')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configuration().port);
}
bootstrap();
