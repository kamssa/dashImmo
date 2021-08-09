import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlashTerrainComponent } from './add-flash-terrain.component';

describe('AddFlashTerrainComponent', () => {
  let component: AddFlashTerrainComponent;
  let fixture: ComponentFixture<AddFlashTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlashTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlashTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
