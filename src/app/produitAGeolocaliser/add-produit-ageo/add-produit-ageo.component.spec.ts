import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProduitAGeoComponent } from './add-produit-ageo.component';

describe('AddProduitAGeoComponent', () => {
  let component: AddProduitAGeoComponent;
  let fixture: ComponentFixture<AddProduitAGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProduitAGeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProduitAGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
