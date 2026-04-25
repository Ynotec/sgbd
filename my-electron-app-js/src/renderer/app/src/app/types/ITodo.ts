export interface ITodo {
    id: number
    name: string
    date: string
    done: number
}

export interface ITodoApi {
    getAll: () => Promise<ITodo[]>
    add: (name: string) => Promise<void>
    delete: (id: number) => Promise<void>
    edit: (id: number, name: string) => Promise<void>
    setDone: (id: number, done: number) => Promise<void>
    clear: () => Promise<void>
}