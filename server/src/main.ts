import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import express from "express";
import path from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "public/uploads")),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
