import {Component, HostBinding, OnInit} from "@angular/core";
import {fadeStateTrigger} from "../shared/animations/fade.animation";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit{

    @HostBinding('@fade') anim = true;



    constructor(){

    }

    ngOnInit(){

    }


}