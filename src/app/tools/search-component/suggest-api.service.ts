import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,  map } from 'rxjs/operators';
import {PharosConfig} from '../../../config/pharos-config';

/**
 * api helper service to connect to search suggest fields
 */
@Injectable()
export class SuggestApiService {

  /**
   * autocomplete search url
   */
  url: string;

  /**
   * list of fields to display from autocomplete
   */
  autocompleteFields: string[];

  /**
   * set up http call services
   * @param {HttpClient} http
   * @param {PharosConfig} pharosConfig
   */
  constructor(private http: HttpClient,
              private pharosConfig: PharosConfig) {
    this.url = this.pharosConfig.getSuggestPath();
    this.autocompleteFields = this.pharosConfig.getAutocompleteFields();
  }

  /**
   * search function
   * thius primarily happens on input change, but it could be anything
   * @param {string} query
   * @returns {Observable<any[]>}
   */
  search(query: string): Observable<any[]> {
    const autocomplete = [];
    const upper = query.toUpperCase();
    return this.http.get<any[]>(this.url +  query)
      .pipe(
        map(response => {
          this.autocompleteFields.forEach(field => {
            if (response[field] && response[field].length > 0) {
              autocomplete.push({
                name: [field.replace(/_/g, ' ')],
                options: response[field].sort((a, b) => a.key.toUpperCase() - b.key.toUpperCase()).sort((a, b) =>
                   a.key.toUpperCase() === query.toUpperCase() ? -1 : b.key.toUpperCase() === query.toUpperCase() ? 1 : 0
                )
              });
            }
          });
          return autocomplete;
        }),
        catchError(this.handleError('getProtocols', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
