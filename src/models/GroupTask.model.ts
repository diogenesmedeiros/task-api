import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Database } from '../database/Database';
import { IGroupTask } from '../interfaces/IGroupTask';

interface GroupTaskCreationAttributes extends Optional<IGroupTask, 'id'> {}

export default class GroupTask extends Model<IGroupTask, GroupTaskCreationAttributes> implements IGroupTask {
    public id!: number;
    public taskIds!: number[];
    public password!: string;
}

export async function initializeGroupTaskModel() {
    const connection = await Database.getInstance();

    GroupTask.init({
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        taskIds: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: connection,
        tableName: 'group_task',
        modelName: 'GroupTask'
    });
}