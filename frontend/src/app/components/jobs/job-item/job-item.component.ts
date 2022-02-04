import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent implements OnInit {
  @Input() userType: string;
  @Input() jobTitle: string;
  @Input() joPosterName: string;
  @Input() jobDesription: string;
  constructor() {}

  ngOnInit(): void {}
}
