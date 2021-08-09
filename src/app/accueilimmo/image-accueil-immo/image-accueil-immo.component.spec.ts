import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAccueilImmoComponent } from './image-accueil-immo.component';

describe('ImageAccueilImmoComponent', () => {
  let component: ImageAccueilImmoComponent;
  let fixture: ComponentFixture<ImageAccueilImmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAccueilImmoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAccueilImmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
