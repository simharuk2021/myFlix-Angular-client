import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss']
})
export class SynopsisDialogComponent implements OnInit {
  
  /**
   *
   * @param data
   */
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: {
    Title: string,
    Description: string,
  }) { }

  ngOnInit(): void {
  }

}
