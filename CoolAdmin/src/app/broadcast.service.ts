import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectConfig } from './project-config';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  private mainUrl: String;
  private standardHeadersValues: Map<String, String> = new Map()
        .set('header', 'value');

  constructor(private http: HttpClient) {
    this.mainUrl = ProjectConfig.MAIN_URL;
  }

  public provideGetRequest<T>(controller: String, 
                              params: Map<String, String> = new Map(), 
                              additionalHeaders: Map<String, String> = new Map()): Observable<T> {
    let url: string = this.createUrl(controller);
    let headers: HttpHeaders = this.createHeadersSet(additionalHeaders);
    let httpParams: HttpParams = this.createHttpParams(params);
    return this.http.get<T>(url, {
              headers: headers, 
              params: httpParams
            });
  }

  private createUrl(controller: String): string {
    return this.mainUrl + "/" + controller;
  }

  private createHeadersSet(additionalHeaders: Map<String, String>): HttpHeaders {
    let headers = new HttpHeaders();
    this.standardHeadersValues.forEach((value: string, key: string) => {
      headers.set(key, value);
    })
    additionalHeaders.forEach((value: string, key: string) => {
      headers.set(key, value);
    })
    return headers;
  }

  private createHttpParams(params: Map<String, String>): HttpParams {
    let httpParams = new HttpParams();
    params.forEach((value: string, key: string) => {
      httpParams.set(key, value);
    })
    return httpParams;
  }
}
