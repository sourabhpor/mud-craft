import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { LoggerMiddleware } from "./middleware/logger";

import { UserModule } from "./modules/user/user.module";
import { RoleModule } from "./modules/role/role.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AddressModule } from "./modules/address/address.module";
import { ProductModule } from "./modules/product/product.module";
import { CategoryModule } from "./modules/category/category.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/",
    }),

    ConfigModule.forRoot({
      isGlobal: true, // pura project me use hoga
    }),

    // 👇 DB config from .env
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: Number(configService.get<number>("DB_PORT")),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        autoLoadEntities: true,
        synchronize: true, // dev only
      }),
    }),

    UserModule,
    RoleModule,
    AuthModule,
    AddressModule,
    ProductModule,
    CategoryModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
