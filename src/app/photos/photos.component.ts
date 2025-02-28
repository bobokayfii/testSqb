import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    RouterModule,
  ],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, AfterViewInit {
  photos: Photo[] = [];
  albums: number[] = [];
  filteredAlbums: number[] = [];
  searchQuery: string = '';
  selectedAlbum: number | null = null;
  pageSize = 100;
  pageIndex = 0;
  displayedPhotos: Photo[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
      .subscribe((data) => {
        this.photos = data;
        this.albums = [...new Set(data.map((photo) => photo.albumId))];
        this.filteredAlbums = [...this.albums];
        this.updateDisplayedPhotos();
      });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.updateDisplayedPhotos());
  }

  updateDisplayedPhotos() {
    const startIndex = this.pageIndex * this.pageSize;
    this.displayedPhotos = this.photos.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredAlbums = this.albums.filter((album) =>
      `Album ${album}`.toLowerCase().includes(filterValue)
    );
  }

  filterByAlbum() {
    if (this.selectedAlbum) {
      this.filteredAlbums = [this.selectedAlbum];
    } else {
      this.filteredAlbums = [...this.albums];
    }
  }

  goToAlbumPhotos(photoId: number) {
    this.router.navigate(['/photos', photoId]); 
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateDisplayedPhotos();
  }
}
