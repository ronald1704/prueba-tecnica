import { TypeOrmModule } from "@nestjs/typeorm";
import { Configuration } from "../config/config.keys";
import { ConfigService } from "../config/config.service";
import { ConnectionOptions } from "tls";
import { ConfigModule } from "../config/config.module";

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                ssl: false,
                type: "mysql",
                port: 3307,
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                database: config.get(Configuration.DATABASE),
                entities: [__dirname + "/../**/*.entity{.ts,.js}"],
                migrations: [__dirname + "/migrations/*{.ts,.js}"]
            } as ConnectionOptions
        }
    })
]