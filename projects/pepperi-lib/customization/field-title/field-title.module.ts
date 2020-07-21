import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { MaterialModule } from './../../material.module';

import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PepperiFieldTitleComponent } from './field-title.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // MaterialModule,
        MatFormFieldModule,
        MatCommonModule,
    ],
    exports: [PepperiFieldTitleComponent],
    declarations: [PepperiFieldTitleComponent],
})
export class PepperiFieldTitleModule {}
