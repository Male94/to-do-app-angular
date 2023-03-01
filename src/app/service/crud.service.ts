import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "https://60a21a08745cd70017576014.mockapi.io/api/v1/todo";
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }


  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }


  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, {
      title: task.title,
      description: task.description
    });
  }


  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${task.id}`);
  }


}
