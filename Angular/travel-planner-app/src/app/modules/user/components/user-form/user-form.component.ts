import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexProviderService } from 'src/app/core/services/regex-provider/regex-provider.service';
import { ValidationErrorMessageProviderService } from 'src/app/core/services/validation-error-messages-provider/validation-error-message-provider.service';
import { FormInputTypesProviderService } from 'src/app/shared/services/form-input-types-provider/form-input-types-provider.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = 'account_circle';
  @Input() buttonText: string = '';
  @Input() routerLinkValue: string = '';
  @Input() routerText: string = '';

  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private regexProvider: RegexProviderService,
    public validationErrorMessagesProvider: ValidationErrorMessageProviderService,
    public formInputTypesProvider: FormInputTypesProviderService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            this.regexProvider.onlyOneCapitalOneLowercaseLetterAndOneNumber
          ),
        ],
      ],
    });
  }
}
