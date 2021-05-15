import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css'],
})
export class CardModalComponent implements OnInit {
  fromPage: string;
  description: string;
  genres: string;
  constructor(
    public dialogRef: MatDialogRef<CardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data.pageValue;
    this.description = data.description;
    this.genres = data.genres;

    // console.log('from page', this.description);
  }

  ngOnInit(): void {
  }

  

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
  }
}
