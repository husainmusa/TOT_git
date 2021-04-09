var passwordValidator = /** @class */ (function () {
    function passwordValidator() {
    }
    passwordValidator.MatchPassword = function (AC) {
        var newPassword = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('password_confirmation').value; // to get value in input tag
        if (newPassword != confirmPassword) {
            // console.log('false');
            AC.get('password_confirmation').setErrors({ MatchPassword: true });
        }
        else {
            // console.log('true')
            AC.get('password_confirmation').setErrors(null);
        }
    };
    return passwordValidator;
}());
export { passwordValidator };
//# sourceMappingURL=password.js.map