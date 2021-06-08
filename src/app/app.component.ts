import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Random School';
  userName!: string | null
  constructor(private storageService: StorageService, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.userName = this.storageService.getUserName();

    if (sessionStorage.getItem("user")) {
      this.authService.sentUserNameChangeNotification(sessionStorage.getItem("user")||'-');
    }
      

    if(this.storageService.isLoggedIn()){
      this.authService.sendAuthStateChangeNotification(true)
      this.authService.sentUserNameChangeNotification(this.userName||'')
    }
    
  }
  getName(): string | null {
    return this.storageService.getUserName();
  }

  logOut() {
    this.storageService.Logout();
    this.router.navigate(['/login'])
  }
  @HostListener('window:beforeunload', ['$event'])
      unloadNotification($event: any) {
        sessionStorage.setItem("user", this.storageService.getUserName());
      }
}
