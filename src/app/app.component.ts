import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Random School';
  userName!: string | null
  constructor(private storageService: StorageService, private router: Router) {

  }

  ngOnInit() {
    this.userName = this.storageService.getUserName();
  }
  getName(): string | null {
    return this.storageService.getUserName();
  }

  logOut() {
    this.storageService.Logout();
    this.router.navigate(['/login'])
  }
}
