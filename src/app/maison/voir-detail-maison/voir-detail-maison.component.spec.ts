import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirDetailMaisonComponent } from './voir-detail-maison.component';

describe('VoirDetailMaisonComponent', () => {
  let component: VoirDetailMaisonComponent;
  let fixture: ComponentFixture<VoirDetailMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirDetailMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirDetailMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
