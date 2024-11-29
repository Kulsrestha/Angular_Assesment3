import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../../service/auth/incident.service';
import { UserService } from '../../../service/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-incident',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './assign-incident.component.html',
  styleUrl: './assign-incident.component.css',
})
export class AssignIncidentComponent implements OnInit {
  incident = {
    title: '',
    desc: '',
    assignedTo: '', // User ID for the assigned user
  };

  // Define a list of users
  users: { uid: string; name: string; role: string }[] = [
    { uid: '1', name: 'John Doe', role: 'Admin' },
    { uid: '2', name: 'Jane Smith', role: 'User' },
    { uid: '3', name: 'Alice Brown', role: 'User' },
    { uid: '4', name: 'Bob White', role: 'Admin' },
    { uid: '5', name: 'Charlie Green', role: 'User' }
  ];

  constructor(
    private userService: UserService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users) => {
        // Assuming 'users' array has objects with a 'username' property only
        this.users = users.map((user) => ({
          uid: user.id, // or whatever field you use as the user ID
          name: user.username, // Assuming 'username' field is the user's name
          role: 'User', // You can set default roles here or fetch dynamically if needed
        }));
  
        console.log(this.users); // Check the transformed structure
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  

  assignIncident() {
    if (this.incident.title && this.incident.desc && this.incident.assignedTo) {
      // Save the incident to Firestore
      const incidentData = {
        ...this.incident,
        createdAt: new Date(),
      };

      this.firestore
        .collection('incidents')
        .add(incidentData)
        .then(() => {
          console.log('Incident Assigned:', incidentData);
          this.router.navigate(['/incident-list']);
        })
        .catch((error) => {
          console.error('Error assigning incident:', error);
        });
    } else {
      alert('Please fill all fields before submitting.');
    }
  }
}
