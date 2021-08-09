import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitVenduComponent } from './produit-vendu.component';

describe('ProduitVenduComponent', () => {
  let component: ProduitVenduComponent;
  let fixture: ComponentFixture<ProduitVenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitVenduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitVenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
