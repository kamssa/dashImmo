import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMaisonComponent } from './modal-maison.component';

describe('ModalMaisonComponent', () => {
  let component: ModalMaisonComponent;
  let fixture: ComponentFixture<ModalMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
