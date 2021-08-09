import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAccueilComponent } from './image-accueil.component';

describe('ImageAccueilComponent', () => {
  let component: ImageAccueilComponent;
  let fixture: ComponentFixture<ImageAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
