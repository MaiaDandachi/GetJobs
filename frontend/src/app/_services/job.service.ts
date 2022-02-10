import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Job } from '@app/_models/Job';
import { map, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobService {
  private jobs: Job[] = [];
  private jobsUpdated = new Subject<Job[]>();

  constructor(private http: HttpClient) {}

  getJobsUpdateListener() {
    return this.jobsUpdated.asObservable();
  }

  getAllJobs() {
    return this.http.get<any>(`${environment.apiUrl}/jobs`).pipe(
      map((jobs) => {
        this.jobs = [...jobs];
        this.jobsUpdated.next(jobs);
        return jobs;
      })
    );
  }

  createJob(
    title: string,
    description: string,
    status: string,
    clientId: string
  ) {
    return this.http.post<any>(`${environment.apiUrl}/jobs`, {
      title,
      description,
      status,
      clientId,
    });
  }

  updateJobById(id: string, status: string, freelancerId: string) {
    this.jobsUpdated.next(this.jobs.filter((job) => job.id !== id));
    return this.http.patch<any>(`${environment.apiUrl}/jobs/${id}`, {
      status,
      freelancerId,
    });
  }
}
