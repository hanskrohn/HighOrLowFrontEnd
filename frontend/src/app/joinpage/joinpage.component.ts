import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketsService } from '../sockets.service';

@Component({
  selector: 'app-joinpage',
  templateUrl: './joinpage.component.html',
  styleUrls: ['./joinpage.component.css']
})
export class JoinpageComponent implements OnInit {
  id: string = ''
  socket: any;
  constructor(private socketService: SocketsService, private router: Router) { }

  ngOnInit(): void {
  }

  //function to create room
  async create(): Promise<void>{
    try{
      const promise = await fetch('/api/createRoom')
      const res = await promise.json()
      const id = res.id

      //creates a socketService instance
      this.socketService.connect()
      //set a room id 
      this.socketService.setRoomId(id)

      //retrieve the socket 
      this.socket = this.socketService.getSocket()
      //send message to server to create room
      this.socket.emit('create', {id}, ({error, player}) => {
          if(error){
              alert(error)
          }else{
            //set the socket value to player
            this.socketService.setPlayer(player)
            //route client to /room
            this.router.navigate(['/room'])
          }
      })
    }catch(e){
    }
  }

  //joining a room
  join(): void{
    const id = this.id

    this.socketService.connect()
    this.socketService.setRoomId(id)

    this.socket = this.socketService.getSocket()
      this.socket.emit('join', {id}, ({error, player}) => {
          if(error){
              alert(error)
          }else{
            this.socketService.setPlayer(player)
            this.router.navigate(['/room'])
          }
      })
  }

  //set id
  setId(val: string): void{
    this.id = val
  }
}
