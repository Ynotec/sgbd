import { Component, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { TodoService } from '../../services/todo.js';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-todo',
  styleUrl: './todo.css',
  templateUrl: './todo.html',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    DatePipe,
  ],
})
export class Todo implements OnInit{
  newTask = '';
  displayedColumns = ['id', 'name', 'date', 'done', 'actions'];

  constructor(public todoService: TodoService) {}

  async ngOnInit(): Promise<void>{
    await this.todoService.loadAll()
  }

  async addTask(): Promise<void> {
    if (!this.newTask.trim()) return
    await this.todoService.add(this.newTask)
    this.newTask = ''
  }

  async deleteTask(id: number): Promise<void> {
    await this.todoService.delete(id)
  }

  async toggleDone(id: number, done: number): Promise<void> {
    await this.todoService.setDone(id, done === 0 ? 1 : 0)
  }

  async clearTasks(): Promise<void> {
    await this.todoService.clear()
  }

  }
