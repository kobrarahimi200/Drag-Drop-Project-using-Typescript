import {Project,projectStatus} from "./project.js";

    type Listener<T> = (items: T[]) => void;

    class State<T>{ //we can forward our own type to this class and replcae it with T

        protected listeners: Listener<T>[] = [];
    
        addListeners(listnenrFn: Listener<T>) {
            this.listeners.push(listnenrFn);
        }
    }
    
    //project state management
    export class ProjectState extends State<Project>{
        private projects: Project[] = [];
        private static instance: ProjectState;
    
        private constructor() { super();}
        static getInstance() {
            if (this.instance) {
                console.log('instance state');
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }

        addProject(title: string, description: string, numOfPeople: number) {
            const newProject = new Project(
                Math.random().toString(),
                title,
                description,
                numOfPeople,
                projectStatus.Active,
            );  
                if (!this.projects.includes(newProject)){
                    this.projects.push(newProject);
                } 
            this.updateListeners();
           
        }
        moveProject(id:string, newStatus: projectStatus){

            const project = this.projects.find(prj => prj.id === id);
            if(project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        private updateListeners(){
            for (const listnenrFn of this.listeners) {
                listnenrFn(this.projects.slice());
            }
        }
    }
    export const projectstate = ProjectState.getInstance();
