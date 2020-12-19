import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  socket: any = io('', {
    autoConnect: false
  })
  roomId: string;
  player: string;
  constructor() { }

  connect(): void {
    this.socket.open()
  }

  setRoomId(val: string){
    this.roomId = val.trim()
  }

  getSocket(): number{
    return this.socket
  }

  getRoomId(): string{
    return this.roomId
  }

  setPlayer(val: string): void{
    this.player = val
  }

  getPlayer(): string{
    return this.player
  }
}
