import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  logout() {
    this.userService.logout();
  }

  isUser() {
    return !!this.userService.getUser();
  }
}
