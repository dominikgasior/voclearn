import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number | string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Cat', weight: 'Kot', symbol: 'H' },
  { position: 2, name: 'Dog', weight: 'Pies', symbol: 'H' },
];

@Component({
  selector: 'voclearn-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent {
  displayedColumns: string[] = ['name', 'weight', 'actions'];
  dataSource = ELEMENT_DATA;
}
