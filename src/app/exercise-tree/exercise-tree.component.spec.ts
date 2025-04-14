import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTreeComponent } from './exercise-tree.component';

describe('ExerciseTreeComponent', () => {
  let component: ExerciseTreeComponent;
  let fixture: ComponentFixture<ExerciseTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
