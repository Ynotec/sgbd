import ITodo from "../interfaces/ITodo.js"
import TodoRepository from "../repositories/TodoRepository.js"

class TodoService {
    private static instance : TodoService
    private todoRepository : TodoRepository

    constructor() {
        this.todoRepository = TodoRepository.getInstance()
    }

    static getInstance() {
        if (!TodoService.instance) {
            TodoService.instance = new TodoService()
        }
        return TodoService.instance
    }

    private isValidName(name: string) {
        return name.trim() !== ''
    }

    getAll(): ITodo[] {
        return this.todoRepository.getTodo()
    }

    add(name: string): void {
        if(!this.isValidName(name)) return
        this.todoRepository.addTask(name.trim())
    }

    edit(name: string, id: number): void {
        if(!id || !this.isValidName(name)) return
        this.todoRepository.editTask(name.trim(), id)
    }

    delete(id: number): void {
        this.todoRepository.removeTask(id)
    }

    doneTask(done: number, id: number): void {
        this.todoRepository.setDoneTask(done, id)
    }

    clear(): void {
        this.todoRepository.clearTodo()
    }


}

export default TodoService
