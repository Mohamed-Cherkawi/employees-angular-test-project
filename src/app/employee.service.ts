import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "./employee";
import { environment } from "src/environments/environment";

/*the @Injectable decorator with the providedIn property is used to define and register a service in Angular. 
It is a useful tool for organizing and structuring your code and for enabling dependency injection in your app.*/

@Injectable({
    providedIn: 'root' // By setting providedIn to 'root', you are indicating that the service should be available throughout the entire application and can be injected into any component or service that needs it.
})
export class EmployeeService {
    private apiServerUrl: string = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getEmployees(): Observable<Employee[]>{
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    }

    public addEmployee(employee: Employee): Observable<Employee>{
        return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`,employee);
    }

    public updateEmployee(employee: Employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`,employee);
    }
    public deleteEmployee(employeeId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
    }
}