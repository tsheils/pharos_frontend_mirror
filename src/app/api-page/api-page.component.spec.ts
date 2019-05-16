import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApiPageComponent} from './api-page.component';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';
import {DataTypesPanelComponent} from '../pharos-home/data-types-panel/data-types-panel.component';
import {AboutPanelComponent} from '../pharos-home/about-panel/about-panel.component';
import {PathResolverService} from '../pharos-services/path-resolver.service';
import {FaqPageComponent} from '../faq-page/faq-page.component';
import {NewsPanelComponent} from '../pharos-home/news-panel/news-panel.component';
import {AboutPageComponent} from '../about-page/about-page.component';
import {LoadingService} from '../pharos-services/loading.service';
import {SuggestApiService} from '../tools/search-component/suggest-api.service';
import {PharosApiService} from '../pharos-services/pharos-api.service';
import {ApiViewerComponent} from '../tools/api-viewer/api-viewer.component';
import {FacetRetrieverService} from '../pharos-main/data-list/filter-panel/facet-retriever.service';
import {APP_BASE_HREF} from '@angular/common';


describe('ApiPageComponent', () => {
  let component: ApiPageComponent;
  let fixture: ComponentFixture<ApiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
        FaqPageComponent,
        ApiPageComponent,
        ApiViewerComponent,
        DataTypesPanelComponent,
        NewsPanelComponent,
        AboutPanelComponent,
        AboutPageComponent
      ],
      providers: [
        PharosApiService,
        PathResolverService,
        LoadingService,
        FacetRetrieverService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/index' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
