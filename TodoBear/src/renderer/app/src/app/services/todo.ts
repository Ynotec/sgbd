import { Injectable, signal } from '@angular/core';
import { ElectronService } from './electron';
import { ITodo } from '../types/ITodo';

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

  async getById(id: number): Promise<ITodo | null> {
    return this.api.getById(id)
  }

  async add(titre: string, listeId: number = 1, dateEcheance: string | null = null): Promise<void> {
    await this.api.add(titre, listeId, dateEcheance)
    await this.loadAll()
  }

  async edit(id: number, data: { titre?: string; description?: string; statut?: string }): Promise<void> {
    await this.api.edit(id, data)
    await this.loadAll()
  }

  async delete(id: number): Promise<void> {
    await this.api.delete(id)
    await this.loadAll()
  }

  async doneTask(id: number, done: boolean): Promise<void> {
    await this.api.doneTask(id, done)
    await this.loadAll()
  }

  async addEtiquette(tacheId: number, etiquetteId: number): Promise<void> {
    await this.api.addEtiquette(tacheId, etiquetteId)
    await this.loadAll()
  }

  async removeEtiquette(tacheId: number, etiquetteId: number): Promise<void> {
    await this.api.removeEtiquette(tacheId, etiquetteId)
    await this.loadAll()
  }

  async clear(): Promise<void> {
    await this.api.clear()
    await this.loadAll()
  }
}
