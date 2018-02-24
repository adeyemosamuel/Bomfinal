import { Injectable } from '@angular/core';
import { ControllerServiceProvider2 } from '../controller-service2/controller-service2';

@Injectable()
export class ValidateServiceProvider {
  errorMessage: string;

  constructor(private controller: ControllerServiceProvider2) {
    console.log('Hello ValidateService Provider');
  }

  validateBio(title, fn, mn, ln, gender, relStat, occup, dob): boolean {
    if (title == null || title == '') {
      this.errorMessage = 'Select a title';
      return false;
    }

    if (fn == null || fn == '') {
      this.errorMessage = 'First name is required';
      return false;
    }

    // if (mn == null) {
    //   this.errorMessage = 'Enter middle name';
    //   return false;
    // }

    if (ln == null || ln == '') {
      this.errorMessage = 'Enter last name';
      return false;
    }

    if (gender == null || gender == '') {
      this.errorMessage = 'Select gender';
      return false;
    }

    if (relStat == null || relStat == '') {
      this.errorMessage = 'Select marital status';
      return false;
    }

    if (occup == '' || occup == null) {
      this.errorMessage = 'Enter occupation';
      return false;
    }

    if (occup != '' && occup != null) {
      if (!isNaN(occup)) {
        this.errorMessage = 'Occupation cannot contain numbers';
        return false;
      }
    }

    if (dob == '' || dob == '') {
      this.errorMessage = 'Enter date of birth';
      return false;
    }

    if ((title == 'MR.' && gender == 'F') || (title == 'MRS.' && gender == 'M') || (title == 'MISS' && gender == 'M') || (title == 'MS.' && gender == 'M') || (title == 'MAST' && gender == 'F') || (title == 'SIR' && gender == 'F')) {
      this.errorMessage = 'TITLE and GENDER mismatch';
      return false;
    }

    return true;
  }

  validateDetails(bvn, phone, email, addr, ec, rm, prodCode, channel, penDoc, dob, state, acctBal) {
    if (bvn != '' && bvn != null) {
      if (isNaN(bvn)) {
        this.errorMessage = 'BVN is invalid';
        return false;
      }

      if (bvn.length < 11) {
        this.errorMessage = 'BVN cannot be less than 11 digits';
        return false
      }
    }

    if (phone == '' || phone == null) {
      this.errorMessage = 'Enter phone number';
      return false;
    }

    if (isNaN(phone)) {
      this.errorMessage = 'Invalid phone number';
      return false;
    }
    else if (phone.length < 11) {
      this.errorMessage = 'Phone number cannot be less than 11 digits';
      return false;
    }

    if (email != '' && email != null) {
      var atpos = email.indexOf('@');
      var dotpos = email.lastIndexOf('.');

      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        this.errorMessage = 'Invalid email';
        return false;
      }
    }

    if (addr == '' || addr == null) {
      this.errorMessage = 'Enter address';
      return false;
    }

    if (state == '' || state == null) {
      this.errorMessage = 'Select state';
      return false;
    }

    if (ec == '' || ec == null) {
      this.errorMessage = 'Select an EC';
      return false;
    }

    if (rm == '' || rm == null) {
      this.errorMessage = 'Select an RM';
      return false;
    }

    if (prodCode == '' || prodCode == null) {
      this.errorMessage = 'Select a product code';
      return false;
    }
    else {
      if ((prodCode == 'SBGEN 29050') && (this.getAge(dob) < 18)) {
        this.errorMessage = 'Selected product is not for a minor';
        return false;
      }
    }

    if (penDoc == '' || penDoc == null) {
      this.errorMessage = 'Pending document cannot be empty';
      return false;
    }

    // if (acctBal == '' || acctBal == null) {
    //   this.errorMessage = 'Enter opening amount';
    //   return false;
    // }
    // else if (isNaN(acctBal)) {
    //   this.errorMessage = 'Enter a valid amount';
    //   return false;
    // }

    var arrayLen = penDoc.length;
    var arrayVal = '';
    var arrayString = '';

    if (arrayLen > 1) {
      for (var value of penDoc) {
        arrayVal = `${value}`;
        if (arrayVal == 'NONE') {
          arrayString = arrayVal;
        }
      }
      if (arrayString == 'NONE') {
        this.errorMessage = 'Pending documents cannot be NONE plus any other document';
        return false;
      }
    }

    for (let value of penDoc) {
      arrayVal = `${value}`;
      if (arrayVal == 'BVN') {
        arrayString = arrayVal;
      }
    }

    if (arrayString == 'BVN' && bvn != '' && bvn != null) {
      this.errorMessage = 'BVN has been provided. Kindly remove from pending documents';
      return false;
    }
    else if (arrayString != 'BVN' && (bvn == '' || bvn == null)) {
      this.errorMessage = 'BVN not captured. Kindly select as part of pending documents';
      return false;
    }

    return true;
  }

  validateMoreDet(pob, maidenName, lga, stateorigin, nextKin, kinRel) {
    if (pob == '' || pob == null) {
      this.errorMessage = 'Enter Place of Birth';
      return false;
    }

    if (maidenName == '' || maidenName == null) {
      this.errorMessage = "Enter Mother's Maiden Name";
      return false;
    }

    if (stateorigin == '' || stateorigin == null) {
      this.errorMessage = 'Select State of Origin';
      return false;
    }

    if (lga == '' || lga == null) {
      this.errorMessage = 'Select a Local Government';
      return false;
    }

    if (nextKin == '' || nextKin == null) {
      this.errorMessage = 'Enter Next of Kin';
      return false;
    }

    if (kinRel == '' || kinRel == null) {
      this.errorMessage = 'Select Next of Kin Relationship';
      return false;
    }
    return true;
  }

  validateMandate(mandate, photo) {
    if (mandate == '' || mandate == null) {
      this.errorMessage = "Capture customer's signature";
      return false;
    }

    if (photo == '' || photo == null) {
      this.errorMessage = "Capture customer's image";
      return false;
    }
    return true;
  }

  getAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  displayMessage() {
    this.controller.toastCtrl(this.errorMessage, 'bottom', false);
  }

}