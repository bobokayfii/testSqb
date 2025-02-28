import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        this.users = data;
      });
  }

  goToUserDetails(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
