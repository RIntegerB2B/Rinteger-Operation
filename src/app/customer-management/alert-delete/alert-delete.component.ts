
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-alert-delete',
  template: `<h1 matDialogTitle>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
    <button
    type="button"
    mat-raised-button
    color="primary"
    (click)="dialogRef.close(true)">Yes</button>
    &nbsp;
    <span fxFlex></span>
    <button
    type="button"
    color="warn"
    mat-raised-button
    (click)="dialogRef.close(false)">No</button>
    </div>`,
})
export class AlertDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
