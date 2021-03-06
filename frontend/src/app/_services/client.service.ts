import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) {}

  getClientrById(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/clients/${id}`);
  }

  updateClientById(newClient: any, id: string) {
    return this.http.patch<any>(`${environment.apiUrl}/clients/${id}`, {
      ...newClient,
    });
  }

  getClientJobs(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/clients/${id}/jobs`);
  }
}
