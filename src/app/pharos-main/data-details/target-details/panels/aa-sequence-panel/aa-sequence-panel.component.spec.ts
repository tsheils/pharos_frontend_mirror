import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AaSequencePanelComponent} from './aa-sequence-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {RouterTestingModule} from '@angular/router/testing';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/firestore';

describe('AaSequencePanelComponent', () => {
  let component: AaSequencePanelComponent;
  let fixture: ComponentFixture<AaSequencePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AaSequencePanelComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.data = {
      targets: TESTTARGET,
      targetsProps: TESTTARGETPROPS
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
