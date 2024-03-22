import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {
  
  confirmationModalVisible: boolean = false;
  // Custom validator for employeeId
  validateEmployeeId(control: AbstractControl): ValidationErrors | null {
    if (!/^[a-zA-Z0-9]{6}$/.test(control.value)) {
      return { invalidFormat: true };
    }

    // Check if the employeeId is unique
    const employee1 = JSON.parse(localStorage.getItem('employees') || '[]');
    const isDuplicate = employee1.some((employee: any) => employee.employeeId === control.value);
    if (isDuplicate) {
      return { uniqueEmployeeId: true };
    }

    return null;
  }

  // Custom validator for date of birth
  validateDOB(control: AbstractControl): ValidationErrors | null {
    const dob = new Date(control.value);
    const today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18) {
      return { tooYoung: true };
    }

    return null;
  }

  // Custom validator for hire-date
  validateDateNotInFuture(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { futureDate: true };
    }

    return null;
  }

  // Custom validator for salary
  salaryRangeValidator(control: AbstractControl) {
    const salary = parseFloat(control.value);

    if (isNaN(salary) || salary < 10000 || salary > 100000) {
      return { salaryRange: true };
    }

    return null;
  }

  employeeObj: any = {
    id: 1,
    employeeId: '',
    contact: '',
    email: '',
    gender: '',
    jobtitle: '',
    dob: '',
    doj: '',
    salary: '',
    department: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  }

  employeeArray: any[] = [];
  currentId: number = 0;


  constructor(private activatedRoute: ActivatedRoute, public router: Router,) {
    this.activatedRoute.params.subscribe((res:any) => {
      if (res['id']) {
        this.currentId = res['id'];
      }
    })
  }
  ngOnInit(): void {
    const employeeData = localStorage.getItem('employees')
    if (employeeData !== null) {
      this.employeeArray = JSON.parse(employeeData);
      if (this.currentId !== 0) {
        const currentRecord = this.employeeArray.find(m => m.id == this.currentId);
        if (currentRecord != undefined) {
          this.employeeObj = currentRecord;
        }
      }
    }
  }

  registerForm = new FormGroup({
    employeeId: new FormControl("", [Validators.required, this.validateEmployeeId]),
    contact: new FormControl("", [Validators.required, Validators.pattern("[0-9]*"),
    Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    gender: new FormControl("", [Validators.required]),
    jobtitle: new FormControl("", [Validators.required, Validators.maxLength(35)]),
    dob: new FormControl("", [Validators.required, this.validateDOB]),
    doj: new FormControl("", [Validators.required, this.validateDateNotInFuture]),
    salary: new FormControl("", [Validators.required, Validators.pattern(/^\d*(\.\d+)?$/), this.salaryRangeValidator]),
    department: new FormControl("", [Validators.required]),
    street: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    zip: new FormControl("", [Validators.required]),

  })

  submit() {
    debugger;
    const employeeData = localStorage.getItem('employees')
    if (employeeData == null) {//if no record in local storage
      this.employeeArray.push(this.employeeObj);
      localStorage.setItem('employees', JSON.stringify(this.employeeArray));
    } else {//if data present
      const parseData = JSON.parse(employeeData);
      this.employeeObj.id = parseData.length + 1;
      this.employeeArray.push(this.employeeObj);
      localStorage.setItem('employees', JSON.stringify(this.employeeArray));
      this.router.navigate(['/employee-details'])
    }
  }

  updateData() {
    const currentRecord = this.employeeArray.find(m => m.id == this.currentId);
    if (currentRecord != undefined) {
      const index = this.employeeArray.findIndex(m => m.id == this.currentId);
      this.employeeArray.splice(index, 1);
      this.employeeArray.push(this.employeeObj);
      localStorage.setItem('employees', JSON.stringify(this.employeeArray));
      this.router.navigate(['/employee-details'])
    }
  
  this.confirmationModalVisible = false;

    // Redirect to desired route
    this.router.navigate(['/employee-details']);
  }

  // Function to open the confirmation modal
  openConfirmationModal() {
    this.confirmationModalVisible = true;
  }

  // Function to close the confirmation modal
  closeConfirmationModal() {
    this.confirmationModalVisible = false;
  }

 
  get EmployeeId(): FormControl {
    return this.registerForm.get("employeeId") as FormControl;
  }
  get Contact(): FormControl {
    return this.registerForm.get("contact") as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get Gender(): FormControl {
    return this.registerForm.get("gender") as FormControl;
  }
  get JobTitle(): FormControl {
    return this.registerForm.get("jobtitle") as FormControl;
  }
  get Dob(): FormControl {
    return this.registerForm.get("dob") as FormControl;
  }
  get Doj(): FormControl {
    return this.registerForm.get("doj") as FormControl;
  }
  get Salary(): FormControl {
    return this.registerForm.get("salary") as FormControl;
  }
  get Dept(): FormControl {
    return this.registerForm.get("department") as FormControl;
  }
  get Street(): FormControl {
    return this.registerForm.get("street") as FormControl;
  }
  get City(): FormControl {
    return this.registerForm.get("city") as FormControl;
  }
  get State(): FormControl {
    return this.registerForm.get("state") as FormControl;
  }
  get Zip(): FormControl {
    return this.registerForm.get("zip") as FormControl;
  }
  
}



