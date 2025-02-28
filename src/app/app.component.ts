import { Component, signal } from '@angular/core';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
// import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [MainComponent, LeftSidebarComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sqb-test';
  
  isLeftSidebarCollapsed = signal<boolean>(false);
  changeisLeftSidebarCollapsed(isLeftSidebarCollapsed:boolean):void{
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
