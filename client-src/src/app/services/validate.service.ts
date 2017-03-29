import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateInput(user: any) {
    
    if(!user.email || !user.password) return false;

    return true;

  }

  validateEmail(email: any) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);

  }

  validateLogin(user: any) {
    
    if(!user.username || !user.password) return false;

    return true;

  }

}
