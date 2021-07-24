import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { UserService } from '../../../app/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  form: FormGroup;
  userDetailsform: FormGroup;
  @Input() imageShow: any = '../../../assets/icons/dprofile.png';
  @Input() isreadOnly: boolean;
  @Input() formGroupName: string;
  imageset: boolean = false;
  jobPreferenceData: Array<any> = [
    {
      name: 'Instructional Engineer',
      value: 'Instructional Engineer',
      key: 'IE',
    },
    { name: 'Software Engineer', value: 'Software Engineer', key: 'SE' },
    {
      name: 'Software Quality Engineer',
      value: 'Software Quality Engineer',
      key: 'SQE',
    },
  ];
  skills = new FormArray([]);

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.skills.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.skills.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.skills.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.skills);
    console.log(this.userDetailsform);
    this.userDetailsform.setControl('jobPrefrences', this.skills);
  }

  file: any = '';
  onFileChanged(e: any) {
    // this.file = event.target.files[0];
    // console.log(event);
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event) => {
    //   this.imageShow = (<FileReader>event.target).result;
    //   // this.userDetailsform.setControl('profilepicLink', this.imageShow);
    //   console.log(this.imageShow);
    // };

    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageShow = reader.result as string;
        //console.log('image', this.imageset);
        this.userService.setpic(this.imageShow);
        //localStorage.setItem('pic', this.imageShow);
        this.userDetailsform.patchValue({
          profilepicLink: reader.result,
        });
      };
    }
  }

  constructor(
    private rootFormGroup: FormGroupDirective,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    this.userDetailsform = this.rootFormGroup.control.get(
      'userDetails'
    ) as FormGroup;
  }
}
