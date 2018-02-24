import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// import { NavController, NavParams } from 'ionic-angular'

@Injectable()
export class AtmdataProvider {
    data: any;
    branches: any;
    direction;
    key;
    apiUrl:string = '/branch';
    // apiUrl:string = 'http://192.168.8.102:9000/api';
    header: Headers = new Headers();

    constructor(public http: Http) {
        this.direction = 'https://maps.googleapis.com/maps/api/geocode/json?';
        this.key = 'AIzaSyBejRUgJY2hG3VWN2Yb5LkYSQHI_7fnRo0';
        console.log('Hello AtmdataProvider Provider');
    }

    getdata() {

        return new Promise(resolve => {
            this.http.get('assets/cat.json').map(res => res.json()).subscribe(data => {
                this.data = data;
                resolve(this.data)
            });

        });
    }

    async getService(func): Promise<any> {
        this.header.append('Content-Type', "application/json");
        try {
            const response = await this.http.get(`${this.apiUrl}/${func}`, {headers: this.header}).toPromise();
            return response.json();
        }
        catch (err) {
            console.log(err);
            return "Failed";
        }
    }

    async postService(body, func): Promise<any> {
        this.header.append('Content-Type', "application/json");
        try {
            const response = await this.http.post(`${this.apiUrl}/${func}`, JSON.stringify(body), {headers: this.header}).toPromise();
            return response.json();
        }
        catch (err) {
            console.log(err);
            return "Failed";
        }
    }

    getbranches() {

        return new Promise(resolve => {
            this.http.get('assets/branches2.json').map(res => res.json()).subscribe(branches => {
                this.branches = branches;
                resolve(this.branches);
            });

        });
    }

}