import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TodoService } from './todo.service'
import { TodoEntry } from '../../interfaces/ITodo'

import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule }     from '@angular/material/icon'
import { MatCardModule }     from '@angular/material/card'

@Component({
    selector: 'app-root',
    standalone: true,
    styles: 'app.component',
    imports: [
        CommonModule, 
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
    ],
    template: `
<div class="container">
    <h1>TodoBear</h1>

    <!-- Formulaire -->
    <mat-card class="form-card">
        <mat-card-content>
            <div class="input-row">
                <mat-form-field appearance="outline" class="input-field">
                    <mat-label>Nouvelle tâche</mat-label>
                    <input matInput [(ngModel)]="newTask" placeholder="Ex: Faire les courses" (keyup.enter)="addTask()" />
                    <mat-icon matSuffix>edit</mat-icon>
                </mat-form-field>

                <button mat-raised-button color="primary" (click)="addTask()">
                    <mat-icon>add</mat-icon>
                    Ajouter
                </button>

                <button mat-stroked-button color="warn" (click)="clearAll()">
                    <mat-icon>delete_sweep</mat-icon>
                    Vider
                </button>
            </div>
        </mat-card-content>
    </mat-card>

    <!-- Table Material -->
    <mat-card class="table-card">
        <mat-card-content>
            <table mat-table [dataSource]="todoEntries" class="todo-table">

                <!-- Colonne Checkbox -->
                <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let entry">
                        <mat-checkbox
                            [checked]="entry.status === 'fait'"
                            (change)="updateStatus(entry.name, $event.checked)">
                        </mat-checkbox>
                    </td>
                </ng-container>

                <!-- Colonne Tâche -->
                <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Tâche</th>
                    <td mat-cell *matCellDef="let entry" [class.done]="entry.status === 'fait'">
                        {{ entry.name }}
                    </td>
                </ng-container>

                <!-- Colonne Date -->
                <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef>Date</th>
                    <td mat-cell *matCellDef="let entry">
                        {{ entry.date | date:'shortDate' }}
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                    [class.done-row]="row.status === 'fait'">
                </tr>

                <!-- Ligne vide -->
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell empty-row" colspan="3">
                        Aucune tâche pour le moment
                    </td>
                </tr>
            </table>
        </mat-card-content>
    </mat-card>
</div>
    `
})
export class AppComponent implements OnInit {
    newTask = ''
    displayedColumns: string[] = ['status', 'name', 'date']
    public todoEntries: TodoEntry[] = []

    constructor(
        private todoService: TodoService,
        private cdr: ChangeDetectorRef
    ) {}

    
    async ngOnInit() {
        await this.loadTodos()
    }

    async addTask() {
        if (!this.newTask.trim()) return
        await this.todoService.add(this.newTask.trim())
        this.newTask = ''
        await this.loadTodos()
    }

    async clearAll() {
        await this.todoService.clear()
        await this.loadTodos()
    }

    private async loadTodos() {
        const todos = await this.todoService.getAll()
        this.todoEntries = Object.entries(todos).map(([name, item]): TodoEntry => ({
            name,
            ...item
        }))
        this.cdr.detectChanges()
    }
    
    async updateStatus(name: string, checked: boolean): Promise<void> {
    const status = checked ? 'fait' : 'à faire'
    await window.todo.updateStatus(name, status)
    await this.loadTodos()
}
}
