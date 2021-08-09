import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageAccueilComponent } from './add-image-accueil.component';

describe('AddImageAccueilComponent', () => {
  let component: AddImageAccueilComponent;
  let fixture: ComponentFixture<AddImageAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImageAccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
