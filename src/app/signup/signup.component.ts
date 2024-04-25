import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  PatternValidator,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form: FormGroup;
  users: Array<Admin> = [];

  hidePassword = true;
  hideConfirmPassword = true;
  passwordTouched = false;
  showPasswordRequirements = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([

        Validators.required,

        CustomValidator.patternValidator(/\d/, { hasNumber: true }),

        CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true}),

        CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),

        // TODO: CHECK!!
        CustomValidator.patternValidator(/[@#$\^%&]/, { hasSpecialCharacters: true}),
        // /[!@#$%^&*()_+-=[\]{};':"|,.<>]/

        Validators.minLength(8)
      ]) 
    ],
      // [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]
      // contains(lower, upper, digit, symbol) and max length=20
      // TODO: make sure password not same as the mail id or username?
      
      confirmPassword: ['', Validators.compose([Validators.required])]
    },
    {
      validator: CustomValidator.passwordMatchValidator
    }
  );
  }

  ngOnInit() { }

  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onPasswordBlur() {
    this.passwordTouched = false;
  }

  // TODO: ADD PROPER VALIDATIONS
  // TODO: ADD AUTH GUARD LIKE LOGIN FORM
  async onSubmit() {
    if (this.form.valid) {
      var overlay = document.getElementById('overlay');
      overlay!.style.display = 'flex';

      console.log("Emailid: ", this.form.value.email);
      
      // TODO: if exists then tell exists, otherwise proceed with making the account
      this.dataService.adminExists(this.form.value.email).subscribe({
        next: response => {
          console.log("Sent to server", response);
          
          if(response){
            const { result } = response;
            console.log("Exists: ", result);
            
            if(result){
              const alert_message = document.getElementById("adminExists") as HTMLElement;

              overlay!.style.display = 'none';
              this.formReset(); // why giving all form field red!?
              // this.form.reset();

                alert_message.style.display = 'block';
                setTimeout(() => {
                  alert_message.style.display = 'none'; 
                }, 4000);
            } else{
              this.addAdmin();
            }
          }
        },
        error: (err)=>{
          console.log(err);
          // throw err?
        }        
      });      
    }
  }

  async addAdmin(){
    try {
      const encryptedPassword = await this.dataService.encryptPassword(
        this.form.value.password
      );

      if (typeof encryptedPassword !== 'string') {
        throw new Error('Failed to encrypt password');
      }

      const newData = new Admin(
        this.form.value.username,
        this.form.value.email,
        encryptedPassword
      );

      // TODO: PREVENT DOUBLE CLICK ON SUBMIT BUTTON WHILE THIS IS GETTING PROCESSED
      // TODO USE ASYNC AWAIT INSTEAD?
      this.dataService.addAdmin(newData).subscribe(
        (response) => {
          console.log('Admin added successfully!');
          sessionStorage.setItem('authenticated', this.form.value.email);

          this.form.reset();
          this.routeToDashboard();
        },
        (error) => {
          console.error('Error adding admin: ', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  routeToLoginPage(){
    this.router.navigate(['/login']);
  }

  formReset() {
    this.form.reset();
  }

  getPasswordError() {
    if (this.form.value.password.hasError('required')) {
      return 'Password is required.';
    }
    // return this.password.hasError('minLength') ? "Password should be at least 8 characters" : "";
    else {
      return 'Password should be at least 8 characters';
    }
  }
}

class Admin {
  constructor(
    public username: string = '',
    public email: string = '',
    public password: string = ''
  ) { }
}


class CustomValidator{

  // WHY STATIC
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value){
        // if control is empty
        // TODO: IS THIS NULL OR A LIST
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    }
  }


  // static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value;
  
  //     // Check if the control value is empty
  //     if (!value || value === '') {
  //       // Return null if the control value is empty
  //       return null;
  //     }
  
  //     // Check if the value matches the regex pattern
  //     const valid = regex.test(value);
  
  //     // If the value matches the pattern, return null (no error)
  //     // Otherwise, return the specified error object
  //     return valid ? null : error;
  //   };
  // }

  
  // static passwordMatchValidator(control: AbstractControl){
  //   const password: string = control.get('password')?.value;
  //   const confirmPassword: string = control.get('confirmPassword')?.value;

  //   if(password != confirmPassword){
  //     control.get('confirmPassword')?.setErrors({NoPasswordMatch: true}); 
  //   }
  // }

  static passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
  
    if(password != confirmPassword){
          group.get('confirmPassword')?.setErrors({NoPasswordMatch: true}); 
        }
    // return password === confirmPassword ? null : { NoPasswordMatch: true };
  }

//   static passwordMatchValidator(group: FormGroup) {
//     const password = group.get('password')?.value;
//     const confirmPassword = group.get('confirmPassword')?.value;

//     // Check if confirmPassword field is touched and value does not match the password
//     if (group.get('confirmPassword')?.touched && password !== confirmPassword) {
//         group.get('confirmPassword')?.setErrors({ NoPasswordMatch: true });
//     }
// }

  
}