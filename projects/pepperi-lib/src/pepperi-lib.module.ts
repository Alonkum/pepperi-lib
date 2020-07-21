import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        // AttachDirective,
        // TargetDirective,
        // RtlClassDirective,
        // pipesArray,
        // customizatoionComponenetsArray,
        // GroupButtonsComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // TranslateModule,
        // MaterialModule,
        // MatDatetimepickerModule,
        // MatNativeDatetimeModule,
    ],
    exports: [
        // customizatoionComponenetsArray,
    ],
})
export class PepperiModule {
    // static forRoot(): ModuleWithProviders<PepperiModule> {
    //     return {
    //         ngModule: PepperiModule,
    //         providers: [SessionService]
    //     };
    // }

    // static forRoot() {
    //     return {
    //       ngModule: PepperiModule,
    //       providers: [ SessionService ]
    //     }
    // }
}
