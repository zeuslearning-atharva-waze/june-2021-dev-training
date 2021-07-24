import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  step: number;
  personalDetailsForm = new FormGroup({
    userDetails: new FormGroup({
      fname: new FormControl(''),
      lname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      mobileCountryCode: new FormControl(91),
      mobileNumber: new FormControl(),
      profilepicLink: new FormControl(''),
      file: new FormControl(''),
      resumeLink: new FormControl(''),
      portfolioUrl: new FormControl(''),
      referral: new FormControl(''),
      jobUpdatesViaEmail: new FormControl(''),

      formKeys: new FormGroup({
        IE: new FormControl(''),
        SE: new FormControl(''),
        SQE: new FormControl(''),
      }),

      jobPrefrences: new FormArray([]),
    }),
    qualifications: new FormGroup({
      aggPercent: new FormControl(''),
      yearOfPassing: new FormControl(''),
      qualification: new FormControl(''),
      stream: new FormControl(''),
      college: new FormControl(91),
      otherCollege: new FormControl(),

      collegeLocation: new FormControl(''),

      fresher: new FormGroup({
        fresherStack: new FormArray([]),
        otherFresherTech: new FormControl(''),
        prevApplicationRolefr: new FormControl(''),
      }),
      experienced: new FormGroup({
        yearsExp: new FormControl(0),
        currentCTC: new FormControl(0),
        expectedCTC: new FormControl(0),
        proFamStack: new FormArray([]),
        otherFamiliarTech: new FormControl(''),
        proExpStack: new FormArray([]),
        otherExpTech: new FormControl(''),
        noticePeriodEndDate: new FormControl(),
        noticePeriodInterval: new FormControl(),
        prevApplicationRoleEx: new FormControl(''),
      }),
    }),
  });
  userDetails = this.personalDetailsForm.get('userDetails') as FormGroup;

  constructor() {
    this.step = 1;
  }

  ngOnInit(): void {
    console.log(this.userDetails);
  }

  submit(val: string) {
    if (val === 'next') this.step = this.step + 1;
    if (val === 'prev') this.step = this.step - 1;
    console.log(this.step);
  }
}
