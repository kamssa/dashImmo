import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitAGeoComponent } from './list-produit-ageo.component';

describe('ListProduitAGeoComponent', () => {
  let component: ListProduitAGeoComponent;
  let fixture: ComponentFixture<ListProduitAGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProduitAGeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitAGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
