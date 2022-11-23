var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('proj');
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    return ProjectInput;
}());
var prjInput = new ProjectInput();
