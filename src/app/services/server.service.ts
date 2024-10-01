import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponse, loginRequest, registerRequest, user } from '../types/auth';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ServerProvider {
    private static apiUrl = "http://localhost:8000/api/";
    private static login = "login";
    private static register = "register";
    private static getUser = "user";
    private headers = new HttpHeaders();

    constructor(public http: HttpClient) {
        this.updateHeaders();
    }

    public updateHeaders(token?: string) {

        this.headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: token ? 'Bearer ' + token : '',
        });
    }

    public login(data: loginRequest) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.login}`;
        return firstValueFrom(this.http.post<authResponse>(url, data, {headers: this.headers}));
    }

    public register(data: registerRequest) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.register}`;
        return firstValueFrom(this.http.post<authResponse>(url, data, {headers: this.headers}));
    }

    public getUser() {
        const url = `${ServerProvider.apiUrl}${ServerProvider.getUser}`;
        return firstValueFrom(this.http.get<user>(url, {headers: this.headers}));
    }

    private jsonToForm(source: any): FormData {
        let formData = new FormData();
        Object.keys(source).forEach(key => {
            formData.append(key, source[key]);
        });
        return formData;
    }

}
