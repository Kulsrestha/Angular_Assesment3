import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('isAdmin', 'true');
      this.router.navigate(['/incident-list']);
    } else {
      this.fireauth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          localStorage.setItem('isAdmin', 'false');
          this.router.navigate(['/incident-list']);
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
          }).catch((error) => {
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
      this.router.navigate(['/verify']);
    }).catch((err: any) => {
      alert('Something went wrong. Not able to send verification email.');
    });
  }

  getCurrentUser(): Observable<any> {
    return this.fireauth.authState;
  }


  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin'); // Clear the admin flag as well
      this.router.navigate(['/login']);
    }, (err) => {
      alert(err.message);
    });
  }
}
