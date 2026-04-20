import { FormGroup } from '@angular/forms';

export function hasValidationErrors(form: FormGroup, controlName: string): boolean {
    const control = form.controls[controlName];
    return control?.invalid && (control?.touched || control?.dirty);
}