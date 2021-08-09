import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDocComponent } from './liste-doc.component';

describe('ListeDocComponent', () => {
  let component: ListeDocComponent;
  let fixture: ComponentFixture<ListeDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
