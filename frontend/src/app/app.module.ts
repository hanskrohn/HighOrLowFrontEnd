import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JoinpageComponent } from './joinpage/joinpage.component';
import { RoomComponent } from './room/room.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketsService } from './sockets.service'

@NgModule({
  declarations: [
    AppComponent,
    JoinpageComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SocketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
