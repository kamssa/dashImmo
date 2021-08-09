import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlashMaisonComponent } from './add-flash-maison.component';

describe('AddFlashMaisonComponent', () => {
  let component: AddFlashMaisonComponent;
  let fixture: ComponentFixture<AddFlashMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlashMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlashMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
