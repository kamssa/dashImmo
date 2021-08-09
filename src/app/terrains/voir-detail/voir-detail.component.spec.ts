import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirDetailComponent } from './voir-detail.component';

describe('VoirDetailComponent', () => {
  let component: VoirDetailComponent;
  let fixture: ComponentFixture<VoirDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
