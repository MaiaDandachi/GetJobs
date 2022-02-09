import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { User } from '@app/_models/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationService) {
    // subscribes to the user observable
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
  }
}
