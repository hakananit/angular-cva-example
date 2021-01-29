import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-cva-example';
  sampleForm: FormGroup;

  formControlData1: any;
  formControlData2: any;

  constructor(private _fb: FormBuilder) {
    this.sampleForm = this._fb.group({});
    this.formControlData1 = {
      id: 'control1',
      type: 'dropdown',
      data: [{
        name: 'apple',
        id: 1
      },
      {
        name: 'orange',
        id: 2
      }]
    };
    this.formControlData2 = {
      id: 'control2',
      type: 'switch'
    };

    this.sampleForm.addControl(this.formControlData1.id, new FormControl());
    this.sampleForm.addControl('test', new FormControl());
    this.sampleForm.addControl(this.formControlData2.id, new FormControl());

    this.sampleForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(formValue => {
      console.log(formValue);
    });
  }
}
