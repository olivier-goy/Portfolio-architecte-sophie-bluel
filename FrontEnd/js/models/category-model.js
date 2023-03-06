export default class Category {

    id
    name

    constructor(categoryData) {
        this.id = categoryData.id
        this.name = categoryData.name
    }

    createFilterCategory() {
        const input = document.createElement('input');

        input.type = "button";
        input.classList = "filterInput";
        input.id = this.id;
        input.placeholder = this.name;
        input.value = this.name;

        return input;
    }

    createNewProjectCategory() {
        const option = document.createElement('option');

        option.value = this.id;
        option.id = "selectCategory"
        option.innerText = this.name;

        return option
    }
}