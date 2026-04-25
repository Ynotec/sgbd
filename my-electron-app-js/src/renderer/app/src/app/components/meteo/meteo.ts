import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatFormField } from '@angular/material/input'
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-meteo',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormField,
    FormsModule,
  ],
  templateUrl: './meteo.html',
  styleUrl: './meteo.css',
})
export class MeteoComponent {
  @Input() feedback!: string

}
