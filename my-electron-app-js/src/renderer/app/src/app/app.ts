import { Component, signal, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CounterComponent } from './components/counter/counter.js';
import { Counter } from './services/counter.js';
import { MeteoComponent } from './components/meteo/meteo.js'; 
import { Todo } from './components/todo/todo.js';

@Component({
  selector: 'app-root',
  imports: [
    MatTabsModule, 
    CounterComponent,
    MeteoComponent,
    Todo,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  count = signal(0);

  constructor(private counterService: Counter) {}

  ngOnInit(): void {
    this.counterService.get().then(data => this.count.set(data.counter));
  }

  onAdd(): void {
    this.counterService.add().then(data => this.count.set(data.counter));
  }

  onRemove(): void {
    this.counterService.remove().then(data => this.count.set(data.counter));
  }

  onClear(): void {
    this.counterService.clear().then(data => this.count.set(data.counter));
  }
}
