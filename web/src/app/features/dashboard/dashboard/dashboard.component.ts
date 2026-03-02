import { Component } from '@angular/core';
import { SocketService } from '../../../core/services/socket.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tasks: any[] = [];
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;
  tasksPerMember: any = {};

  constructor(private socketService: SocketService, private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res;
      console.log(this.tasks)
      this.totalTasks = this.tasks.length;
      this.completedTasks = this.tasks.filter(task => task.status === 'Done').length;
      this.inProgressTasks = this.tasks.filter(task=> task.status === 'In-Progress').length;
      this.pendingTasks = this.tasks.filter(task => task.status==='To-Do').length;

    })
  }
}
