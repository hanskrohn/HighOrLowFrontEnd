import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomComponent } from './room/room.component';
import { JoinpageComponent } from './joinpage/joinpage.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: JoinpageComponent },
  { path: 'room', component: RoomComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
