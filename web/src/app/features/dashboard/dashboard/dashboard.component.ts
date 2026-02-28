import { Component } from '@angular/core';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.getAllUpdates();
  }

  getAllUpdates() {
    this.socketService.onTaskUpdated().subscribe(data => {
      console.log('Task updated:', data);
    });

    this.socketService.onTaskAssigned().subscribe(data => {
      console.log('Task assigned:', data);
    });
  }
}
