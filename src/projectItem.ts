import { Component } from './base-component.js';
import { Project } from './project.js';
import {Draggable } from './dragDrop.js';
import { autobind } from './autobind.js';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{

   private project: Project;

   constructor(hostId:string,project:Project){
      super('single-project', hostId,false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
   }
   @autobind
   dragStart(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain',this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
   }
   dragEnd(_: DragEvent): void {//replaced event with _ to say that for the moment I am not using event.
      console.log('dragend');
   }

   configure(): void {
      this.element.addEventListener('dragstart', this.dragStart);
      this.element.addEventListener('dragend', this.dragEnd);
   }

   renderContent(): void {
      this.element.querySelector('h2')!.textContent = this.project.titlte;
      this.element.querySelector('h3')!.textContent = this.project.people.toString(); //li
      this.element.querySelector('p')!.textContent = this.project.desc; //li
   }
}