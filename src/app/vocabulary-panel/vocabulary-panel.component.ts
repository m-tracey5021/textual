import { Component, Input } from '@angular/core';
import { VocabularyPairing } from '../main-panel/main-panel.component';

@Component({
  selector: 'app-vocabulary-panel',
  standalone: false,
  templateUrl: './vocabulary-panel.component.html',
  styleUrl: './vocabulary-panel.component.css'
})
export class VocabularyPanelComponent {

    @Input() pairings: VocabularyPairing[] = [];
}
