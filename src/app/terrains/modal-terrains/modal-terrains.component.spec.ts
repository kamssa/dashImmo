import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTerrainsComponent } from './modal-terrains.component';

describe('ModalTerrainsComponent', () => {
  let component: ModalTerrainsComponent;
  let fixture: ComponentFixture<ModalTerrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTerrainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTerrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
