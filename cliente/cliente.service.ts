import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';


//verificar ecessidade
// Import RxJs required methods
import 'rxjs/add/operator/map';


// Variáveis globais do sistema
import { host } from '../../globalVars';


@Injectable()
export class ClienteService {
    private contatoCountUrl = host + 'cliente/contato/getCountContato';                          // Endereço para contar quantos contatos o cliente tem
    private clienteSaveUrl = host + 'cliente/cliente/save';                                      // Endereço para gravar o registro 
    private clienteGetUrl = host + 'cliente/cliente/get';                                        // Endereço de busca do registro por id
    private clienteShutOffUrl = host + 'cliente/cliente/shutoff';                                 // Endereço que desliga o registro por id (manutenção da informação) 
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });  // Cabeçalho da requisição
    private options: RequestOptions;                                                                        // Opções de requisição

    constructor(private http: Http) {
        this.options = new RequestOptions({ headers: this.headers, method: "post" })
    }

    public save(cliente: any) {
        let post = 'data=' + JSON.stringify(cliente);
        return this.http
            .post(this.clienteSaveUrl, post, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public get(id: any) {
        let post = 'data=' + JSON.stringify({ 'id': id });
        return this.http.post(this.clienteGetUrl, post, this.options).toPromise().then(res => res.json());
    }

    public delete(id: any) {
        //        console.log('chamada para deletar o ID:', id);
        //        console.log('DeleteURL:', this.taskDeleteUrl);
        let post = 'data=' + JSON.stringify({ 'id': id });
        return this.http.post(this.clienteShutOffUrl, post, this.options).toPromise().then(response => response.json().data);
    }

    public getCliente(id: number): Promise<any> {
        let post = 'data=' + JSON.stringify({ 'id': id });
        return this.http.post(this.clienteSaveUrl, post, this.options).toPromise().then(response => response.json().data.cliente);
    }

    // não sei se é o melhor lugar... aqui ou em contato
    public getCountContato(id: number): Promise<any> {
        let post = 'data=' + JSON.stringify({ 'id': id });
        return this.http.post(this.contatoCountUrl, post, this.options).toPromise().then(response => response.json().data.countContato);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

}
