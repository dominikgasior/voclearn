import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateWordContract,
  UpdateWordContract,
  WordContract,
} from '@voclearn/contracts';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WordService {
  constructor(private readonly httpClient: HttpClient) {}

  getList(): Observable<WordContract[]> {
    return this.httpClient.get<WordContract[]>('/api/word');
  }

  delete(wordId: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/word/${wordId}`);
  }

  create(contract: CreateWordContract): Observable<void> {
    return this.httpClient.post<void>('/api/word', contract);
  }

  update(wordId: string, contract: UpdateWordContract): Observable<void> {
    return this.httpClient.patch<void>(`/api/word/${wordId}`, contract);
  }
}
