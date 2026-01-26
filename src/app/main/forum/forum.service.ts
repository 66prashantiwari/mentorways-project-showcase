import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/dataService/httpService';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  constructor(private httpService: HttpService) {}

  getForumList(body: any): Observable<any> {
    let url = `forum/getForumtopicList`;
    return this.httpService.get(url, body);
  }

  postForumList(body: any): Observable<any> {
    const url = `forum/createForumTopic`;
    return this.httpService.post(url, body);
  }

  deleteForum(body: any): Observable<any> {
    const url = `forum/deleteForumTopic/${body.id}`;
    return this.httpService.delete(url);
  }

  getForumDetails(body: any): Observable<any> {
    let url = `forum/getTopicdetails/${body.id}`;
    return this.httpService.post(url, body);
  }

  postTopicComment(body: any): Observable<any> {
    const url = `forum/saveforumTopicComment`;
    return this.httpService.post(url, body);
  }
}
