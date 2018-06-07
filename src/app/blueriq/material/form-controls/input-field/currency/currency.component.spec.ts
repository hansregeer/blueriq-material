import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material/material.module';

import { CurrencyFieldComponent } from './currency.component';

describe('CurrencyFieldComponent', () => {
  let field;
  let component;
  let session;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([CurrencyFieldComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqModule.forRoot(),
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CurrencyFieldComponent);
    field = FieldTemplate.text();
  });

  it('should create CurrencyFieldComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain euro sign', () => {
    const suffix = component.nativeElement.querySelector('mat-form-field').innerHTML;
    expect(suffix).toContain('matprefix');
  });
});
