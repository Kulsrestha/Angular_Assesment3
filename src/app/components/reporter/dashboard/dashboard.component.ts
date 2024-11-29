import { Component } from '@angular/core';
import { IncidentService } from '../../../service/auth/incident.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  assignedIncidents: any[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentService.getAssignedIncidents().subscribe(
      (incidents) => {
        this.assignedIncidents = incidents;
      },
      (error) => {
        console.error('Error fetching assigned incidents:', error);
      }
    );
  }
}
