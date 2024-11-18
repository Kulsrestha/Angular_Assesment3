import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {


  constructor(private afs: AngularFirestore,private auth: AngularFireAuth) { }

  async addIncident(title: string, description: string): Promise<void> {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; 
  
    if (isAdmin) {
      // Admin-specific logic
      const adminIncident = {
        title,
        description,
        userId: 'admin', 
        username: 'Admin', 
        timestamp: new Date().toISOString(),
      };
      await this.afs.collection('incidents').add(adminIncident); 
      console.log('Incident added by admin');
      return;
    }
  
    // User-specific logic
    const user = await this.auth.currentUser;
    if (!user) {
      throw new Error('User not logged in');
    }
  
    
    const userDoc = await this.afs.collection('users').doc(user.uid).get().toPromise();
    const userData = userDoc?.data() as { username?: string }; 
    const username = userData?.username || 'Anonymous';
  
    const blog = {
      title,
      description,
      userId: user.uid,
      username,
      timestamp: new Date().toISOString(),
    };
  
    await this.afs.collection('incidents').add(blog); 
    console.log('Incident added by user');
  }


}
