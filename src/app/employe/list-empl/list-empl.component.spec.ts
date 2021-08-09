import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmplComponent } from './list-empl.component';

describe('ListEmplComponent', () => {
  let component: ListEmplComponent;
  let fixture: ComponentFixture<ListEmplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
