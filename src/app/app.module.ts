import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TracksComponent } from './tracks/tracks.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { UserService } from './shared/services/user.service';
import { SidenavListComponent } from './shared/components/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TracksService } from './tracks/tracks.service';
import { TrackDetailService } from './track-detail/track-detail.service';

@NgModule({
  declarations: [
    AppComponent,
    TracksComponent,
    TrackDetailComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [UserService, TracksService, TrackDetailService],
  bootstrap: [AppComponent]
})
export class AppModule {}
