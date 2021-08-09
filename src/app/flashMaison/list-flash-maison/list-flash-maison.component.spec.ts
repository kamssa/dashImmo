import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFlashMaisonComponent } from './list-flash-maison.component';

describe('ListFlashMaisonComponent', () => {
  let component: ListFlashMaisonComponent;
  let fixture: ComponentFixture<ListFlashMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFlashMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFlashMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
