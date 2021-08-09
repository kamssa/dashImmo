import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitVenduComponent } from './list-produit-vendu.component';

describe('ListProduitVenduComponent', () => {
  let component: ListProduitVenduComponent;
  let fixture: ComponentFixture<ListProduitVenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProduitVenduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitVenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
