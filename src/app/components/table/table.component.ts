import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServicesComponent } from '../../services/services.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'user', 'title'];
  dataSource = new MatTableDataSource<Post>([]);
  users: number[] = [];
  selectedUser: number | '' = '';
  originalData: Post[] = []; // Исходный список данных

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private services: ServicesComponent) {}

  ngOnInit() {
    this.services.getPosts().subscribe((data) => {
      this.dataSource.data = data;
      this.originalData = data; // Сохраняем оригинальные данные
      this.users = [...new Set(data.map((post) => post.userId))]; // Уникальные userId
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filterPredicate = (data, filter) =>
      `User ${data.userId}`.toLowerCase().includes(filter);
    this.dataSource.filter = filterValue;
  }

  filterByUser() {
    if (this.selectedUser !== '') {
      this.dataSource.data = this.originalData.filter(
        (post) => post.userId === this.selectedUser
      );
    } else {
      this.dataSource.data = this.originalData;
    }
  }
}
