import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Firebase Auth service
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firebase Firestore service
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {

          return this.checkUserRole(user.uid);
        } else {

          this.router.navigate(['/login']);
          return [false]; 
        }
      }),
      catchError(() => {

        this.router.navigate(['/login']);
        return [false]; 
      })
    );
  }


  private checkUserRole(uid: string): Observable<boolean> {
    return this.firestore
      .doc<any>(`users/${uid}`)
      .valueChanges()
      .pipe(
        map((userData) => {
          if (userData && userData.role === 'admin') {

            return true;
          } else {

            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {

          this.router.navigate(['/login']);
          return [false];
        })
      );
  }
}
