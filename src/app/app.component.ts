import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public employees: Employee[] = [] ;
  public editEmployee!: Employee | null ;
  public deleteEmployee!: Employee | null ;

  // Injecting the EmployeeService into the AppComponent class.
  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployees()
  }

  public getEmployees(): void{
    this.employeeService.getEmployees()
    .subscribe({
      next:
      (response: Employee[]) => {
        this.employees = response;
        console.log(response);
    },
    error: 
    (error : HttpErrorResponse) => {
      alert(error.message);
    }
    });
    
  }

  public onAddEmloyee(addForm: NgForm):void{
    document.getElementById('close-add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value) // The value on the form is gonna be a json representation that holds all the properties in the form
    .subscribe({
      next:
      (response: Employee) => {
      console.log(response);
    },
    error: 
    (error : HttpErrorResponse) => {
      alert(error.message);
    },
    complete: () =>{
      this.getEmployees();
      addForm.reset()
    }
    });

  }

  public onUpdateEmloyee(employee: Employee): void{
    this.employeeService.updateEmployee(employee)
    .subscribe({
      next:
      (response: Employee) => {
      console.log(response);
    },
    error: 
    (error : HttpErrorResponse) => {
      alert(error.message);
    },
    complete: () =>{
      this.getEmployees();
    }
    });
    
  }

  public onDeleteEmloyee(employeeId: number  ): void{
    
    this.employeeService.deleteEmployee(employeeId)
    .subscribe({
      next:
      (response: void) => {
      console.log(response);
    },
    error: 
    (error : HttpErrorResponse) => {
      alert(error.message);
    },
    complete: () =>{
      this.getEmployees();
    }
    });

  }

  public searchEmployeesByKeyword(key: string): void {
    const employees: Employee[] = [];

    for(const employee of this.employees) {
      if( 
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1    
       ) {
        employees.push(employee)
      }
    }
    
    if(employees.length == 0 || !key)
      this.getEmployees()
    else
      this.employees = employees

  }

  public onOpenModal(employee: Employee | null , mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal')
    }
    else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }

    container?.appendChild(button);
    
    button.click()
  }

}