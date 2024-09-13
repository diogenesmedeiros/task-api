import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import postgres from "pg";
import dotenv from "dotenv";

dotenv.config();

interface processEnv {
    DATABASE_URL: string;
    DATABASE_DRIVER: string;
}

const env = process.env as unknown as processEnv

export class Database {
    private static instance: Sequelize;
    private static retryAttempts: number = 5;
    private static retryInterval: number = 5000;

    private constructor() {
        throw new Error('Use Database.getInstance() instead.');
    }

    private static async createInstance(): Promise<void> {
        const db_url = env.DATABASE_URL
        const db_driver = env.DATABASE_DRIVER
        let dialect_module;

        if (!db_url) {
            throw new Error('Database URL not specified');
        }

        if (!db_driver) {
            throw new Error('Database driver not specified');
        }

        switch (db_driver) {
            case "mysql":
                dialect_module = mysql2
                break
            case "postgres":
                dialect_module = postgres
                break
            default:
                throw new Error(`Unsupported dialect: ${db_driver}`)
        }

        Database.instance = new Sequelize(db_url, {
            dialect: db_driver,
            dialectModule: dialect_module,
            pool: {
                max: 50,
                min: 5,
                acquire: 30000,
                idle: 10000,
                evict: 10000,
            },
            logging: (msg) => console.log(msg),
        })
    }

    private static async authenticate(attempt: number = 0): Promise<void> {
        try {
            if (!Database.instance) throw new Error('Database instance is not created.');
            await Database.instance.authenticate();
            console.log('Conectado ao banco de dados com sucesso!');
        } catch (error) {
            console.error('Não foi possível conectar ao banco de dados:', error);

            if (attempt < Database.retryAttempts) {
                console.log(`Tentando novamente em ${Database.retryInterval / 1000} segundos...`);
                await new Promise(resolve => setTimeout(resolve, Database.retryInterval));
                await Database.authenticate(attempt + 1);
            } else {
                console.error('Número máximo de tentativas de reconexão atingido.');
                process.exit(1);
            }
        }
    }

    public static async getInstance(): Promise<Sequelize> {
        if (!Database.instance) {
            await Database.createInstance();
        }
        return Database.instance;
    }
}