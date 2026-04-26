import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'
import { TodoService } from '../../services/todo';

const FR_DATE_FORMATS = {
  parse: {
    dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
  },
  display: {
    dateInput: { day: '2-digit', month: '2-digit', year: 'numeric' },
    monthYearLabel: { month: 'short', year: 'numeric' },
    dateA11yLabel: { day: 'numeric', month: 'long', year: 'numeric' },
    monthYearA11yLabel: { month: 'long', year: 'numeric' },
  },
}

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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: FR_DATE_FORMATS },
  ],
})
export class Todo implements OnInit {
  newTask = '';
  newDate: Date | null = null;
  displayedColumns = ['id', 'titre', 'date_echeance', 'statut', 'actions'];

  constructor(public todoService: TodoService) {}

  async ngOnInit(): Promise<void> {
    await this.todoService.loadAll()
  }

  formatDate(date: Date | string | null): string {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  async addTask(): Promise<void> {
    if (!this.newTask.trim()) return
    const d = this.newDate
    const dateIso = d
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T12:00:00.000Z`
      : null
    await this.todoService.add(this.newTask, 1, dateIso)
    this.newTask = ''
    this.newDate = null
  }

  async deleteTask(id: number): Promise<void> {
    await this.todoService.delete(id)
  }

  async toggleDone(id: number, statut: string): Promise<void> {
    await this.todoService.doneTask(id, statut !== 'terminé')
  }

  async clearTasks(): Promise<void> {
    await this.todoService.clear()
  }
}
