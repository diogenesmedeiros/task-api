export interface Task {
    id: number
    title: string
}

let tasks: Task[] = []
let nextId = 1
  
export const getTasks = () => tasks

export const getByIdTask = (id: number) => {
    const task = tasks.find(task => task.id === id)

    if(task) {
        return task
    } 

    return null
}

export const addTask = (title: string) => {
    const task = { id: nextId++, title }
    tasks.push(task)
    return task
}
  
export const updateTask = (id: number, title: string) => {
    const task = tasks.find(task => task.id === id)
    if (task) {
        task.title = title
      
        return task
    }

    return null
}

 export const deleteTask = (id: number) => {
    const index = tasks.findIndex(task => task.id === id)

    if (index !== -1) {
        return tasks.splice(index, 1)[0]
    }

    return null
}  