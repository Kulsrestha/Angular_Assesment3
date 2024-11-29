import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../../service/auth/incident.service';
import { AuthService } from '../../../service/auth/auth.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbarComponent],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.css'
})
export class IncidentListComponent {
  incidentList: any[] = [];
  currentUserId: string | null = null;
  isAdmin: boolean = false; // To track if the user is an admin

  constructor(private incidentService: IncidentService, private authService: AuthService) {}

  ngOnInit(): void {

    this.isAdmin = localStorage.getItem('isAdmin') === 'true'; 

 
    this.authService.getCurrentUser().subscribe((user: { uid: string | null; }) => {
      if (user) {
        this.currentUserId = user.uid; 
      }
    });


    this.incidentService.getAllIncidents().subscribe((res:any) => {
      this.incidentList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

 
  deleteIncident(incidentId: string): void {
    if (this.isAdmin) {
      this.incidentService.deleteIncident(incidentId).then(() => {
        alert('Blog deleted successfully');
        this.ngOnInit();
      }).catch((err:any) => {
        alert('Error deleting blog: ' + err.message);
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
