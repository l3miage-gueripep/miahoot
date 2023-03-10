import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountConfigComponent implements OnInit, OnDestroy {

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;
  showProgressSpinner = false;

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login() {
    this.showLoginButton = false; // hide login buttons during loading time
    this.showProgressSpinner = true;
    console.log("affichage du spinner");
    try{
      //try to connect
      const userCredentials : UserCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      return userCredentials;
    }
    catch(error){
      //if user canceledd
      console.log(error); 
      // this.showProgressSpinner = false;
      // this.showLoginButton = true;
      console.log(this.showProgressSpinner)

    }
    // this.showProgressSpinner = false;
    // this.showLoginButton = true;
    return;
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }

}