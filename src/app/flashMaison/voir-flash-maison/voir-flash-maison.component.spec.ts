import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirFlashMaisonComponent } from './voir-flash-maison.component';

describe('VoirFlashMaisonComponent', () => {
  let component: VoirFlashMaisonComponent;
  let fixture: ComponentFixture<VoirFlashMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirFlashMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirFlashMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
