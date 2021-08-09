import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifImageMAisonComponent } from './modif-image-maison.component';

describe('ModifImageMAisonComponent', () => {
  let component: ModifImageMAisonComponent;
  let fixture: ComponentFixture<ModifImageMAisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifImageMAisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifImageMAisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
