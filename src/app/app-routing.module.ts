import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TracksComponent } from './tracks/tracks.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserAuthGuard } from './shared/guards/user-auth.guard';
import { GuestGuard } from './shared/guards/guest.guard';

const routes: Routes = [
  { path: 'tracks', component: TracksComponent, canActivate: [UserAuthGuard] },
  {
    path: 'tracks/:id',
    component: TrackDetailComponent,
    canActivate: [UserAuthGuard]
  },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [GuestGuard] },
  { path: '**', redirectTo: '/tracks', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
