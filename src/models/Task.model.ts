export interface Task {
    id: number
    title: string
}

export interface GroupTask {
    id: number,
    idTask: number[]
}

let tasks: Task[] = []
let groupTasks: GroupTask[] = []
let nextId = 1
let nextIdGroup = 1000

export const createGroupTask = () => {
    const groupTask = { id: nextIdGroup++, idTask: [] };
    groupTasks.push(groupTask);
    return groupTask;
}

export const findGroupTask = (idGroup: number) => {
    const groupTask = groupTasks.find(group => group.id === idGroup);
    return groupTask || null;
}
  
export const getTasks = (idGroup: number): Task[] => {
    const groupTask = groupTasks.find(group => group.id === idGroup)
    if (groupTask && groupTask.idTask) {
        return groupTask.idTask
            .map(taskId => tasks.find(task => task.id === taskId))
            .filter(task => task !== undefined) as Task[];
    }
    return [];
}
export const getByIdTask = (idGroup: number, id: number) => {
    const groupTask = groupTasks.find(group => group.id === idGroup)
    if(groupTask) {
        const task = tasks.find(task => task.id === id)

        if(task) {
            return task
        }
    }

    return null
}

export const addTask = (idGroup: number, title: string): Task | null => {
    const task = { id: nextId++, title }

    const groupTask = groupTasks.find(group => group.id === idGroup);
    if(groupTask) {
        groupTask.idTask.push(task.id);
        tasks.push(task)

        return task
    }

    return null
}
  
export const updateTask = (idGroup: number, id: number, title: string) => {
    const groupTask = groupTasks.find(group => group.id === idGroup)
    if(groupTask) {
        const task = tasks.find(task => task.id === id)
        if (task) {
            task.title = title
          
            return task
        }
    }

    return null
}

 export const deleteTask = (idGroup: number, id: number) => {
    const groupTask = groupTasks.find(group => group.id === idGroup)
    if(groupTask) {
        const index = tasks.findIndex(task => task.id === id)
        const groupTaskIndex = groupTasks.findIndex(group => group.id === idGroup)

        if (index !== -1 && groupTaskIndex !== -1) {
            return tasks.splice(index, 1)[0] && groupTasks.slice(groupTaskIndex, 0)[0]
        }
    }

    return null
}  