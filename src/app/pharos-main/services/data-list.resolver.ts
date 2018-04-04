import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';

@Injectable()
export class DataListResolver implements Resolve<any> {

    constructor(private pathResolverService: PathResolverService,
                private loadingService: LoadingService,
                private pharosApiService: PharosApiService) {  }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
      console.log(this);
      this.loadingService.toggleVisible(true);
      this.pathResolverService.setPath(route.data.path);
      this.pharosApiService.getData(route.data.path, route.queryParamMap);
         return of([]);
    }
}