import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFlashTerrainComponent } from './list-flash-terrain.component';

describe('ListFlashTerrainComponent', () => {
  let component: ListFlashTerrainComponent;
  let fixture: ComponentFixture<ListFlashTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFlashTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFlashTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
