import { Routes } from '@angular/router';
import { AlbumComponent } from './albums/album/album.component';
import { AlbumsComponent } from './albums/albums.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoComponent } from './photos/photo/photo.component';
import { PhotosComponent } from './photos/photos.component';
import { PostComponent } from './posts/post/post.component';
import { PostsComponent } from './posts/posts.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostComponent, pathMatch: 'full' },
  { path: 'albums', component: AlbumsComponent },
  { path: 'albums/:id', component: AlbumComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'photos/:id', component: PhotoComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserComponent },
  { path: '**', redirectTo: 'dashboard' },
];
