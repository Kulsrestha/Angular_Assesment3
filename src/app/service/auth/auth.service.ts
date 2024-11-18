import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private fireauth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private router: Router
  ) { }
  login(email: string, password: string) {

    const adminEmail = 'admin@example.com'; 
    const adminPassword = 'admin123'; 

    // Check if login credentials match admin credentials
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('isAdmin', 'true'); 
      this.router.navigate(['/admin-dashboard']); 
    } else {

      this.fireauth
        .signInWithEmailAndPassword(email, password)
        .then((res: any) => {
          localStorage.setItem('isAdmin', 'false');
          this.router.navigate(['/rep-dashboard']);
        })
        .catch((err) => {
          alert(err.message); 
          this.router.navigate(['/login']); 
        });
    }
  }
  
  register(email: string, password: string, username: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((res) => {
      if (res.user) {
        const userId = res.user.uid;
        this.firestore.collection('users').doc(userId).set({ username }).then(() => {
          res.user?.sendEmailVerification().then(() => {
            alert('Registration successful! Please verify your email address.');
            this.router.navigate(['/verify-email']);
          }).catch((error: any) => {
            console.error('Error sending email verification:', error);
            alert('Error sending verification email.');
          });
        });
      }
    }).catch((err) => {
      alert(err.message);
      console.error(err);
    });
  }
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(() => {
      this.router.navigate(['/verify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send verification email.');
    });
  }
}
