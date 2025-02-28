import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatButton],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {
  albums: Album[] = [];
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.http
      .get<Album[]>('https://jsonplaceholder.typicode.com/albums')
      .subscribe((data) => {
        this.albums = data.filter((album) => album.userId === this.userId);
      });
  }

  goBack() {
    this.router.navigate(['/albums']);
  }
}
