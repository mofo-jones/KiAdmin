import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LocalDataSource } from 'ng2-smart-table';

import { host } from '../../../globalVars';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArtigoListService extends LocalDataSource {

    lastRequestCount: number = 0;
    private artigoDeleteUrl = host + 'Site/Artigo/deleteRow';

    private headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    });
    
    private header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    private options: RequestOptions;

    constructor(protected http: Http) {
        super();
        this.options = new RequestOptions({ headers: this.header, method: "post" })
    }

    count(): number {
        return this.lastRequestCount;
    }

    getElements(): Promise<any> {
        let url = host + 'Site/Artigo/getCustomList?';
        if (this.sortConf) {
            this.sortConf.forEach((fieldConf) => {
                url += `_sort=${ fieldConf.field }&_order=${ fieldConf.direction.toUpperCase() }&`;
            });
        }

        if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
            url += `_page=${ this.pagingConf['page'] }&_limit=${ this.pagingConf['perPage'] }&`;
        }

        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf) => {
                if (fieldConf['search']) {
                    url += `${ fieldConf['field'] }_like=${ fieldConf['search'] }&`;
                }
            });
        }

        return this.http.get(url).map(res => {
            this.lastRequestCount = +res.json().recordsFiltered;
            return res.json().data;
        }).toPromise();
    }

    public deleteRow(id: any) {
        let post = 'data=' + JSON.stringify({ 'id': id });
        return this.http.post(this.artigoDeleteUrl, post, this.options).toPromise().then(response => console.log('delete', response.json().data));
    }


}