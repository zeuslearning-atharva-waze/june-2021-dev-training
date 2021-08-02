import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserService } from '../../../app/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  step: number;
  jobs: any;
  techstack: any;
  isfresher: boolean;
  registerdata: any = {};
  clicked: boolean = false;
  personalDetailsForm = new FormGroup({
    userDetails: new FormGroup({
      fname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      mobileCountryCode: new FormControl(91, [Validators.required]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ]),
      profilepicLink: new FormControl(''),
      file: new FormControl(''),
      resumeLink: new FormControl('', [Validators.required]),
      portfolioUrl: new FormControl(''),
      referral: new FormControl(''),
      jobUpdatesViaEmail: new FormControl(0),

      formKeys: new FormGroup({
        J1: new FormControl(''),
        J2: new FormControl(''),
        J3: new FormControl(''),
      }),

      jobPrefrences: new FormArray(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
    }),
    qualifications: new FormGroup({
      aggPercent: new FormControl('', [Validators.required]),
      yearOfPassing: new FormControl('', [Validators.required]),
      qualification: new FormControl('', [Validators.required]),
      stream: new FormControl('', [Validators.required]),
      college: new FormControl('', [Validators.required]),
      otherCollege: new FormControl(''),

      collegeLocation: new FormControl('', [Validators.required]),

      fresher: new FormGroup({
        fresherStack: new FormArray([], [Validators.min(1)]),
        otherFresherTech: new FormControl(''),
        prevApplicationRolefr: new FormControl(''),
        freshkeys: new FormGroup({
          T1: new FormControl(''),
          T2: new FormControl(''),
          T3: new FormControl(''),
          T4: new FormControl(''),
          T5: new FormControl(''),
        }),
      }),
      experienced: new FormGroup({
        yearsExp: new FormControl(0, [Validators.required]),
        currentCTC: new FormControl(0, [Validators.required]),
        expectedCTC: new FormControl(0, [Validators.required]),
        proFamStack: new FormArray([]),
        otherFamiliarTech: new FormControl(''),
        proExpStack: new FormArray([]),
        otherExpTech: new FormControl(''),
        noticePeriodEndDate: new FormControl(''),
        noticePeriodInterval: new FormControl(''),
        prevApplicationRoleEx: new FormControl(''),
        expertkeys: new FormGroup({
          T1: new FormControl(''),
          T2: new FormControl(''),
          T3: new FormControl(''),
          T4: new FormControl(''),
          T5: new FormControl(''),
        }),
        famkeys: new FormGroup({
          T1: new FormControl(''),
          T2: new FormControl(''),
          T3: new FormControl(''),
          T4: new FormControl(''),
          T5: new FormControl(''),
        }),
      }),
    }),
  });
  userDetails = this.personalDetailsForm.get('userDetails') as FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.step = this.userService.step;
    this.isfresher = this.userService.isfresher;
  }

  ngOnInit(): void {
    //console.log(this.userDetails);
    this.userService.getoptions().subscribe((res: any) => {
      this.jobs = res.jobs;
      this.techstack = res.tech;
      //console.log(res);
    });
  }

  setfresher(f: any) {
    this.isfresher = f;
  }

  submit(val: string) {
    if (
      this.personalDetailsForm.controls.userDetails.invalid &&
      this.step === 1
    ) {
      return;
    }
    if (
      this.personalDetailsForm.controls.qualifications.invalid &&
      this.step === 2
    ) {
      return;
    }

    if (val === 'next') this.step = this.step + 1;
    if (val === 'prev') this.step = this.step - 1;
    this.userService.step = this.step;
  }

  progressStep(steps: number) {
    if (this.personalDetailsForm.controls.userDetails.invalid && steps === 2) {
      //console.log('pd reject');
      return;
    }
    if (
      this.personalDetailsForm.controls.qualifications.invalid &&
      steps === 3
    ) {
      //console.log('q reject');
      return;
    }

    this.step = steps;
  }

  editing(stedit: number) {
    this.step = stedit;
  }

  submitForm() {
    this.clicked = true;
    let userform = this.personalDetailsForm.get('userDetails') as FormGroup;
    userform.removeControl('file');
    let qual = this.personalDetailsForm.get('qualifications') as FormGroup;
    userform.removeControl('formKeys');
    this.registerdata.userDetails = userform.value;
    let job = '';
    this.registerdata.userDetails.jobPrefrences.forEach((element: any) => {
      job += `${element},`;
    });
    job = job.replace(/,\s*$/, '');
    this.registerdata.userDetails.jobPrefrences = job;
    //console.log(this.registerdata);
    if (this.isfresher) {
      this.registerdata.userDetails.usertype = 'fresher';
      let fresh = qual.get('fresher') as FormGroup;
      fresh.removeControl('freshkeys');
      qual.removeControl('fresher');
      qual.removeControl('experienced');
      this.registerdata.qualifications = qual.value;
      this.registerdata.fresher = fresh.value;
      let jobstring = '';
      this.registerdata.fresher.fresherStack.forEach((element: any) => {
        jobstring += `${element},`;
      });
      jobstring = jobstring.replace(/,\s*$/, '');
      this.registerdata.fresher.fresherStack = jobstring;
    } else {
      this.registerdata.userDetails.usertype = 'expert';
      let expert = qual.get('experienced') as FormGroup;
      expert.removeControl('expertkeys');
      expert.removeControl('famkeys');
      qual.removeControl('fresher');
      qual.removeControl('experienced');
      this.registerdata.qualifications = qual.value;
      this.registerdata.experienced = expert.value;
      let jobstring = '';
      this.registerdata.experienced.proExpStack.forEach((element: any) => {
        jobstring += `${element},`;
      });
      jobstring = jobstring.replace(/,\s*$/, '');
      this.registerdata.experienced.proExpStack = jobstring;
      jobstring = '';
      this.registerdata.experienced.proFamStack.forEach((element: any) => {
        jobstring += `${element},`;
      });
      jobstring = jobstring.replace(/,\s*$/, '');
      this.registerdata.experienced.proFamStack = jobstring;
      jobstring = '';
    }
    // this.Tech.value.forEach((element: any) => {
    //   this.jobids += `${element},`;
    // });
    // this.jobids = this.jobids.replace(/,\s*$/, '');
    //console.log(this.registerdata);
    this.userService.register(this.registerdata).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/login']);
      }
    });
  }
}

// {
//   "userDetails":{
//   "fname":"Smita",
//   "lname":"Waze",
//   "email":"smita@gmail.com",
//   "password":"smita12",
//   "phone":"91-9930993275",
//   "resumelink":"smita.com",
//   "portfolio":"smita.com",
//   "referral":"Atharva",
//   "jobupdates":true,
//   "profilepic":"smitapic",
//   "prefrences":"1,2",
//   "utype":"fresher"
//   },
//   "qualifications":{
//       "aggpercent":90,
//       "yearofpassing":"2019",
//       "degree":"btech",
//       "stream":"engineering",
//       "college":"bvcoe",
//       "collegeloc":"Mumbai",

//   },
//   "fresher":{
//       "prevapprole":"",
//       "freshertechpref":"1,2",
//       "othertech":""
//   },
//   "experienced":{
//       "yearsofex":2,
//       "currctc":400000,
//       "expectc":500000,
//       "noticeperiodend":"28/8/2021",
//       "noticeperiodduration":1,
//       "prevapplicationrole":"",
//       "otherextech":"",
//       "otherfamtech":"",
//       "expertpref":"1,2",
//       "fampref":"3,4"
//   }

// }
