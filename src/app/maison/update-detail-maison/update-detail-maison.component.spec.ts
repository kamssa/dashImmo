import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailMaisonComponent } from './update-detail-maison.component';

describe('UpdateDetailMaisonComponent', () => {
  let component: UpdateDetailMaisonComponent;
  let fixture: ComponentFixture<UpdateDetailMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDetailMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
