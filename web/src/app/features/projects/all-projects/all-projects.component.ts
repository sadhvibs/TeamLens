import { Component } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { SHARED_IMPORTS } from '../../../shared/material';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-all-projects',
  imports: [SHARED_IMPORTS],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.scss'
})
export class AllProjectsComponent {
  displayedColumns: string[] = ['title', 'description', 'createdBy'];
  dataSource = new MatTableDataSource<any>([]);
  project: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((res: any) => {
      this.project = res;
      console.log(this.project)
    });
  }
}