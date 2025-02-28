import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

@Component({
  selector: 'app-albums',
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
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, AfterViewInit {
  albums: Album[] = [];
  users: number[] = [];
  filteredUsers: number[] = [];
  displayedUsers: number[] = [];
  searchValue: string = '';
  selectedUser: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get<Album[]>('https://jsonplaceholder.typicode.com/albums')
      .subscribe((data) => {
        this.albums = data;
        this.users = [...new Set(data.map((album) => album.userId))];
        this.filteredUsers = [...this.users];
        this.updateDisplayedUsers();
      });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.updateDisplayedUsers());
  }

  getAlbumTitles(userId: number): string {
    return (
      this.albums
        .filter((album) => album.userId === userId)
        .map((album) => album.title)
        .slice(0, 3)
        .join(', ') + '...'
    );
  }

  applySearchFilter(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filterUsers();
  }

  applySelectFilter() {
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user) => {
      const userString = `User ${user}`.toLowerCase();
      const searchMatch = userString.includes(this.searchValue);
      const selectMatch =
        this.selectedUser === null || user === this.selectedUser;
      return searchMatch && selectMatch;
    });
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    if (!this.paginator) return;
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    this.displayedUsers = this.filteredUsers.slice(
      startIndex,
      startIndex + this.paginator.pageSize
    );
  }

  goToUserAlbums(userId: number) {
    this.router.navigate(['/albums', userId]).then(() => {
      console.log(`Navigated to /album/${userId}`);
    });
  }
}
