import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken  } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './navigation/navigation.module';
import { ExpensesModule } from './expenses/expenses.module';

import { HomeComponent } from './home/home.component';

import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { appReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModule,
    NavigationModule,
    ExpensesModule,
    AppRoutingModule,
    StoreModule.forRoot({ui: appReducer}),
    StoreDevtoolsModule.instrument({maxAge: 10})
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    UIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
