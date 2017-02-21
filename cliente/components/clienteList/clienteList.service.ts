import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LocalDataSource } from 'ng2-smart-table';
import { host } from '../../../../globalVars';

@Injectable()
export class ClienteListService extends LocalDataSource {

    lastRequestCount: number = 0;

    private headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    });

    constructor(protected http: Http) {
        super();
    }

    count(): number {
        return this.lastRequestCount;
    }

    getElements(): Promise<any> {
        let url = host +'cliente/cliente/getList?';
//        console.log('URL :> ', url);
        if (this.sortConf) {
            this.sortConf.forEach((fieldConf) => {
                url += `_sort=${fieldConf.field}&_order=${fieldConf.direction.toUpperCase()}&`;
            });
        }

        if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
            url += `_page=${this.pagingConf['page']}&_limit=${this.pagingConf['perPage']}&`;
        }

        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf) => {
                if (fieldConf['search']) {
                    url += `${fieldConf['field']}_like=${fieldConf['search']}&`;
                }
            });
        }

        return this.http.get(url).map(res => {
//            console.log('Retorno :> ' , res.json());
            this.lastRequestCount = +res.json().recordsFiltered;
            return res.json().data;
        }).toPromise();
    }
}