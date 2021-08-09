import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeLuComponent } from './liste-demande-lu.component';

describe('ListeDemandeLuComponent', () => {
  let component: ListeDemandeLuComponent;
  let fixture: ComponentFixture<ListeDemandeLuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDemandeLuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandeLuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
