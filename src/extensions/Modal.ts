import { ModalType } from '../constants/interactions';

export class Modal {
    constructor(modalOptions: ModalType) {
        Object.assign(this, modalOptions);
    }
}
