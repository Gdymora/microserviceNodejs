import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { IDictionary } from '../interfaces/dictionary-post.interface';

@Injectable({
  providedIn: 'root'
})

export class DictionaryService {

  constructor(private http: HttpClient) { }
  get(id: string): Observable<IDictionary[]> {
    return this.http.get<IDictionary[]>(`assets/json/${id}.json`);
  }
}

/* 
Іменник (noun)
числа (number) 
Прикметник (adjective)
Прислівник (adverb)
 */
