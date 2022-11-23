import { DragTarget } from './dragDrop';
import { ProjectItem } from './projectItem.js';
import { Project,projectStatus } from './project.js';
import { Component } from './base-component.js';
import { projectstate } from './state.js';
import { autobind } from './autobind.js';

// ProjectList Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'proj', false, `${type}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();  
    }
    @autobind
    dragOver(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @autobind
    drop(event: DragEvent): void {
       const prjId = event.dataTransfer!.getData('text/plain');
       console.log('id' + prjId);
       projectstate.moveProject(prjId, this.type === 'active' ? projectStatus.Active : projectStatus.Finished);
       this.element.querySelector('ul')!.classList.remove('droppable');
    }

    @autobind
    dragLeave(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }
    moveToFinished(prjId:string){
        projectstate.moveProject(prjId, this.type === 'active' ? projectStatus.Active : projectStatus.Finished);
    }
    configure(): void {
        this.element.addEventListener('dragover', this.dragOver);
        this.element.addEventListener('dragleave', this.dragLeave);
        this.element.addEventListener('drop', this.drop);
       
        projectstate.addListeners((projects: Project[]) => {
            const relevantProjects = projects.filter(proj => {
                if (this.type === 'active') {
                    return proj.status === projectStatus.Active;
                } 
                return proj.status === projectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;//overide the old with then new project
            this.renderProject();
        });
    }
   
    renderProject() {
        const listElem = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listElem.innerHTML='';//avoid duplication adding
        for (const item of this.assignedProjects) {
            // const listItem = document.createElement('li');
            // const verfiedBtn = document.createElement('button');
            // verfiedBtn.textContent="verfied";
            // listItem.textContent = item.titlte;
            // listItem.appendChild(verfiedBtn);
            // listElem.appendChild(listItem);
           new ProjectItem(this.element.querySelector('ul')!.id, item); //elemnt is the whole template 
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
}
