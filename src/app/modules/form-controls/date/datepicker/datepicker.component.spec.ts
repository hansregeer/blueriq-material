import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { FieldContainerComponent } from '@shared/field-container/field-container.component';
import { MaterialModule } from '../../../../material.module';
import { PresentationStylesNew } from '../../../PresentationStylesNew';
import { MomentTransformer } from '../moment-transformer';
import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DatepickerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent, FieldContainerComponent],
      providers: [BlueriqComponents.register([DatepickerComponent]), MomentTransformer],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.date().styles(PresentationStylesNew.MATERIAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a bq-element', () => {
    const bqElement = component.nativeElement.querySelector('bq-element');
    expect(bqElement).toBeTruthy();
  });

  it('should be disabled', () => {
    field.styles(PresentationStylesNew.DISABLED, PresentationStylesNew.MATERIAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be read only', () => {
    field.readonly();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });
});
