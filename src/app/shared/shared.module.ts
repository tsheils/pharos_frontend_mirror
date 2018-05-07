///<reference path="../../../node_modules/@angular/router/src/router_module.d.ts"/>
import { NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {SearchComponent} from '../tools/search-component/search.component';
import {HighlightPipe} from '../tools/search-component/highlight.pipe';
import {MaterialModule} from '../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollToTopComponent} from '../tools/scroll-to-top/scroll-to-top.component';
import {IdgLevelIndicatorComponent} from '../tools/idg-level-indicator/idg-level-indicator.component';
import {CustomContentDirective} from '../tools/custom-content.directive';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {ComponentLookupService} from '../pharos-services/component-lookup.service';
import {GenericTableComponent} from '../tools/generic-table/generic-table.component';
import {TermDisplayComponent} from '../tools/term-display/term-display.component';
import {LineChartComponent} from '../pharos-main/visualizations/line-chart/line-chart.component';
import {LinkListComponent} from '../tools/link-list/link-list.component';
import {TopicTableComponent} from "../pharos-topics/topic-table/topic-table.component";
import {ToiCardComponent} from "../pharos-dashboard/toi-card/toi-card.component";
import {BreadcrumbComponent} from "../tools/breadcrumb/breadcrumb.component";
import {NcatsHeaderComponent} from "../tools/ncats-header/ncats-header.component";
import {NcatsFooterComponent} from "../tools/ncats-footer/ncats-footer.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    NcatsHeaderComponent,
    NcatsFooterComponent,
    BreadcrumbComponent,
    SearchComponent,
    HighlightPipe,
    ScrollToTopComponent,
    CustomContentDirective,
    IdgLevelIndicatorComponent,
    GenericTableComponent,
    TermDisplayComponent,
    LineChartComponent,
    LinkListComponent,
    TopicTableComponent,
    ToiCardComponent
  ],
  providers: [
    ComponentLookupService,
    ComponentInjectorService
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NcatsHeaderComponent,
    NcatsFooterComponent,
    BreadcrumbComponent,
    SearchComponent,
    HighlightPipe,
    ScrollToTopComponent,
    CustomContentDirective,
    IdgLevelIndicatorComponent,
    GenericTableComponent,
    TermDisplayComponent,
    LineChartComponent,
    LinkListComponent,
    TopicTableComponent,
    ToiCardComponent
  ]
})
export class SharedModule { }
