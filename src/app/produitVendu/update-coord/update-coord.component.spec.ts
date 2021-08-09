import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoordComponent } from './update-coord.component';

describe('UpdateCoordComponent', () => {
  let component: UpdateCoordComponent;
  let fixture: ComponentFixture<UpdateCoordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCoordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
