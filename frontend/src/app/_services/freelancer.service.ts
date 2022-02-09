import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class FreelancerService {
  constructor(private http: HttpClient) {}

  getFreelancerById(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/freelancers/${id}`);
  }

  updateFreelancerById(newFreelancer: any, id: string) {
    return this.http.patch<any>(`${environment.apiUrl}/freelancer/${id}`, {
      ...newFreelancer,
    });
  }

  getFreelancerJobs(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/freelancers/${id}/jobs`);
  }
}
