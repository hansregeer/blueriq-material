import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../material.module';

import { ChiplistComponent } from './chiplist.component';

fdescribe('ChiplistComponent', () => {
  let fieldTemplate: FieldTemplate;
  let component: ChiplistComponent;
  let fixture: ComponentFixture<ChiplistComponent>;
  let session: BlueriqTestSession;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiplistComponent],
      providers: [BlueriqComponents.register([ChiplistComponent])],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  });

  describe('ChipList text', () => {

    beforeEach(() => {
      fieldTemplate = FieldTemplate.text('colour').value(['Red', 'Green', 'Blue']);
      session = BlueriqSessionTemplate.create().build(fieldTemplate);
      fixture = session.get(ChiplistComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component.values.length).toBe(3);
      expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(3);
    });

    it('should add a chip', (() => {
      const input = fixture.nativeElement.querySelector('.mat-input-element');
      expect(input).toBeTruthy();

      if (input) {
        input.value = 'Yellow';
        input.dispatchEvent(new Event('blur'));

        fixture.detectChanges();
        expect(component.values.length).toBe(4);
        expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(4);
        expect(input.value).toBe('');
      }
    }));

    it('should not add an existing chip case insensitive', () => {
      const input = fixture.nativeElement.querySelector('.mat-input-element');
      expect(input).toBeTruthy();

      if (input) {
        input.value = 'red';
        input.dispatchEvent(new Event('blur'));

        fixture.detectChanges();
        expect(component.values.length).toBe(3);
        expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(3);
      }
    });

  });
});
