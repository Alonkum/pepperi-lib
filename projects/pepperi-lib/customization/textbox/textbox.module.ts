
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { MaterialModule } from './../../material.module';

import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PepperiTextboxIconModule} from '../textbox-icon';
import { PepperiFieldTitleModule } from '../field-title';

import { PepperiTextboxComponent} from './textbox.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // MaterialModule,
        MatCommonModule,
        MatFormFieldModule,
        PepperiFieldTitleModule,
        PepperiTextboxIconModule
    ],
    exports: [PepperiTextboxComponent, ],
    declarations: [PepperiTextboxComponent],
})
export class PepperiTextboxModule {}
