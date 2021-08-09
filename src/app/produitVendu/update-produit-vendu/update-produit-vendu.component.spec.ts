import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProduitVenduComponent } from './update-produit-vendu.component';

describe('UpdateProduitVenduComponent', () => {
  let component: UpdateProduitVenduComponent;
  let fixture: ComponentFixture<UpdateProduitVenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProduitVenduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProduitVenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
