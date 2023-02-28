import fs from 'fs';
import { User } from '../models';

const path = `db.json`;

function handleUsersDataBase(): Array<User> {
    const contentBuffer = fs.readFileSync(path);

    const listUsersJSON = JSON.parse(contentBuffer.toString()) as Array<User>;

    return listUsersJSON.map((user) => User.createFromDataBase(user));
}

function saveUsersDataBase(list: Array<User>) {
    fs.writeFileSync(path, JSON.stringify(list.map((user) => user.handleProperties())));
}

export { handleUsersDataBase, saveUsersDataBase };
