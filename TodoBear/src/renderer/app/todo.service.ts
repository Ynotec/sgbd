import { Injectable } from '@angular/core'
import { TodoData } from '../../interfaces/ITodo'

@Injectable({ providedIn: 'root' })
export class TodoService {
    getAll(): Promise<TodoData> {
        return window.todo.getAll()
    }

    add(name: string): Promise<void> {
        return window.todo.add(name)
    }

    clear(): Promise<void> {
        return window.todo.clear()
    }
}