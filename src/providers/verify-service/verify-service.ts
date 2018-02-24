import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class VerifyServiceProvider {
  errorMessage: string;

  constructor(public http: Http) {
    console.log('Hello VerifyServiceProvider Provider');
  }

  verifyRegisterLeads(name, occupation, dob, gender, marital_status, phonenumber, emailaddress, address): boolean {
    if (name == null || name == '') {
      this.errorMessage = 'Name is required'; 
      return false;
    }

    if (occupation == null || occupation == '') {
      this.errorMessage = 'Fill in the occupation';
      return false;
    }

    if (phonenumber == '' || phonenumber == null) {
      this.errorMessage = 'Enter phone number';
      return false;
    }

    if (address == '' || address == null) {
      this.errorMessage = 'Address is required';
      return false;
    }

    if (emailaddress == '' || emailaddress == null) {
      this.errorMessage = 'Enter a valid e-mail address';
      return false;
    }

    if (marital_status == '' || marital_status == null) {
      this.errorMessage = 'Select Marital Status';
      return false;
    }

    if (gender == '' || gender == null) {
      this.errorMessage = 'Select a gender';
      return false;
    }

    if (dob == '' || dob == null) {
      this.errorMessage = 'Date of birth is required';
      return false;
    }
    return true;
  }



}
