import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { GET_CONTEXT_END_POINT } from '../../constants';
import { HttpClient } from '@angular/common/http';

interface TreeNode {
    name: string;
    type: string;
    children?: TreeNode[];
}
interface Passage {
    name: string
    content: string
}

interface Exercise {
    sentences: string[]
}

interface VocabularyPairing {
    word: string
    meaning: string
}

interface VocabList {
    name: string
    pairings: VocabularyPairing
}

interface Context {
    passages: Passage[],
    exercises: Exercise[],
    vocabulary: VocabList[]
}

export interface MenuSelectEvent {
    type: string,
    content: string
}

@Component({
    selector: 'app-exercise-tree',
    standalone: false,
    templateUrl: './exercise-tree.component.html',
    styleUrl: './exercise-tree.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseTreeComponent implements OnInit {
    @Output() menuSelect = new EventEmitter<MenuSelectEvent>();

    
    context: Context | null = null;
    dataSource: TreeNode[] = [];

    apiEndPoint = GET_CONTEXT_END_POINT;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        
        this.populateExerciseTree()
    }

    childrenAccessor = (node: TreeNode) => node.children ?? [];

    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    populateExerciseTree() {

        var id = 345;

        this.http.get<Context>(`${this.apiEndPoint}/${id}`).subscribe(data => {

            this.context = data;
            console.log(data);
            var passagesMenu = [];
            for(const passage of data.passages) {

                var node = {name: passage.name, type: 'passage'}
                
                passagesMenu.push(node)
            }
            console.log(passagesMenu);
            var exercisesMenu = [];
            for(const exercise of data.exercises) {

                var node = {name: 'woops forgot name', type: 'exercise'}
                
                exercisesMenu.push(node)
            }
            var vocabMenu = [];
            for(const vocabList of data.vocabulary) {

                var node = {name: vocabList.name, type: 'vocab'}
                
                vocabMenu.push(node)
            }
            this.dataSource = [

                {
                    name: 'Passages',
                    type: 'heading',
                    children: passagesMenu
                },
                {
                    name: 'Writing Exercises',
                    type: 'heading',
                    children: exercisesMenu
                },
                {
                    name: 'Vocabulary',
                    type: 'heading',
                    children: vocabMenu
                }
            ]
        });   
    }

    populateTextBox(type: string, name: string) {

        // get content from context here

        this.menuSelect.emit({type, content: 'content for '+ name})
    }
}