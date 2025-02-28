import {Component,input,output} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [FaIconComponent, RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBars, faClose, faHome, faNewspaper, faImages, faCamera,faUser);
  }
  isLeftSidebarCollapsed = input.required<boolean>();
  changeisLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routerlink: 'dashboard',
      icon: 'home',
      label: 'Dashboard',
    },
    {
      routerlink: 'posts',
      icon: 'newspaper',
      label: 'Posts',
    },
    {
      routerlink: 'albums',
      icon: 'images',
      label: 'Albums',
    },
    {
      routerlink: 'photos',
      icon: 'camera',
      label: 'Photos',
    },
    {
      routerlink: 'users',
      icon:'user',
      label:'Users'
    }
  ];
  toggleCollapse(): void {
    this.changeisLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }
  closeSideNav():void{
    this.changeisLeftSidebarCollapsed.emit(true);
  }
}
