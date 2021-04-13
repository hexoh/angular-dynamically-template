import { Directive, OnDestroy, OnInit } from '@angular/core';

class User {
    id: number;
    firstName: string;
    lastName: string;
    constructor(values?: any) {
        if (values) {
            Object.assign(this, values);
        }
    }
}

// This is a hotfix, please see
// https://stackoverflow.com/questions/60116361/angular-9-basecomponent-with-injectable
// https://github.com/angular/angular/issues/35367#issuecomment-585136872
@Directive() 
export class UserComponent implements OnInit, OnDestroy {

    //  Public Properties
    showText = false
    user: User;
    constructor() {
    }

    //  Life Cycle Hooks
    ngOnInit() {
    }

    ngOnDestroy() {
        console.log('Dynamic Component OnDestroy');
    }
}