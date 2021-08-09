import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadateMaisonComponent } from './upadate-maison.component';

describe('UpadateMaisonComponent', () => {
  let component: UpadateMaisonComponent;
  let fixture: ComponentFixture<UpadateMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpadateMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpadateMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
