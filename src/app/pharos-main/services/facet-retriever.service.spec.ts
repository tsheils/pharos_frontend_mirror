import { TestBed, inject } from '@angular/core/testing';

import { FacetRetrieverService } from './facet-retriever.service';
import {ResponseParserService} from "../../pharos-services/response-parser.service";
import {PharosApiService} from "../../pharos-services/pharos-api.service";
import {SharedModule} from "../../shared/shared.module";
import {EnvironmentVariablesService} from "../../pharos-services/environment-variables.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('FacetRetrieverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        EnvironmentVariablesService,
        PharosApiService,
        ResponseParserService,
        FacetRetrieverService
      ]
    });
  });

  it('should be created', inject([FacetRetrieverService], (service: FacetRetrieverService) => {
    expect(service).toBeTruthy();
  }));
});