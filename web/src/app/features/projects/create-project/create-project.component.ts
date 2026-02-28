import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { SHARED_IMPORTS } from '../../../shared/material';

@Component({
  selector: 'app-create-project',
  imports: [SHARED_IMPORTS],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
 projectForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.buildform();
  }

  buildform() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    })
  }

  onSubmit() {
    if (this.projectForm.invalid) return;

    this.projectService.createProject(this.projectForm.value).subscribe({
      next: ()=> {
        console.log(this.projectForm.value);
        alert("project created");
        this.projectForm.reset();
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}