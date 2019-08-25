import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {UserModel} from "../models/user.model";
import {map} from "rxjs/operators";
import {BaseApi} from "../core/base-api";


@Injectable({
    providedIn: 'root'
})
export class UsersService extends BaseApi{

    constructor(public http: HttpClient){
        super(http);
    }

    getUserByEmail(email: string){
        /*return this.http.get(`http://localhost:3000/users?email=${email}`).pipe(
            map((user: UserModel) => user[0] ? user[0] : undefined)
        );*/
        return this.get(`users?email=${email}`).pipe(
            map((user: UserModel) => user[0] ? user[0] : undefined)
        )

    }

    createNewUser(user: UserModel){
        //return this.http.post('http://localhost:3000/users', user);
        return this.post('users', user);
    }

}