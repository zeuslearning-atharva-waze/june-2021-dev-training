import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss'],
})
export class QualificationsComponent implements OnInit {
  form: FormGroup;
  qualificationsform: FormGroup;
  fresherQualifications: FormGroup;
  expQualifications: FormGroup;
  @Input() isreadOnly: boolean;
  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;

    this.qualificationsform = this.rootFormGroup.control.get(
      'qualifications'
    ) as FormGroup;
    this.fresherQualifications = this.qualificationsform.get(
      'fresher'
    ) as FormGroup;

    this.expQualifications = this.qualificationsform.get(
      'experienced'
    ) as FormGroup;
  }
  skillsData: Array<any> = [
    { name: 'Javascript', value: 'Javascript' },
    { name: 'Angular Js', value: 'Angular Js' },
    { name: 'React', value: 'React' },
    { name: 'Node JS', value: 'Node JS' },
    { name: 'Others', value: 'Others' },
  ];
  fresher: boolean = true;

  fresherTech = new FormArray([]);
  proExperience = new FormArray([]);
  proFamiliar = new FormArray([]);
  array: any = this.fresherTech;
  // QualificationsForm = new FormGroup({
  //   educational: new FormGroup({
  //     aggPercent: new FormControl(''),
  //     yearOfPassing: new FormControl(''),
  //     qualification: new FormControl(''),
  //     stream: new FormControl(''),
  //     college: new FormControl(91),
  //     otherCollege: new FormControl(),

  //     collegeLocation: new FormControl(''),
  //   }),

  //   fresher: new FormGroup({
  //     fresherTechStack: this.fresherTech,
  //     otherTech: new FormControl(''),

  //     prevApplicationRole: new FormControl(),
  //   }),
  //   experienced: new FormGroup({
  //     yearsExp: new FormControl(0),
  //     currentCTC: new FormControl(0),
  //     expectedCTC: new FormControl(0),
  //     familiarTechStack: this.proFamiliar,
  //     otherFamiliarTech: new FormControl(''),
  //     expTechStack: this.proExperience,
  //     otherExpTech: new FormControl(''),
  //     noticePeriodEndDate: new FormControl(),
  //     noticePeriodInterval: new FormControl(),
  //     prevApplicationRole: new FormControl(),
  //   }),
  // });

  ProSectionToggler() {
    this.fresher = !this.fresher;
    console.log(this.fresher);
  }
  onCheckboxChange(e: any, section: string) {
    if (section == 'fresher') {
      this.array = this.fresherTech;
    }
    if (section == 'proExp') {
      this.array = this.proExperience;
    }
    if (section == 'proFam') {
      this.array = this.proFamiliar;
    }
    if (e.target.checked) {
      this.array.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.array.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.array.removeAt(i);
          return;
        }
        i++;
      });
    }
    if (section == 'fresher') {
      this.fresherQualifications.setControl('fresherStack', this.array);
    }
    if (section == 'proExp') {
      this.expQualifications.setControl('proExpStack', this.array);
    }
    if (section == 'proFam') {
      this.expQualifications.setControl('proFamStack', this.array);
    }
  }
}
