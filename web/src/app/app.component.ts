import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web';

  constructor(private router: Router) { }

  onClickDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onClickProject() {
    this.router.navigate(['/projects']);
  }

  onClickTask() {
    this.router.navigate(['/tasks']);
  }
  
  getAllProjects() {
    this.router.navigate(['/all-projects']);
  }

}
