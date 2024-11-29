import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  getAssignedIncidents(): Observable<any[]> {
    return this.auth.authState.pipe(  
      switchMap((user) => {
        if (user) {

          return this.afs
            .collection('incidents', (ref) =>
              ref.where('assignedTo', '==', user.uid)
            )
            .valueChanges();
        } else {
          return [];  
        }
      })
    );
  }

  async addIncident(
    title: string,
    description: string,
    optionSelected: string
  ): Promise<void> {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (isAdmin) {
      // Admin-specific logic
      const adminIncident = {
        title,
        description,
        optionSelected,
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

    const userIncident = {
      title,
      description,
      optionSelected,
      userId: user.uid,
      username,
      timestamp: new Date().toISOString(),
    };

    await this.afs.collection('incidents').add(userIncident);
    console.log('Incident added by user');
  }

  // This is the correct method to resolve an incident
  resolveIncident(incidentId: string): Promise<void> {
    return this.afs.collection('incidents').doc(incidentId).update({
      status: 'closed', 
    });
  }

  deleteIncident(incidentId: string): Promise<void> {
    return this.afs.collection('incidents').doc(incidentId).delete();
  }

  getAllIncidents(): Observable<any[]> {
    return this.afs
      .collection('incidents', (ref) => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges();
  }
}
