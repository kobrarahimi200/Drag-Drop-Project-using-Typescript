
//project type
export enum projectStatus { Active, Finished }
   export class Project {
        constructor(public id: string,
            public titlte: string,
            public desc: string,
            public people: number,
            public status: projectStatus) { }
    }
    