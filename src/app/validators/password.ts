import { FormGroup,FormControl,AbstractControl } from '@angular/forms';


export class passwordValidator {

    constructor() {}
    
    static MatchPassword(AC: AbstractControl) {
       const newPassword = AC.get('password').value // to get value in input tag
       const confirmPassword = AC.get('password_confirmation').value // to get value in input tag
        if(newPassword != confirmPassword) {
            // console.log('false');
            AC.get('password_confirmation').setErrors( { MatchPassword: true } )
        } else {
            // console.log('true')
            AC.get('password_confirmation').setErrors(null);
        }
    }

}