import { ButtonType } from "../constants/interactions";

export class Button {
    constructor(buttonOptions: ButtonType) {
        Object.assign(this, buttonOptions);
    }
}