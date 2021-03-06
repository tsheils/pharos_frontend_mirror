import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosBase, Serializer} from '../../models/pharos-base';
import {map} from 'rxjs/internal/operators';

/**
 * resolves the details for a specific object
 */
@Injectable()
export class QueryResolver implements Resolve<any> {

  /**
   * create services
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
  constructor(
    private pharosApiService: PharosApiService
  ) {  }

  /**
   * toggle loading modal
   * set path todo: see how much this is still used
   * call api - api returns through different subscriptions, so the data ins't actually returned here
   * hence the empty observable returned
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<PharosBase>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<PharosBase> {
    this.pharosApiService.flushData();
    const serializer: Serializer = route.data.serializer;
    return this.pharosApiService.adHocQuery(route.data.fragments.query)
      .pipe(
        map(res =>  {
          let results = res.data[route.data.rootObject];
          if(Array.isArray(results)) {
            res.data[`${[route.data.rootObject]}Props`] = [];
            res.data[route.data.rootObject] = res.data[route.data.rootObject].map(obj => {
              const tobj = serializer.fromJson(obj);
              res.data[`${[route.data.rootObject]}Props`].push(serializer._asProperties(tobj));
              return tobj;
            });
          }
          else{
            const tobj = serializer.fromJson(res.data[route.data.rootObject]);
            res.data[route.data.rootObject] = tobj;
            res.data[`${[route.data.rootObject]}Props`] = serializer._asProperties(tobj);
          }
          return res.data;
        })
      );
  }
}
