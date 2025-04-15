import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePanelComponent } from './exercise-panel.component';

describe('ExercisePanelComponent', () => {
  let component: ExercisePanelComponent;
  let fixture: ComponentFixture<ExercisePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExercisePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
