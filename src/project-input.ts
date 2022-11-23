
import { autobind } from './autobind.js';
import { Component } from './base-component.js';
import { projectstate } from './state.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
        title: HTMLInputElement;
        description: HTMLInputElement;
        people: HTMLInputElement;
    
        constructor() {
            super('project-input', 'proj', true, 'user-input');
            this.title = this.element.querySelector('#title') as HTMLInputElement;
            this.description = this.element.querySelector('#description') as HTMLInputElement;
            this.people = this.element.querySelector('#people') as HTMLInputElement;
            this.configure();
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
        }
        //returns tuple type
        private getUserInput(): [string, string, number] | void {
            const title = this.title.value;
            const description = this.description.value;
            const people = this.people.value;
            if (title.trim().length === 0 || description.trim().length === 0 || people.trim().length === 0) {
                alert('invalid input');
                return;
            } else {
                return [title, description, +people];
            }
        }
        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.getUserInput();
            if (Array.isArray(userInput)) {
                const [title, decs, people]:[string, string, number] = userInput;
                projectstate.addProject(title, decs, people);
                //this.clearInputs();
                console.log(title, decs, people);  
            }
        }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
        renderContent(): void {}
    }
