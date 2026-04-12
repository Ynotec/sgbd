import fs from 'fs'
import path from 'path'
import { TodoData } from '../interfaces/ITodo'

class TodoService {
    private static instance : TodoService
    private filePath: string

    constructor() {
        this.filePath = path.join(__dirname, '../../data/todo.json')
    }

    static getInstance() {
        if (!TodoService.instance) {
            TodoService.instance = new TodoService()
        }
        return TodoService.instance
    }

    private read(): TodoData {
        if (!fs.existsSync(this.filePath)) {
            return {}
        }
        const raw = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(raw)
    }

    private write(data : TodoData): void {
        fs.mkdirSync(path.dirname(this.filePath), { recursive: true })
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8')
    }

    addTask(name : string): void {
        const todo = this.read()

        if (!todo[name]) {
            todo[name] = { 
                status: 'à faire', 
                date: new Date().toISOString() 
            }
        }
        this.write(todo)
    }

    updateStatus(name : string, status : string): void {
        const todo = this.read()
        if (todo[name]) {
            todo[name].status = status
            this.write(todo)
        }
    }

    getAll(): TodoData {
        const todo = this.read()
        return todo
    }

    clearTodo() {
        this.write({})
    }
}

export default TodoService
