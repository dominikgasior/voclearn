import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssociationContract } from '@voclearn/contracts';

@Component({
  selector: 'voclearn-association-dialog',
  templateUrl: './association-dialog.component.html',
  styleUrls: ['./association-dialog.component.scss'],
})
export class AssociationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public association: AssociationContract
  ) {}
}
