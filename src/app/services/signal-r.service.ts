import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public hubConnection!: signalR.HubConnection;
  constructor() { }

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5127/notify')
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this.hubConnection.start().then(() => {
      console.log('Signalr connected');
    }).catch(err =>{
      console.error('Error while connecting signalr', err);
    });
  }

  receiveAlert(callback:(user: string, message: string) => void){
    this.hubConnection.on('ReceiveNotification', callback)
  }
}
