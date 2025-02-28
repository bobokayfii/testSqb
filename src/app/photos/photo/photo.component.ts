import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  photo: Photo | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const photoId = this.route.snapshot.paramMap.get('id');
    if (photoId) {
      this.http
        .get<Photo>(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
        .subscribe((data) => {
          this.photo = data;
        });
    }
  }
  goBack() {
    this.router.navigate(['/photos']);
  }
}
