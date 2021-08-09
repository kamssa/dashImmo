import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlashTerrainComponent } from './update-flash-terrain.component';

describe('UpdateFlashTerrainComponent', () => {
  let component: UpdateFlashTerrainComponent;
  let fixture: ComponentFixture<UpdateFlashTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFlashTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFlashTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
