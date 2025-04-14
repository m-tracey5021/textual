import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { END_POINT, GET_CONTEXT_END_POINT } from '../../constants';
import { GET_PASSAGE } from '../../prompts';
import { finalize, tap } from 'rxjs';
import { MenuSelectEvent } from '../exercise-tree/exercise-tree.component';

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
    pairings: VocabularyPairing[]
}

interface Context {
    passages: Passage[],
    exercises: Exercise[],
    vocabulary: VocabList[]
}

@Component({
    selector: 'app-main-panel',
    standalone: false,
    templateUrl: './main-panel.component.html',
    styleUrl: './main-panel.component.css'
})
export class MainPanelComponent {

    apiEndPoint = END_POINT; 
    passageSize = 'five';

    text: string = '';
    selectedLanguage: string = '';
    selectedMode: string = '';
    
    languages: string[] = [

        'English',

        'French',

        'Italian'
    ];

    modes: string[] = [

        'Read',

        'Write',

        'Memorise'
    ];
    context: Context | null = null;
    dataSource: TreeNode[] = [];

    apiContextEndPoint = GET_CONTEXT_END_POINT;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        
        this.populateExerciseTree()
    }

    childrenAccessor = (node: TreeNode) => node.children ?? [];

    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    populateExerciseTree() {

        var id = 345;

        this.http.get<Context>(`${this.apiContextEndPoint}/${id}`).subscribe(data => {

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

    generateOutput() {
        var prompt = GET_PASSAGE.replace("{targetLanguage}", this.selectedLanguage).replace("{size}", this.passageSize);

        const body = { message: prompt };
    
        this.http.post<{ response: string }>(this.apiEndPoint, body).pipe(
            tap(() => {
                this.text = 'loading';
            }),
            finalize(() => {
                // this.text = ''; // Always runs, whether success or error
            })

        ).subscribe({
            next: (data) => {
                console.log(data)
                this.text = data.response; // Update the textarea with the response
            },
            error: (err) => {
                this.text = 'error: ' + err;
                console.error('Error posting text:', err);
            }
        });
    }
    populateTextBox(type: string, name: string) {

        // get content from context here

        console.log(this.context);
        console.log(type);
        console.log(name);

        if (type == 'passage') {

            var selectedPassage = this.context?.passages.find(x => x.name == name);

            if (selectedPassage) {

                console.log(selectedPassage);

                this.text = selectedPassage.content;
            }
        }
        if (type == 'exercise') {

            // var selected = this.context?.exercises.find(x => x.name = name);

            // if (selected) {

            //     this.text = selected.content;
            // }
        }
        if (type == 'vocab') {

            var selectedVocab = this.context?.vocabulary.find(x => x.name == name);

            if (selectedVocab) {

                console.log(selectedVocab);

                var totalStr = '';

                for(const pairing of selectedVocab.pairings) {

                    totalStr += pairing.word + ' -> ' + pairing.meaning + '\n';
                }
                this.text = totalStr;
            }
        }

        // this.message.emit({type, content: 'content for '+ name})
    }
}
