import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user!: User;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.http
        .get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .subscribe((data) => {
          this.user = data;
        });
    }
  }
  goBack() {
    this.router.navigate(['/users']);
  }
}
