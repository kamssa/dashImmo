import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTerrainsComponent } from './liste-terrains.component';

describe('ListeTerrainsComponent', () => {
  let component: ListeTerrainsComponent;
  let fixture: ComponentFixture<ListeTerrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTerrainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTerrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
