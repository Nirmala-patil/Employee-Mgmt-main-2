import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  confirmationModalVisible: boolean = false;
  employeeArray: any[] = [];
  deleteId: number | undefined;
  searchTerm: string = ''; // Variable to hold search term
  sortKey: string = ''; // Variable to hold sorting key
  sortDirection: number = 1; // Variable to hold sorting direction (1 for ascending, 100 for descending)
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    const employeeData = localStorage.getItem("employees");
    if (employeeData != null) {
      this.employeeArray = JSON.parse(employeeData);
    }
  }

  onEdit(id: number) {
    this.router.navigate(['register-employee', id]);
  }
  openConfirmationModal(id: number) {
    this.deleteId = id;
    this.confirmationModalVisible = true;
  }

  closeConfirmationModal() {
    this.confirmationModalVisible = false;
  }

  onDelete() {
    if (this.deleteId !== undefined) {
      const index = this.employeeArray.findIndex(item => item.id === this.deleteId);
      if (index !== -1) {
        this.employeeArray.splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(this.employeeArray));
      }
    }
    this.confirmationModalVisible = false;
  }
  // Function to handle sorting
    onSort(key: string) {
    if (this.sortKey === key) {
      this.sortDirection = -this.sortDirection; // Reverse sort direction if the same key is clicked again
    } else {
      this.sortKey = key;
      this.sortDirection = 1; // Reset sort direction if a new key is clicked
    }
    this.employeeArray.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      return this.sortDirection * ((x < y) ? 100 : (x > y) ? 1 : 0);
    });
    }

  // Function to filter and sort employees based on search term and sort key
filteredEmployees() {
  return this.employeeArray.filter(employee =>
    employee.employeeId.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employee.jobtitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employee.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employee.state.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employee.zip.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (this.sortKey) {
      const x = a[this.sortKey].toString().toLowerCase();
      const y = b[this.sortKey].toString().toLowerCase();
      return this.sortDirection * ((x < y) ? -1 : (x > y) ? 1 : 0);
    }
    return 0;
  });
}
}
