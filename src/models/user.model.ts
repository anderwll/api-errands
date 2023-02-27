import { randomUUID } from 'crypto';
import { Errand } from './errand.model';

interface UserCreateDTO {
    name: string;
    email: string;
    password: string;
}

interface UserUpdateDTO {
    name: string;
    password: string;
    darkMode: boolean;
}

interface UserDataBaseDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    darkMode: boolean;
    errands: Array<Errand>;
}

class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private _darkMode: boolean;
    private _errands: Array<Errand>;

    // -- GETERS
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get darkMode() {
        return this._darkMode;
    }
    get errands() {
        return this._errands;
    }

    constructor(parms: UserCreateDTO) {
        this._id = randomUUID();
        this._name = parms.name;
        this._email = parms.email;
        this._password = parms.password;
        this._darkMode = false;
        this._errands = [];
    }

    // -- METHODS
    handleProperties() {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            password: this._password,
            darkMode: this._darkMode,
            errands: this._errands,
        };
    }

    updateUser(parms: UserUpdateDTO) {
        if (parms.name) this._name = parms.name;

        if (parms.password) this._password = parms.password;

        this._darkMode = parms.darkMode ?? this._darkMode;
    }

    // -- CREATE FROM DATA BASE
    static createFromDataBase(parms: UserDataBaseDTO) {
        const user = new User({
            name: parms.name,
            email: parms.email,
            password: parms.password,
        });

        user._id = parms.id;
        user._darkMode = parms.darkMode;
        user._errands = parms.errands;
        //user._errands = parms.errands.map((errand) => Errand.createErrandFromDataBase(errand));

        return user;
    }
}

export { User, UserCreateDTO, UserUpdateDTO, UserDataBaseDTO };
