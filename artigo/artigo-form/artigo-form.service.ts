import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

// Variáveis globais do sistema
//import globalVars = require('../../../globalVars');
import { host } from '../../../globalVars';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArtigoFormService {

    private artigoSaveUrl = host + 'Site/Artigo/save';
    private artigoGetUrl = host + 'Site/Artigo/get';

    private categoriaUrl = host + 'Site/Categoria/get';
    private categoriasUrl = host + 'Site/Categoria/getList';

    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    private options: RequestOptions;

    constructor(private http: Http) {
        this.options = new RequestOptions({ headers: this.headers, method: "post" })
    }

    public save(form: any) {
        let post = 'data=' + JSON.stringify(form);
        return this.http
            .post(this.artigoSaveUrl, post, this.options)
            .toPromise()
            .then(res => {
                console.log(res);
                return res.json().data;
            })
            .catch(res => this.handleError(res));
    }

    public get(id: any) {
        let post = 'data=' + JSON.stringify({ 'id': id });
        return this.http.post(this.artigoGetUrl, post, this.options).toPromise().then(res => res.json().data);
    }

    public novo() {
        let post = JSON.stringify({ 'data': { 'id': 20 } });
        return this.http.delete('http://localhost/public/restful/10/delete', new Headers()).toPromise().then(res => { console.log('>>>>', res) });
    }

    public getCategoria(id: any) {
        let post = 'data=' + JSON.stringify({ 'id': id });
        return this.http.post(this.categoriaUrl, post, this.options).toPromise().then(res => res.json().data);
    }

    public getCategorias() {
        return this.http.get(this.categoriasUrl, this.options).toPromise().then(res => res.json().data);
    }

    //    public delete(id: any) {
    //        console.log('chamada para deletar o ID:', id);
    //        console.log('DeleteURL:', this.taskDeleteUrl);
    //        let post = 'data=' + JSON.stringify({ 'id': id });
    //        return this.http.post(this.clienteShutOffUrl, post, this.options).toPromise().then(response => response.json().data);
    //    }

    //    public getCard(id: number): Promise<any> {
    //        let post = 'data=' + JSON.stringify({ 'id': id });
    //        return this.http.post(this.clienteSaveUrl, post, this.options).toPromise().then(response => response.json().data.cliente);
    //    }

    // não sei se é o melhor lugar... aqui ou em contato
    //    public getCountCard(id: number): Promise<any> {
    //        let post = 'data=' + JSON.stringify({ 'id': id });
    //        return this.http.post(this.contatoCountUrl, post, this.options).toPromise().then(response => response.json().data.countContato);
    //    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

}
