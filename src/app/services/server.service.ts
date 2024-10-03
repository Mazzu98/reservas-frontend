import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponse, loginRequest, registerRequest, user } from '../types/auth';
import { firstValueFrom } from 'rxjs';
import moment from 'moment';
import { Space } from '../types/space';
import { Reservation, scheduleRequest } from '../types/reservation';

@Injectable()
export class ServerProvider {
    private static apiUrl = "http://localhost:8000/api/";
    private static login = "login";
    private static register = "register";
    private static getUser = "user";
    private static availableSpaces = "space/search";
    private static spaceDailyAvailable = "space/{spaceId}/daily-available-slots";
    private static getSpace = "space";
    private static reservation = "reservation";
    private static space = "space";
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

    public availableSpaces(type: string, capacity: number, date: string) {
        const startDate = moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
        const url = `${ServerProvider.apiUrl}${ServerProvider.availableSpaces}?type=${type}&capacity=${capacity}&start_date=${startDate}&end_date=${endDate}`;
        return firstValueFrom(this.http.get<Space[]>(url, {headers: this.headers}));
    }

    public getSpace(spaceId: number) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.getSpace}/${spaceId}`;
        return firstValueFrom(this.http.get<Space>(url, {headers: this.headers}));
    }

    public getSpaceAvailability(spaceId: number, date: string, reservationIgnore?: number) {
        date = moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endpoint = ServerProvider.spaceDailyAvailable.replace('{spaceId}', spaceId.toString());
        const url = `${ServerProvider.apiUrl}${endpoint}?&day=${date}&reservationIgnore=${reservationIgnore}`;
        return firstValueFrom(this.http.get<Space[]>(url, {headers: this.headers}));
    }
    
    public getOwnReservations() {
        const url = `${ServerProvider.apiUrl}${ServerProvider.reservation}`;
        return firstValueFrom(this.http.get<Reservation[]>(url, {headers: this.headers}));
    }

    public scheduleSpace(data: scheduleRequest) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.reservation}`;
        return firstValueFrom(this.http.post<any>(url, data, {headers: this.headers}));
    }

    public editReservations(id: number, data: scheduleRequest) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.reservation}/${id}`;
        return firstValueFrom(this.http.put<any>(url, data, {headers: this.headers}));
    }

    public cancelReservations(id: number) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.reservation}/${id}`;
        return firstValueFrom(this.http.delete<Reservation[]>(url, {headers: this.headers}));
    }

    public getSpaces() {
        const url = `${ServerProvider.apiUrl}${ServerProvider.space}`;
        return firstValueFrom(this.http.get<Space[]>(url, {headers: this.headers}));
    }

    public createSpace(data: FormData) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.space}`;
        return firstValueFrom(this.http.post<any>(url,data, {headers: this.headers}));
    }

    public updateSpace(id: number, data: FormData) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.space}/${id}?_method=PATCH`;
        return firstValueFrom(this.http.post<any>(url, data, {headers: this.headers}));
    }

    public deleteSpace(id: number) {
        const url = `${ServerProvider.apiUrl}${ServerProvider.space}/${id}`;
        return firstValueFrom(this.http.delete<any>(url, {headers: this.headers}));
    }

    private jsonToForm(source: any): FormData {
        let formData = new FormData();
        Object.keys(source).forEach(key => {
            formData.append(key, source[key]);
        });
        return formData;
    }

}
