import { Injectable, signal } from '@angular/core';
import { ElectronService } from './electron.js';
import { ITodo } from '../types/ITodo.js';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private electron: ElectronService) {}
  todos = signal<ITodo[]>([])

  private get api() {
    return this.electron.getApi().todo
  }

   async loadAll(): Promise<void> {
    const todos = await this.api.getAll()
    this.todos.set(todos)
  }

  async add(name: string): Promise<void> {
    await this.api.add(name)
    await this.loadAll()
  }

  async delete(id: number): Promise<void> {
    await this.api.delete(id)
    await this.loadAll()
  }

  async edit(id: number, name: string): Promise<void> {
    await this.api.edit(id, name)
    await this.loadAll()
  }

  async setDone(id: number, done: number): Promise<void> {
    await this.api.setDone(id, done)
    await this.loadAll()
  }

  async clear(): Promise<void> {
    await this.api.clear()
    await this.loadAll()
  }
}
