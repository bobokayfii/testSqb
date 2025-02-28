import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  posts: Post[] = [];
  photos: Photo[] = [];
  totalPosts: number = 0;
  totalAlbums: number = 0;
  totalPhotos: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
    this.fetchAlbums();
    this.fetchPhotos();
  }

  fetchPosts() {
    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        this.posts = data.slice(0, 5);
        this.totalPosts = data.length;
      });
  }

  fetchAlbums() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/albums')
      .subscribe((data) => {
        this.totalAlbums = data.length;
      });
  }

  fetchPhotos() {
    this.http
      .get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
      .subscribe((data) => {
        this.photos = data.slice(0, 10);
        this.totalPhotos = data.length;
      });
  }
}
