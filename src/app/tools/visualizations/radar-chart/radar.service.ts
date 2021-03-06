import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from '../../../../config/pharos-config';

/**
 * different config settings for radar types
 * todo: put in different config file
 * @type {Map<string, any>}
 */
const RADAR_SIZES: Map<string, any> = new Map<string, any>(
  [
    ['small', {
      maxValue: 1,
      margin: {top: 5, right: 5, bottom: 5, left: 5},
      levels: 1,
      dotRadius: 0, 			// The size of the colored circles of each blog
      format: '.1f',
      labels: false,
      axisLabels: false
    }
    ], ['medium', {
    maxValue: 1,
    levels: 5,
    format: '.1f',
    labels: false,
    axisLabels: true
  }
  ], ['medium-shape', {
    maxValue: 1,
    levels: 5,
    format: '.2f',
    labels: true,
    labelFactor: 1.1,
    axisLabels: false
  }
  ], ['large', {
    maxValue: 1,
    margin: {top: 30, right: 20, bottom: 50, left: 20},
    levels: 10,
    dotRadius: 2.5, 			// The size of the colored circles of each blog
    format: '.2f',
    labelFactor: 1.05,
    labels: true,
    axisLabels: true
  }
  ]
  ]
);

/**
 * retrieves radar chart data
 * returns radar chart config object
 */
@Injectable()
export class RadarService {

  /**
   * map of different data retrieved, keyed by object id
   * @type {Map<string, any>}
   */
  private radarDataMap: Map<string, any> = new Map<string, any>();

  // todo: this probably shouldn't have the environment variables here / load its own data
  /**
   * set up chart to fetch data
   * @param {HttpClient} http
   * @param {PharosConfig} pharosConfig
   */
  constructor(private http: HttpClient,
              private pharosConfig: PharosConfig) {
  }

  /**
   * check to see if data exists in map, if not retrieve it
   * @param {string} id
   * @param {string} origin
   * @return {any}
   */
  getData(id: string, origin: string): any {
    let url: string;
    let temp: any; // = this.radarDataMap.get(id);
    //  if (!temp || !temp[origin]) {
    if (origin === 'knowledge') {
      url = `${this.pharosConfig.getRadarPath()}${id}`;
    } else if (origin === 'knowledge-sources') {
      url = `${this.pharosConfig.getRadarSourcesPath()}${id}`;
    }
    temp = this._fetchData(url);
    return temp;
  }

  /**
   * set api data in the api
   * @param {string} id
   * @param data
   * @param {string} origin
   */
  setData(id: string, data: any, origin: string): void {
    let temp: any = this.radarDataMap.get(id);
    if (temp) {
      temp[origin] = data;
    } else {
      temp = {[origin]: data};
    }
    this.radarDataMap.set(id, temp);
  }

  /**
   * return options for each size
   * @param {string} size
   * @return {any}
   */
  getOptions(size: string) {
    return RADAR_SIZES.get(size);
  }

  /**
   * call api to fetch data for the radar chart
   * @param {string} url
   * @return {any}
   * @private
   */
  private _fetchData(url: string): any {
    return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getRadarData', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      //  console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
