import DatabaseService from './DatabaseService.js'
import { DB } from '../types/db.js'
import ITodo from '../interfaces/ITodo.js'

class TodoRepository {
    private static instance : TodoRepository
    private db : DB

    constructor() {
        this.db = DatabaseService.getInstance().getDb()
    }

    static getInstance() {
        if(!TodoRepository.instance) {
            TodoRepository.instance = new TodoRepository
        }
        return TodoRepository.instance

    }

    getTodo() {
        return this.db.prepare('SELECT * FROM Todo').all() as ITodo[];
    }

    getTodoById(): ITodo[] {
        return this.db.prepare('SELECT * from Todo WHERE id = ?').all() as ITodo[]
    }

    addTask(name: string) {
        this.db.prepare('INSERT INTO Todo (name, date, done) VALUES (?, ?, 0)').run(name, new Date().toISOString())
    }

    editTask(name: string, id : number) {
        return this.db.prepare('UPDATE Todo SET name = ? WHERE id = ?').run(name, id)
    }

    removeTask(id: number): void {
        this.db.prepare('DELETE FROM Todo WHERE id = ?').run(id)
    }

    setDoneTask(done: number, id: number): void {
        this.db.prepare('UPDATE Todo SET done = ? WHERE id = ?').run(done, id)
    }

    clearTodo(): void {
        this.db.prepare('DELETE FROM Todo').run()
        this.db.prepare("DELETE FROM sqlite_sequence WHERE name ='Todo'").run()
    }
}

export default TodoRepository