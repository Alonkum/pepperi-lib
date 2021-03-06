import { Component, OnInit, OnChanges, Input, Output, EventEmitter,
    ChangeDetectionStrategy, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from 'pepperi-lib/core';
import { LAYOUT_TYPE, CustomizationService } from '../customization.service';

@Component({
// tslint:disable-next-line: component-selector
selector: 'pepperi-textbox',
    templateUrl: './textbox.component.html',
    styleUrls: ['./textbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PepperiTextboxComponent implements OnChanges, OnInit, OnDestroy {
    @Input() key = '';
    @Input() value = '';
    @Input() formattedValue = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() type = 'text';
    @Input() required = false;
    @Input() disabled = false;
    @Input() readonly = false;
    @Input() maxFieldCharacters: number;
    @Input() textColor = '';
    @Input() xAlignment = '0';
    @Input() rowSpan = 1;
    @Input() lastFocusField: any;

    controlType = 'textbox';

    @Input() form: FormGroup = null;
    @Input() isActive = false;
    @Input() showTitle = true;
    @Input() layoutType: LAYOUT_TYPE = LAYOUT_TYPE.PepperiForm;
    @Input() parentField: any = null;

    @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() formValidationChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('input') input: ElementRef;

    LAYOUT_TYPE = LAYOUT_TYPE;
    standAlone = false;
    isInEditMode = false;
    isFocus = false;

    constructor(
        public sessionService: SessionService,
        private customizationService: CustomizationService,
        public fb: FormBuilder,
        private renderer: Renderer2,
        public _eref: ElementRef
    ) { }

    ngOnInit() {
        if (this.form === null) {
            this.standAlone = true;
            this.form = this.customizationService
                .getDefaultFromGroup(this.key, this.value, this.required, this.readonly, this.disabled, this.maxFieldCharacters, this.type);
            this.formattedValue = this.formattedValue || this.value;

            this.renderer.addClass(this._eref.nativeElement, CustomizationService.STAND_ALONE_FIELD_CLASS_NAME);
        }

        this.readonly = this.type === 'duration' ? true : this.readonly; // Hack until we develop Timer UI for editing Duration field
    }

    ngOnChanges(changes: any) {
        this.readonly = this.type === 'duration' ? true : this.readonly; // Hack until we develop Timer UI for editing Duration field

        const self = this;
        setTimeout(() => {
            if (self.lastFocusField) {
                self.lastFocusField.focus();
                self.lastFocusField = null;
            } else {
            }
        }, 100);
    }

    ngOnDestroy() {
        if (this.valueChanged) {
            this.valueChanged.unsubscribe();
        }

        if (this.formValidationChanged) {
            this.formValidationChanged.unsubscribe();
        }
    }

    onFocus(e: any) {
        this.isFocus = true;
    }

    onBlur(e: any) {
        this.isFocus = false;

        const value = e.target ? e.target.value : e;
        if (value !== this.value) {
            this.formattedValue = this.value = value;

            // There is formControl.setValue in the onKeyUp so we don't need it here.
            // this.propagateChange(value, e.relatedTarget);
            this.valueChanged.emit({
                apiName: this.key,
                value,
                lastFocusedField: e.relatedTarget
            });
            // return true; // What this is for? Tomer.p comment this in 16.4.
        }

        if (this.isInEditMode) {
            this.isInEditMode = false;
        }
    }

    onKeyUp(event: any) {
        const value = event.target ? event.target.value : event;
        this.customizationService.updateFormFieldValue(this.form, this.key, value, this.parentField);
        this.formValidationChanged.emit(this.form.valid);
    }

    onKeyPress(event: any) {
        let inputChar = String.fromCharCode(event.charCode);
        const e = event as KeyboardEvent;

        if (
            [8, 9, 13, 27, 190].indexOf(e.which) !== -1 ||
            // Allow: Ctrl+A
            (e.which === 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.which === 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+V
            (e.which === 86 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.which === 88 && e.ctrlKey === true) /*||
            // Allow: home, end, left, right
            (e.which >= 35 && e.which <= 39)*/
        ) {
            // let it happen, don't do anything
            return true;
        }

        switch (this.type) {
            case 'int': {
                const pattern = /[0-9\+\-\ ]/;
                if (!pattern.test(inputChar)) {
                    e.preventDefault();
                }
                break;
            }
            case 'currency':
            case 'real': {
                const decPoint = '.';
                const thousandSeparator = ',';
                const pattern = /^\d+(\.\d{1,9})?$/;
                if (e.which === 46) {
                    inputChar = inputChar + '0';
                } else if (e.which === 44) {
                    inputChar = inputChar + '000';
                }
                if (!pattern.test(event.target.value + inputChar)) {
                    e.preventDefault();
                }
                break;
            }
            case 'phone': {
                const pattern = /^[\d\.\-\+\(\)\*\#]+$/;
                if (!pattern.test(event.target.value + inputChar)) {
                    e.preventDefault();
                }
                break;
            }
            case 'text': {
                // if (this.maxFieldCharacters !== 0 && event.target.value.length >= this.maxFieldCharacters) {
                //     e.preventDefault();
                // }
                break;
            }
        }
    }

    anchorClicked() {
        const currentValue = this.value;
        if (currentValue.trim().length > 0) {
            switch (this.type) {
                case 'email':
                    window.open('mailto:' + currentValue, 'email');
                    break;
                case 'phone':
                    window.open('tel:' + currentValue, 'tel');
                    break;
                case 'link':
                    window.open(currentValue);
                    break;
                default:
                    break;
            }
        }
    }

    cardTemplateClicked(event: any) {
        const self = this;
        this.isInEditMode = true;

        setTimeout(() => {
            self.input.nativeElement.focus();
        }, 0);
    }
}
