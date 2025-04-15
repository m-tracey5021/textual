import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-exercise-panel',
    standalone: false,
    templateUrl: './exercise-panel.component.html',
    styleUrl: './exercise-panel.component.css'
})
export class ExercisePanelComponent {

    @Input() exercises: string[] = [];


}
