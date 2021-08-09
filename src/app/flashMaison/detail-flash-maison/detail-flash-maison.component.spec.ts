import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFlashMaisonComponent } from './detail-flash-maison.component';

describe('DetailFlashMaisonComponent', () => {
  let component: DetailFlashMaisonComponent;
  let fixture: ComponentFixture<DetailFlashMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFlashMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFlashMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
