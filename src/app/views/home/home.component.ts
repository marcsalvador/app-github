import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constants';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  public formGroup: FormGroup;
  public formRequest: any = {};

  ngOnInit(): void {
    this.parent.org = null;
    this.parent.members = null;
    this.parent.languages = null;

    this.formGroup = this.formBuilder.group({
      organizationName: new FormControl({ value: '' }, Validators.required),
    });
    this.formRequest.organizationName = '';
    this.formGroup.patchValue(this.formRequest);
    this.parent.org = null;
  }

  submit(): void {
    const model = this.formGroup.getRawValue();
    if (!this.formGroup.valid) {
      if (this.parent.stringService.IsEmpty(model.organizationName)) {
        this.messageService.error('Organization Name is required.');
        return;
      }
      else {
        this.messageService.error('Please Fill up required Fields.');
        return;
      }
    }

    this.gitHubService.getOrganization(model.organizationName)
      .subscribe(
        data => {
          this.parent.org = data;
          this.parent.storageService.setItem(AppConstants.Organization, btoa(model.organizationName));
          this.router.navigate(['orgs', model.organizationName]);
        },
        error => {
          if (error === 'Not Found') { error = model.organizationName + ' ' + error; }
          this.messageService.error(error);
        }
      );
  }
}
