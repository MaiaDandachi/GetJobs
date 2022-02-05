import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../_models/Job';
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  @Input() jobs: Job[];
  @Input() currentPage: string;
  columns: number;
  constructor() {}

  // Responsive grid
  breakPoints() {
    switch (true) {
      case window.innerWidth <= 768:
        this.columns = 1;
        break;
      case window.innerWidth > 768:
        this.columns = 3;
        break;
      default:
        this.columns = 3;
    }
  }

  ngOnInit(): void {
    this.breakPoints();
  }

  onResize(event: any) {
    this.breakPoints();
  }
}
