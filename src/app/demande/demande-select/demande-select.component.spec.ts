import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSelectComponent } from './demande-select.component';

describe('DemandeSelectComponent', () => {
  let component: DemandeSelectComponent;
  let fixture: ComponentFixture<DemandeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
