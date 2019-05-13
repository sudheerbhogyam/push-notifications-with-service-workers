import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsletterServiceService {

  constructor(private http: HttpClient) {

  }

  addPushSubscriber(sub:any) {
      return this.http.post('http://localhost:9000/api/notifications', sub);
  }

  send() {
      return this.http.post('http://localhost:9000/api/newsletter', null);
  }
}
