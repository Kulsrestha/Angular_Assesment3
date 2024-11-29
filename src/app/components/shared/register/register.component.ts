import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  username: string = ''; // Added username field

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  register() {
    if (this.email === '') {
      alert('Please enter email');
      return;
    }
    if (this.password === '') {
      alert('Please enter password');
      return;
    }
    if (this.username === '') {
      alert('Please enter a username');
      return;
    }

    this.auth.register(this.email, this.password, this.username); 
    this.email = '';
    this.password = '';
    this.username = '';
  }
}
