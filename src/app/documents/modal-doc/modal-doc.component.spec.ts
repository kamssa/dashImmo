import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocComponent } from './modal-doc.component';

describe('ModalDocComponent', () => {
  let component: ModalDocComponent;
  let fixture: ComponentFixture<ModalDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
