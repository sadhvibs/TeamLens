import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { SHARED_IMPORTS } from '../../../shared/material';
import { TaskService } from '../../../core/services/task.service';

import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-task',
  providers: [provideNativeDateAdapter()],
  imports: [SHARED_IMPORTS],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  taskForm!: FormGroup;
  projects: any[] = [];
  members: any[] = [];

  constructor(private fb: FormBuilder, private router: Router,
    private projectService: ProjectService, private taskService: TaskService) { }

  ngOnInit() {
    this.buildform();
    this.projectService.getProjects().subscribe((res: any) => {
      this.projects = res;
    })

    this.projectService.getProjectMembers().subscribe((res: any) => {
      this.members = res;
      console.log(this.members)
    })
  }

  buildform() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      project: ['', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['']
    })
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        alert("task created");
        this.taskForm.reset();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
