import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVilleComponent } from './liste-ville.component';

describe('ListeVilleComponent', () => {
  let component: ListeVilleComponent;
  let fixture: ComponentFixture<ListeVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeVilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
