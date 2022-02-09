import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class FreelancerService {
  constructor(private http: HttpClient) {}

  getFreelancerById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/freelancers/${id}`);
  }

  updateFreelancerById(newFreelancer: any, id: number) {
    return this.http.patch<any>(`${environment.apiUrl}/freelancer/${id}`, {
      ...newFreelancer,
    });
  }

  getFreelancerJobs(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/freelancers/${id}/jobs`);
  }
}
