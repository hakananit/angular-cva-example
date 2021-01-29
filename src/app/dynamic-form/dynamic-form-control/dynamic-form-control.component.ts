import { ViewChild } from '@angular/core';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DynamicFormControlComponent,
      multi: true
    }
  ]
})
export class DynamicFormControlComponent implements OnInit, ControlValueAccessor {

  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;

  private _formControl!: FormControl;
  @Input()
  set formControl(value) {
    this._formControl = value;
  }
  get formControl() {
    return this._formControl;
  }

  private _formControlName!: string;
  @Input()
  set formControlName(value) {
    this._formControlName = value;
  }
  get formControlName() {
    return this._formControlName;
  }

  private _formControlData: any;
  @Input()
  set formControlData(value) {
    this._formControlData = value;
  }
  get formControlData() {
    return this._formControlData;
  }

  constructor(private _controlContainer: ControlContainer) {
   }

  ngOnInit(): void {
  }

  get control() {
    return this.formControl || this._controlContainer.control?.get(this.formControlName);
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

}
