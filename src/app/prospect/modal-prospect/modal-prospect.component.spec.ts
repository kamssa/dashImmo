import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProspectComponent } from './modal-prospect.component';

describe('ModalProspectComponent', () => {
  let component: ModalProspectComponent;
  let fixture: ComponentFixture<ModalProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
