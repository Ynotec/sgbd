import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-counter',
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class CounterComponent {
  @Input() count! : number 

  @Output() add = new EventEmitter<void>()
  @Output() remove = new EventEmitter<void>()
  @Output() clear = new EventEmitter<void>()


  addCount():void {
    this.add.emit()
  }

  removeCount():void{
    this.remove.emit()
  }

  clearCount():void{
    this.clear.emit()
  }
}
