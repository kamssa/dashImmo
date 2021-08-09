import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTerrainsComponent } from './update-terrains.component';

describe('UpdateTerrainsComponent', () => {
  let component: UpdateTerrainsComponent;
  let fixture: ComponentFixture<UpdateTerrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTerrainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTerrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
