import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   auth :any= getAuth(app);
   provider:any = new GoogleAuthProvider();
  loginForm!: FormGroup;



  constructor(private fb: FormBuilder,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.loginForm.value);
  }

  async googleLogin()  {
    // Implement Google login logic here
   let result:any=  await signInWithPopup(this.auth, this.provider)
   let users = result.user;
  //  const token = await users.getIdToken();
        // .then((result) => {
        //   let user:any = result.user;
        //

        //   console.log("User Info:", user);
        //   alert(`Welcome ${user.displayName}`);
        // })
        // .catch((error) => {
        //   console.error("Error during Google Login", error);
        //   alert("Google Login failed. Please try again.");
        // });

        const user = result.user;

        // Retrieve the token

        // Store the token in localStorage
        localStorage.setItem('token', user.accessToken);
        console.log("User Info:", user);
        this.router.navigate(['/home']);
  }

  facebookLogin() {
    // Implement Facebook login logic here
    console.log('Facebook Login');
  }
}
