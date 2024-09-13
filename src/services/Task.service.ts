import { Op } from "sequelize";
import { IGroupTask } from "../interfaces/IGroupTask";
import GroupTask from "../models/GroupTask.model";
import Task from "../models/Task.model";
import { getRandomInt } from "../utils/getRandomInt";
import { ITask } from "../interfaces/ITask";

export const createGroupTaskService = async (data: IGroupTask): Promise<IGroupTask | null> => {
    try {
        const groupTaskCreate: IGroupTask = {
            id: getRandomInt(),
            password: data.password!,
            taskIds: []
        }

        await GroupTask.create(groupTaskCreate);

        if (!groupTaskCreate) {
            throw new Error("Group task not create");
        }

        return groupTaskCreate
    } catch (error) {
        console.error("Error creating group task:", error);
        throw error;
    }
}

export const findGroupTaskService = async (data: IGroupTask): Promise<IGroupTask | null> => {
    try {
        const groupTask = await GroupTask.findOne({
            where: {
                [Op.and]: {
                    id: data.id!,
                    password: data.password!
                }
            }
        })

        if (!groupTask) {
            throw new Error("Group task not found");
        }

        return groupTask;
    } catch (error) {
        console.log("Error finding group task: ", error);
        throw error;
    }
}

export const getTasksService = async (GroupTaskData: IGroupTask): Promise<ITask[] | null> => {
    try {
        if (!GroupTaskData || !GroupTaskData.id) {
            throw new Error("No id provided");
        }

        const getGroupTasks = await GroupTask.findAll({ where: { id: GroupTaskData.id } });

        if (!getGroupTasks) {
            throw new Error("Group task not found");
        }

        const taskIds = getGroupTasks.flatMap(groupTask => groupTask.taskIds);
        const getTasks = taskIds.length > 0 ? await Task.findAll({ where: { id: taskIds } }) : [];

        return getTasks;
    } catch (error) {
        console.log("Error finding group task: ", error);
        throw error;
    }
}

export const getByIdTaskService = async ({ id }: { id: number }): Promise<ITask | null> => {
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            throw new Error("Task not found");
        }
        return task;
    } catch (error) {
        console.error("Error finding task by ID:", error);
        throw error;
    }
};

export const addTaskService = async ({ id }: { id: number }, taskData: { title: string }): Promise<ITask | null> => {
    try {
        const newTask = await Task.create({
            id: getRandomInt(),
            title: taskData.title
        });

        if (!newTask) {
            throw new Error("Error creating task");
        }

        const groupTask = await GroupTask.findByPk(id);
        if (!groupTask) {
            throw new Error("Group task not found");
        }

        const updatedTaskIds = [...groupTask.taskIds, newTask.id];
        await groupTask.update({ taskIds: updatedTaskIds });

        return newTask;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
}

export const updateTaskService = async ({ id, title }: { id: number, title?: string }): Promise<ITask | null> => {
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            throw new Error("Task not found");
        }

        if (title) {
            task.title = title;
            await task.save();
        }

        return task;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTaskService = async ({ id }: { id: number }): Promise<ITask | null> => {
    try {
        const taskToDelete = await Task.findByPk(id);
        if (!taskToDelete) {
            throw new Error("Task not found");
        }

        const groupsWithTask = await GroupTask.findAll({
            where: {
                taskIds: { [Op.contains]: [id] }
            }
        });

        for (const group of groupsWithTask) {
            const updatedTaskIds = group.taskIds.filter(taskId => taskId !== id);
            await group.update({ taskIds: updatedTaskIds });
        }

        await taskToDelete.destroy();
        return taskToDelete;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}