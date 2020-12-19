import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketsService } from '../sockets.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  card: any;
  socket: any;
  roomId: any;
  playerNumber: string;
  usersArr: any[] = [];
  counter = 0
  rounds: any[] = [];
  nextRound: number = 0
  removeButtons: boolean = false
  cards:any[] = []
  isValidGame: boolean = false
  hasThreePlayers: boolean = false
  
  constructor(private socketService: SocketsService, private router: Router) {
   }

  ngOnInit(): void {
    //on initialize of component
    //set values referencing the current client
    this.socket = this.socketService.getSocket()
    this.roomId = this.socketService.getRoomId()
    this.playerNumber = this.socketService.getPlayer()

    let roomId = this.roomId

    //client sends a socket request to the server, wanting a new card
    this.socket.emit('getNewCard', {roomId}, ({error}) => {
    
    })

    //client sends a message to get users in the room
    this.socket.emit('users', {roomId}, ({error}) => {

    })

    //client waits for a 'card' message from server to set their card value
    this.socket.on('card', (card) => {
      this.cards = []
      this.nextRound = 0
      this.card = card
      this.removeButtons = false
    })

    //if the room is closed
    if(this.roomId === undefined){
      //close the clients socket connection
      this.socket.close()
      //re-route client to main page
      this.router.navigate(['/'])
    }

    
    this.socket.on('winners', ({winners}) => {
      this.rounds.push(winners)
    })

    this.socket.on('viewAllPlayersCards', ({cards}) => {
      this.cards = cards
      this.nextRound = 2;
      this.removeButtons = true
    })

    this.socket.on('closeRoom', ({}) => {
      //have the client close their socket connection
      this.socket.close()
      //re-route client to main page
      this.router.navigate(['/'])
    })

    //if server sends message 'users'
    this.socket.on('users', ({users}) => {
      //set the current users in the room
      this.usersArr = users
      let counter = 0
      this.usersArr.forEach(user=>{
        if(user !== null){
          counter++
        }
      })
      this.isValidGame = counter > 1
      this.hasThreePlayers = counter > 2
    })
  }


  //function to vote (high, mid, low)
  vote(value: string): void{
    //get the current room id
    const roomId = this.roomId

    //send message to server to initiate 'vote'
    this.socket.emit('vote', {value, roomId}, ({error, winners}) => {
      if(error){
        alert(error)
      }

      //if winners gets sent back from server
      if(winners){
        this.socket.emit('viewAllPlayersCards', {roomId}, ({error})=> {

        })
      }
    })
  } 

   readyForNextRound(): void{
    const roomId = this.roomId
    this.socket.emit('readyForNextRound', {roomId}, ({error})=> {

    })
    this.nextRound = 1;
  }

  //function to close room
  closeRoom(): void{
    //get this current room id
    const roomId = this.roomId

    //send message to server to close the room
    this.socket.emit('closeRoom', {roomId}, ({error}) => {
      if(error){
        alert(error)
      }
     
    })
  }

  //function to close the server
  closeServer(): void{
    //send message to server 'closeServer'
    this.socket.emit('closeServer', {}, ({}) => {
      
    })
  }

  //function to leave the room
  leaveRoom(): void{
    //disconnect the client from server
    this.socket.disconnect()
    //re-route to main page
    this.router.navigate(['/'])
  }

}
