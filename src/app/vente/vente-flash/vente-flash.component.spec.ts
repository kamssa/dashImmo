import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteFlashComponent } from './vente-flash.component';

describe('VenteFlashComponent', () => {
  let component: VenteFlashComponent;
  let fixture: ComponentFixture<VenteFlashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteFlashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteFlashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
