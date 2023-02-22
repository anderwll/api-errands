import { randomUUID } from 'crypto';

interface ErrandDTO {
    title: string;
    description: string;
}

class Errand {
    private _id: string;
    private _title: string;
    private _description: string;
    private _filed: boolean;
    private _check: boolean;

    // -- GETERS
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get filed() {
        return this._filed;
    }
    get check() {
        return this._check;
    }

    constructor(parms: ErrandDTO) {
        this._id = randomUUID();
        this._title = parms.title;
        this._description = parms.description;
        this._filed = false;
        this._check = false;
    }

    handleProperties() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            filed: this._filed,
            check: this._check,
        };
    }
}

export { Errand, ErrandDTO };
