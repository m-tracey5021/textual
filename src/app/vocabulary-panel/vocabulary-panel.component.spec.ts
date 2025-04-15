import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyPanelComponent } from './vocabulary-panel.component';

describe('VocabularyPanelComponent', () => {
  let component: VocabularyPanelComponent;
  let fixture: ComponentFixture<VocabularyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabularyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
