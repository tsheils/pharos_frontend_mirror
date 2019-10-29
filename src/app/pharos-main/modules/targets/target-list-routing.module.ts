import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {DataListComponent} from '../../data-list/data-list.component';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {Target, TargetSerializer} from '../../../models/target';
import {PharosMainComponent} from '../../pharos-main.component';

const routes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    data: {
      fragments: Target.listfragments,
      serializer: new TargetSerializer(),
      subpath: 'list'
    },
    resolve: {
      components: ComponentsResolver,
      results: DataListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetListRoutingModule { }
