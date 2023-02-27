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
    date: Date;
}

class Errand {
    private _id: string;
    private _title: string;
    private _description: string;
    private _filed: boolean;
    private _check: boolean;
    private _date: Date;

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
    get date() {
        return this._date;
    }

    constructor(parms: ErrandCreateDTO) {
        this._id = randomUUID();
        this._title = parms.title;
        this._description = parms.description;
        this._filed = false;
        this._check = false;
        this._date = new Date();
    }

    handleProperties() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            filed: this._filed,
            check: this._check,
            date: this._date,
        };
    }

    updateErrand(parms: ErrandUpdateDTO) {
        if (parms.title) this._title = parms.title;

        if (parms.description) this._description = parms.description;

        this._filed = parms.filed ?? this._filed;

        this._check = parms.check ?? this._check;
    }

    // -- CREATE FROM DATA BASE
    static createErrandFromDataBase(params: ErrandDataBaseDTO): Errand {
        const errand = new Errand({
            title: params.title,
            description: params.description,
        });

        errand._id = params.id;
        errand._filed = params.filed;
        errand._check = params.check;
        errand._date = params.date;

        return errand;
    }
}

export { Errand, ErrandCreateDTO, ErrandUpdateDTO };
