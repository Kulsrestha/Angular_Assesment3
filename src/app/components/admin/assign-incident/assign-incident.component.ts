import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-incident',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assign-incident.component.html',
  styleUrl: './assign-incident.component.css'
})
export class AssignIncidentComponent {
  incident = {
    title: 'test',
    desc: 'this is for testing',
    assignedTo: 'developer',
  };

}
