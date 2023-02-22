import { randomUUID } from 'crypto';
import { Errand } from './errand.model';

enum TypeAccount {
    GUYS = 'GUYS',
    BUSINESS = 'BUSINESS',
}

interface UserCreateDTO {
    name: string;
    email: string;
    password: string;
    typeAccount: TypeAccount;
}

interface UserUpdateDTO {
    name: string;
    password: string;
    darkMode: boolean;
    typeAccount: TypeAccount;
}

interface UserDataBaseDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    darkMode: boolean;
    typeAccount: TypeAccount;
    errands: Array<Errand>;
}

class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private _darkMode: boolean;
    private _typeAccount: TypeAccount;
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
    get typeAccount() {
        return this._typeAccount;
    }
    get errands() {
        return [...this._errands];
    }

    constructor(parms: UserCreateDTO) {
        this._id = randomUUID();
        this._name = parms.name;
        this._email = parms.email;
        this._password = parms.password;
        this._darkMode = false;
        this._typeAccount = parms.typeAccount;
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
            typeAccount: this._typeAccount,
            errands: this._errands,
        };
    }

    updateUser(parms: UserUpdateDTO) {
        if (parms.name) this._name = parms.name;

        if (parms.password) this._password = parms.password;

        if (parms.darkMode) this._darkMode = parms.darkMode;

        if (parms.typeAccount) this._typeAccount = parms.typeAccount;
    }

    // -- CREATE FROM DATA BASE
    static createFromDataBase(parms: UserDataBaseDTO) {
        const newUser = new User({
            name: parms.name,
            email: parms.email,
            password: parms.password,
            typeAccount: parms.typeAccount,
        });

        newUser._id = parms.id;
        newUser._darkMode = parms.darkMode;
        newUser._errands = parms.errands;

        return newUser;
    }
}

export { User, UserCreateDTO, UserUpdateDTO, TypeAccount, UserDataBaseDTO };
