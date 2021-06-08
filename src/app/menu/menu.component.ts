import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,private storageService:StorageService,private authService:AuthService) { }
  public isUserAuthenticated!: boolean;
  public userName!:string;

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })

    this.authService.userNameChanged.subscribe(r=>{
      this.userName=r;
    })
  }
  getName(): string | null {
    return this.storageService.getUserName();
  }

  logOut() {
    this.storageService.Logout();
    this.router.navigate(['/login'])
  }
}
