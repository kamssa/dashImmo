import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerrainsComponent } from './add-terrains.component';

describe('AddTerrainsComponent', () => {
  let component: AddTerrainsComponent;
  let fixture: ComponentFixture<AddTerrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTerrainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTerrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
