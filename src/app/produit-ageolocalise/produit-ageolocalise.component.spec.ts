import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAGeolocaliseComponent } from './produit-ageolocalise.component';

describe('ProduitAGeolocaliseComponent', () => {
  let component: ProduitAGeolocaliseComponent;
  let fixture: ComponentFixture<ProduitAGeolocaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitAGeolocaliseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitAGeolocaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
