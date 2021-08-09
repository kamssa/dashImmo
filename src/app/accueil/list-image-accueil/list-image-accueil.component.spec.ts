import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImageAccueilComponent } from './list-image-accueil.component';

describe('ListImageAccueilComponent', () => {
  let component: ListImageAccueilComponent;
  let fixture: ComponentFixture<ListImageAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImageAccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImageAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
