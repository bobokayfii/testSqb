import { Component} from '@angular/core';
// import { ServicesComponent } from '../services/services.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../components/table/table.component';

@Component({
  selector: 'app-posts',
  imports: [CommonModule,TableComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: any[] = [];

  // constructor(private services: ServicesComponent) {}

  // ngOnInit(): void {
  //   this.services.getPosts().subscribe((data) => {
  //     this.posts = data;
  //     console.log("data",data);
  //   });
    
  // }
}
