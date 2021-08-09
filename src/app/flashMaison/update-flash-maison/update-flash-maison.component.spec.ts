import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlashMaisonComponent } from './update-flash-maison.component';

describe('UpdateFlashMaisonComponent', () => {
  let component: UpdateFlashMaisonComponent;
  let fixture: ComponentFixture<UpdateFlashMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFlashMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFlashMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
