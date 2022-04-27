import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WordGroupContract } from '@voclearn/contracts';

@Injectable({ providedIn: 'root' })
export class WordGroupService {
  constructor(private readonly httpClient: HttpClient) {}

  getList(): Observable<WordGroupContract[]> {
    return this.httpClient.get<WordGroupContract[]>('/api/word-group');
  }
}
