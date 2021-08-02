import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { onErrorResumeNext } from 'rxjs';
import { UserService } from '../../../app/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  form: FormGroup;
  userDetailsform: FormGroup;
  perror: boolean = false;
  @Input() imageShow: string = '../../../assets/icons/dprofile.png';
  @Input() isreadOnly: boolean;
  @Input() formGroupName: string;
  @Input() jobs: any;
  imageset: boolean = false;
  image: any;
  filename: any;
  pdferror: boolean = false;
  fileerror: boolean = false;
  skills = new FormArray([]);

  get f() {
    return this.userDetailsform.controls;
  }

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
    //console.log(this.skills);
    if (this.skills.length === 0) this.perror = true;
    if (this.skills.length > 0) this.perror = false;
    //console.log(this.userDetailsform);
    this.userDetailsform.setControl('jobPrefrences', this.skills);
  }

  file: any = '';
  onFileChanged(e: any) {
    console.log(e.target.files[0]);
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
      let fakepath = 'fileserviceurl/' + e.target.files[0].name;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageShow = reader.result as string;
        //console.log('image', this.imageset);
        this.userService.setpic(this.imageShow);
        //localStorage.setItem('pic', this.imageShow);
        this.userDetailsform.patchValue({
          file: reader.result,
        });
        this.userDetailsform.patchValue({
          profilepicLink: fakepath,
        });
      };
    }
  }
  resumee(e: any) {
    this.image = e.target.files[0];
    let filename = this.image.name;
    let ext = filename.substring(filename.lastIndexOf('.') + 1);
    if (ext !== 'pdf') {
      this.pdferror = true;
      this.image = undefined;
      return;
    } else {
      this.pdferror = false;
      this.fileerror = false;
      this.filename = filename;
      this.userService.resume = filename;
    }
    let fakepath = 'resumeserviceurl/' + filename;
    this.userDetailsform.patchValue({
      resumeLink: fakepath,
    });
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
    this.imageShow = this.userService.profilepic;
    this.filename = this.userService.resume;
  }
}
