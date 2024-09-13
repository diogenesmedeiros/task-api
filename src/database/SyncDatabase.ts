import { Database } from "./Database";
import GroupTask, { initializeGroupTaskModel } from "../models/GroupTask.model";
import Task, { initializeTaskModel } from "../models/Task.model";

export async function Sync(): Promise<void> {
    interface ProcessEnv {
        APP_MODE: string;
        DATABASE_MODE: string;
    }

    const env = process.env as unknown as ProcessEnv;

    try {
        const connection = await Database.getInstance();

        await initializeTaskModel();
        await initializeGroupTaskModel();

        GroupTask.belongsTo(Task, { foreignKey: 'taskId' });
        Task.hasMany(GroupTask, { foreignKey: 'taskId' });

        await connection.sync({ 
            force: env.APP_MODE === 'DEV', 
            alter: env.DATABASE_MODE === 'ALTER' 
        });

        console.log('Sincronização concluída com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados: ', error);
    }
}