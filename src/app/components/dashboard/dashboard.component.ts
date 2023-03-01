import { Component, OnInit, ViewChild, ElementRef, asNativeElements } from '@angular/core';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  taskObj: Task = new Task();
  tasks: Task[] = [];

  addTaskValue: string = '';
  addTaskDescription: string = '';

  editTaskValue: string = '';
  editTaskDescription: string = '';

  @ViewChild('title') title!: ElementRef;

  constructor(private crudService: CrudService) {

  }

  ngOnInit(): void {
    this.addTaskValue = '';
    this.addTaskDescription = '';
    this.editTaskValue = '';
    this.editTaskDescription = '';

    this.taskObj = new Task();
    this.tasks = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTask().subscribe(res => {
      this.tasks = res;
    }, err => {
      // alert("Unable to get the task list");
    });
  }

  addTask() {
    if (this.addTaskValue == '' && this.addTaskDescription == '') {
      this.title.nativeElement.focus();
      return;
    }

    this.taskObj.title = this.addTaskValue;
    this.taskObj.description = this.addTaskDescription;


    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
      this.addTaskDescription = '';
    }, err => {
      alert(err);
    });
  }

  editTask() {
    this.taskObj.title = this.editTaskValue;
    this.taskObj.description = this.editTaskDescription;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Unable to edit task");
    });
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Unable to delete task");
    });
  }

  call(task: Task) {
    this.taskObj = task;
    this.editTaskValue = task.title;
    this.editTaskDescription = task.description;
  }

}
