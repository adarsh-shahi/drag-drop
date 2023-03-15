interface Validatable {
	value: string | number;
	required: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

const validateInput = (validatableInput: Validatable) => {
	let isValid = true;
	if (validatableInput.required) {
		isValid = isValid && validatableInput.value.toString().trim().length !== 0;
	}
	if (
		validatableInput.minLength != null &&
		typeof validatableInput.value === "string"
	) {
		isValid =
			isValid && validatableInput.value.length >= validatableInput.minLength;
	}
	if (
		validatableInput.maxLength != null &&
		typeof validatableInput.value === "string"
	) {
		isValid =
			isValid && validatableInput.value.length <= validatableInput.maxLength;
	}
	if (
		validatableInput.min != null &&
		typeof validatableInput.value === "number"
	) {
		isValid = isValid && validatableInput.value >= validatableInput.min;
	}
	if (
		validatableInput.max != null &&
		typeof validatableInput.value === "number"
	) {
		isValid = isValid && validatableInput.value <= validatableInput.max;
	}
	return isValid;
};

// ProjectList Class

class ProjectList {
   
}

// ProjectInput Class
class ProjectInput {
	private templateElement: HTMLTemplateElement;
	private hostElement: HTMLDivElement;
	private element: HTMLFormElement;
	private titleInputElement: HTMLInputElement;
	private descriptionElement: HTMLInputElement;
	private peopleInputElement: HTMLInputElement;

	constructor(templateId: string, hostId: string) {
		this.templateElement = document.getElementById(
			templateId
		)! as HTMLTemplateElement;
		this.hostElement = document.getElementById(hostId)! as HTMLDivElement;

		const importNode = document.importNode(this.templateElement.content, true);
		this.element = importNode.firstElementChild as HTMLFormElement;
		this.element.id = "user-input";

		this.titleInputElement = this.element.querySelector(
			"#title"
		) as HTMLInputElement;
		this.descriptionElement = this.element.querySelector(
			"#description"
		) as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector(
			"#people"
		) as HTMLInputElement;

		this.configure();
		this.render();
	}
	private clearInput() {
		this.titleInputElement.value = "";
		this.descriptionElement.value = "";
		this.peopleInputElement.value = "";
	}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionElement.value;
		const enteredPeople = +this.peopleInputElement.value;

		const titleValidatable: Validatable = {
			value: enteredTitle,
			required: true,
		};
		const descriptionValidatable: Validatable = {
			value: enteredDescription,
			required: true,
			minLength: 5,
		};
		const peopleValidatable: Validatable = {
			value: enteredPeople,
			required: true,
			min: 1,
			max: 5,
		};

		const isValid =
			validateInput(titleValidatable) &&
			validateInput(descriptionValidatable) &&
			validateInput(peopleValidatable);

		if (isValid) return [enteredTitle, enteredDescription, enteredPeople];
		else {
			alert("invalid input");
			return;
		}
	}

	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;
			console.log(title, description, people);
			this.clearInput();
		}
	}

	private configure() {
		this.element.addEventListener("submit", this.submitHandler.bind(this));
	}

	private render() {
		// this.hostElement.appendChild(this.templateElement.content);
		this.hostElement.insertAdjacentElement("afterbegin", this.element);
	}
}

const projectInput = new ProjectInput("project-input", "app");
