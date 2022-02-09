import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models/user';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {}
}
