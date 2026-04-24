import { Component, signal, OnInit } from '@angular/core';
import { CounterComponent } from './components/counter/counter.js';
import { Counter } from './services/counter.js';


@Component({
  selector: 'app-root',
  imports: [CounterComponent],
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

  getCount(): void {
    this.counterService.get().then(data => this.count.set(data.counter))
  }
}
