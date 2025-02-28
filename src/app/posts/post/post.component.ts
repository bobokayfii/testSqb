import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesComponent,Post } from '../../services/services.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post | null = null;

  constructor(
    private route: ActivatedRoute,
    private services: ServicesComponent
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id'); 
    if (postId) {
      this.services.getPostById(+postId).subscribe((data) => {
        this.post = data;
      });
    }
  }
}
