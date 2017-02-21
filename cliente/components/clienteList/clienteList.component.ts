import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClienteListService } from './clienteList.service';
import { ClienteService } from '../../cliente.service';


@Component({
    selector: 'basic-example-data',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./clienteList.scss')],
    providers: [ClienteListService],
    template: require('./clienteList.html')

})
export class ClienteList {

    public search = '';

    settings = {
        hideSubHeader: true,
        mode: 'external',
        noDataMessage: 'Nenhuma informação para ser exibida!',
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
        },
        columns: {
            id: {
                title: 'ID',
            },
            nome: {
                title: 'Nome',
            },
            mae: {
                title: 'Nome da Mãe', filter: false,
            },
            pai: {
                title: 'Nome do Pai', filter: false,
            },
            endereco: {
                title: 'Endereço', filter: false
            },
            email: {
                title: 'E-Mail', filter: false,
                type:'html',
                class:'text-center'
            }
        },
        actions: { columnTitle: 'Ações', delete: true, edit: true, add: false }

    };


    constructor(protected sevice: ClienteService, protected source: ClienteListService, private route: ActivatedRoute, private router: Router) {}

    public ngAfterViewInit(): void {
        this.route.params.subscribe(params => {
        });
    }

    public onNew(): void { this.router.navigate(['/pages/cliente/clienteForm']); }
    public onEdit(row: any): void { this.router.navigate(['/pages/cliente/clienteForm', row.data.id]); }

    public onDelete(row: any): void {

    }

    public onSearch(query: string = ''): void {
        this.source.setFilter([
            {
                field: 'id',
                search: query
            },
            {
                field: 'nome',
                search: query
            },
            {
                field: 'mae',
                search: query
            },
            {
                field: 'pai',
                search: query
            },
            {
                field: 'endereco',
                search: query
            },
            {
                field: 'email',
                search: query
            }
        ], false);

    }
}