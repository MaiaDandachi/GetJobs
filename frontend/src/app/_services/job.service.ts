import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class JobService {
  constructor(private http: HttpClient) {}

  getAllJobs() {
    return this.http.get<any>(`${environment.apiUrl}/jobs`);
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

  updateJobById(id: number, status: string, freelancerId: number) {
    return this.http.patch<any>(`${environment.apiUrl}/jobs/${id}`, {
      status,
      freelancerId,
    });
  }
}
