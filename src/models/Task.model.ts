import { DataTypes, Model, Optional } from "sequelize";
import { Database } from "../database/Database";
import { ITask } from "../interfaces/ITask";

interface TaskCreationAttributes extends Optional<ITask, "id"> {}

export default class Task extends Model<ITask, TaskCreationAttributes > implements ITask {
    id!: number;
    title!: string;
}

export async function initializeTaskModel() {
    const connection = await Database.getInstance();

    Task.init({
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
    
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: connection,
        tableName: "task",
        modelName: "Task"
    })
}

initializeTaskModel().catch((error) => {
    throw new Error("Error initializing the Task model");
});