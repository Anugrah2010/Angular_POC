import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MaterialFormModel } from 'src/app/shared/models/materialModel';

@Component({
  selector: 'app-procure-update-entry-modal',
  templateUrl: './procure-update-entry-modal.component.html',
  styleUrls: ['./procure-update-entry-modal.component.scss']
})
export class ProcureUpdateEntryModalComponent implements OnInit {
 procureUpdateForm: FormGroup;
options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
checked;
disabled = false;
label = 'before';
color = 'accent';
today: number = Date.now();
getUrl = 'http://localhost:3000/get';
postUrl = 'http://localhost:3000/post';
respData = 'click button to get data from server';
postData ;
successMsg: string;
delayReset = 1000;
barActive = false;

  constructor(  public dialogRef: MatDialogRef<ProcureUpdateEntryModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }
  selectedEntry: MaterialFormModel = this.data.object;

  PPU = this.selectedEntry.price;

  ngOnInit(): void {
    if (this.selectedEntry.payment === 'online') {
      this.checked = true;
    } else {
      this.checked = false;
    }
    console.log(this.selectedEntry);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    console.log(this.procureUpdateForm.value);
  }
  isChecked() {
    this.checked = ! this.checked;
    if (this.checked) {
      this.selectedEntry.payment = 'online';
    } else { this.selectedEntry.payment = 'offline';
      }
 }
 onUpdate() {
   console.log('updated');
 }

}
