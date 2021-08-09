import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifImageComponent } from './modif-image.component';

describe('ModifImageComponent', () => {
  let component: ModifImageComponent;
  let fixture: ComponentFixture<ModifImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
