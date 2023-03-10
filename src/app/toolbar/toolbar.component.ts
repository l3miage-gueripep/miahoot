import { Component, Input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() user : Observable<User | null> = EMPTY;
  constructor(private router: Router) { 
    
  }
  redirectToLogin(){
    const url = 'accountConfig';
    this.router.navigate([url]);
  }
  redirectToHome(){
    const url = '';
    this.router.navigate([url]);
  }
}
