import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  onTaskUpdated(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('taskUpdated', (data: any) => observer.next(data));
    });
  }

  onTaskAssigned(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('taskAssigned', (data: any) => observer.next(data));
    });
  }
}
