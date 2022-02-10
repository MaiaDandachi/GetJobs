import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/_models/user';
import { JobService } from '@app/_services';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent implements OnInit {
  @Input() userId: string;
  @Input() userType: string;
  @Input() jobId: string;
  @Input() jobTitle: string;
  @Input() joPosterName: string;
  @Input() jobDesription: string;
  @Input() jobStatus: string;
  @Input() currentPage: string;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {}

  applyForJob() {
    this.jobService
      .updateJobById(this.jobId, 'in-progress', this.userId)
      .pipe(first())
      .subscribe(() => {
        console.log('job updated');
      });
  }
}
