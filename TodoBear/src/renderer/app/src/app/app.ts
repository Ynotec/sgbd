import { Component, signal, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Todo } from './components/todo/todo';

@Component({
  selector: 'app-root',
  imports: [
    MatTabsModule, 
    Todo,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
