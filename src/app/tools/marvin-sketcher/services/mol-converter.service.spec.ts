import { TestBed, inject } from '@angular/core/testing';

import { MolConverterService } from './mol-converter.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('MolConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MolConverterService
      ]
    });
  });

  it('should be created', inject([MolConverterService], (service: MolConverterService) => {
    expect(service).toBeTruthy();
  }));
});
