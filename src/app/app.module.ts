import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../assets/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NcatsHeaderComponent} from './ncats-header/ncats-header.component';
import { NcatsFooterComponent} from './ncats-footer/ncats-footer.component';
import { LoadingService } from './services/loading.service';
import { DataListComponent } from './data-list/data-list.component';
import { DataDetailsComponent } from './data-details/data-details.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { DataListVisualizationsComponent } from './data-list-visualizations/data-list-visualizations.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FacetTableComponent } from './filter-panel/facet-table/facet-table.component';
import { PharosPaginatorComponent } from './tools/pharos-paginator/pharos-paginator.component';
import { PharosApiService } from './services/pharos-api.service';
import { ResponseParserService } from './services/response-parser.service';
import { DonutChartComponent } from './visualizations/donut-chart/donut-chart.component';
import { WordCloudChartComponent } from './visualizations/word-cloud-chart/word-cloud-chart.component';
import { SunburstChartComponent } from './visualizations/sunburst-chart/sunburst-chart.component';
import { VisualizationOptionsComponent } from './data-list-visualizations/visualization-options/visualization-options.component';
import { EnvironmentVariablesService } from './services/environment-variables.service';
import { PathResolverService } from './services/path-resolver.service';
import { FacetRetrieverService } from './services/facet-retriever.service';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ToiDashboardComponent } from './toi-dashboard/toi-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NcatsHeaderComponent,
    NcatsFooterComponent,
    DataListComponent,
    DataDetailsComponent,
    IndexComponent,
    FilterPanelComponent,
    DataListVisualizationsComponent,
    BreadcrumbComponent,
    FacetTableComponent,
    PharosPaginatorComponent,
    DonutChartComponent,
    WordCloudChartComponent,
    SunburstChartComponent,
    VisualizationOptionsComponent,
    HomeDashboardComponent,
    ToiDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [
    PharosApiService,
    PathResolverService,
    ResponseParserService,
    LoadingService,
    EnvironmentVariablesService,
    FacetRetrieverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
