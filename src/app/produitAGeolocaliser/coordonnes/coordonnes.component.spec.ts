import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonnesComponent } from './coordonnes.component';

describe('CoordonnesComponent', () => {
  let component: CoordonnesComponent;
  let fixture: ComponentFixture<CoordonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordonnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
