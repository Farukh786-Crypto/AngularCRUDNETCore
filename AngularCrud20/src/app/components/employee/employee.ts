import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { EmployeeMst } from '../../models/EmployeeMst';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasValidationErrors } from '../../services/form-utils';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  // initialization
  EmpList = signal<EmployeeMst[]>([]);
  EmpForm!: FormGroup;
  isSubmit: string = 'Add';
  empId: Number = 0;
  issidePanelOpen: WritableSignal<boolean> = signal(false);

  // inject service
  private httpService = inject(HttpService);
  private fb = inject(FormBuilder);

  constructor() { }

  ngOnInit(): void {
    this.initialEmployeeForm();
    this.getemployeeList();
  }

  initialEmployeeForm() {
    this.EmpForm = this.fb.group({
      empId: new FormControl({ value: 0, disabled: true }),
      empName: new FormControl('', [Validators.required]),
      empEmail: new FormControl('', [Validators.required]),
      empPassword: new FormControl('', [Validators.required])
    })
  }

  hasEmployeeFormErrors(controlName: string): boolean {
    return hasValidationErrors(this.EmpForm, controlName);
  }

  getemployeeList() {
    this.httpService.getEmployees().subscribe({
      next: (res: any) => {
        if (res) {
          this.EmpList.set(res);
          console.log(res);
        }
      },
      error: (err: unknown) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request completed');
      }
    });

  }

  enabledEmpIdControl(isEdit: boolean) {
    if (isEdit) {
      this.EmpForm.get('empId')?.enable();
    } else {
      this.EmpForm.get('empId')?.disable();
    }
  }

  AddEmployee(employee: EmployeeMst) {
    this.issidePanelOpen.set(true);
    this.isSubmit = 'Add';
    //this.EmpForm.reset();
    this.enabledEmpIdControl(false);
    this.httpService.addEmployee(employee).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
        }
      },
      error: (err: unknown) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request completed');
        // call get api again to get updated employee list
        this.getemployeeList();
      }
    });
  }

  submitEmployeeForm() {
    if (this.EmpForm.invalid) {
      return this.EmpForm.markAllAsTouched();
    }
    //console.log("EmpForm", this.EmpForm.value);

    // save employee post api call here
    if (this.isSubmit === 'Add') {
      //this.isSubmit = 'Add';
      this.AddEmployee(this.EmpForm.value);
    } else if (this.isSubmit === 'Update') {
      // getRawValue() looks at the internal state of all controls,
      //let empId = this.EmpForm.get('empId')?.value;
      this.updateEmployee(this.EmpForm.getRawValue());
    }
    // reset form after submit
    this.EmpForm.reset();
    this.isSubmit = 'Add';
  }

  editEmployee(empForm: EmployeeMst) {
    this.isSubmit = 'Update';
    this.issidePanelOpen.set(true);
    //this.enabledEmpIdControl(false);
    this.EmpForm.patchValue(empForm);
    this.updateEmployee(empForm);
  }

  updateEmployee(employee: EmployeeMst) {
    this.httpService.updateEmployee(employee).subscribe({
      next: (res: any) => {
        if (res) {

          console.log(res);
        }
      },
      error: (err: unknown) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request completed');
        // get employee list again after update employee
        this.getemployeeList();
      }
    });
  }

  deleteEmployee(empId: number) {
    this.issidePanelOpen.set(true);
    this.httpService.deleteEmployee(empId).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
        }
      },
      error: (err: unknown) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request completed');
        this.issidePanelOpen.set(false);
        // get employee list again after delete employee
        this.getemployeeList();
      }
    })
  }

  AddNewEmployee() {
    debugger
    this.issidePanelOpen.set(true);
  }

}
