import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatListModule,
  MatSidenavModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class MaterialModule {}
