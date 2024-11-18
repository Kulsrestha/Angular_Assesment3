import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../../service/auth/incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  incident={
    title:'',
    description:'',
    optionSeleted:'',
  }
  constructor(private router:Router,private incidentService:IncidentService){}

  onSubmit() {
    if (this.incident.title && this.incident.description && this.incident.optionSeleted) {
      this.incidentService.addIncident(this.incident.title, this.incident.description,this.incident.optionSeleted)
        .then(() => {
          alert('incident reported successs');
          this.router.navigate(['/incident-list']);
        })
        .catch((error: any) => {
          console.error('Error adding blog:', error);
          alert('Failed to add blog. Please try again.');
        });
    }
  }
}
