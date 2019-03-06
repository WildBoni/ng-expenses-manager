import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatListModule,
  MatSidenavModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class MaterialModule {}
