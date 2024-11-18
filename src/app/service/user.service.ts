import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) { }


  getUsers(): Observable<any[]> {
    return this.afs.collection('users').valueChanges();
  }


  addUser(user: { uid: string; name: string; email: string; role: string }): Promise<void> {
    return this.afs.collection('users').doc(user.uid).set(user);
  }


  getUserById(uid: string): Observable<any> {
    return this.afs.collection('users').doc(uid).valueChanges();
  }


  updateUser(uid: string, data: any): Promise<void> {
    return this.afs.collection('users').doc(uid).update(data);
  }


  deleteUser(uid: string): Promise<void> {
    return this.afs.collection('users').doc(uid).delete();
  }
}
