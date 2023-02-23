import { randomUUID } from 'crypto';

interface ErrandCreateDTO {
    title: string;
    description: string;
}

interface ErrandUpdateDTO {
    title: string;
    description: string;
    filed: boolean;
    check: boolean;
}

interface ErrandDataBaseDTO {
    id: string;
    title: string;
    description: string;
    filed: boolean;
    check: boolean;
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

    constructor(parms: ErrandCreateDTO) {
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

    updateErrand(parms: ErrandUpdateDTO) {
        if (parms.title) this._title = parms.title;

        if (parms.description) this._description = parms.description;

        if (parms.filed) this._filed = parms.filed;

        if (parms.check) this._check = parms.check;
    }

    static createErrandFromDataBase(params: ErrandDataBaseDTO) {
        const errand = new Errand({
            title: params.title,
            description: params.description,
        });

        errand._id = params.id;
        errand._filed = params.filed;
        errand._check = params.check;

        return errand;
    }
}

export { Errand, ErrandCreateDTO, ErrandUpdateDTO };
