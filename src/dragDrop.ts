// //used for every item 
export interface Draggable{
dragStart(event:DragEvent):void;
dragEnd(event:DragEvent):void;
}
//project list the drag target
export interface DragTarget{
    dragOver(event:DragEvent):void;
    drop(event:DragEvent):void;
    dragLeave(event:DragEvent):void;
}

export class DragDrop {
    constructor(){}
}