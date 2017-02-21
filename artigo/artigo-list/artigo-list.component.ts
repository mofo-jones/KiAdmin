import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ArtigoListService } from './artigo-list.service';

@Component({
    selector: 'basic-example-data',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./artigo-list.component.scss')],
    providers: [ArtigoListService],
    template: require('./artigo-list.html')

})
export class ArtigoListComponent {

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
                title: 'ID'
            },
            titulo: {
                title: 'Titulo',

            },
            subtitulo: {
                title: 'Subtítulo', filter: false,
            },
            categoria: {
                title: 'Categoria', filter: false,
            },
            imagem: {
                title: 'Imagem', filter: false,
                type: 'html',
                valuePrepareFunction: (value: any) => {
                    let img = '<img src="' + value + '" width="50px" height="50px" />';
                    return img;
                },

            }
        },
        actions: { columnTitle: 'Ações', delete: true, edit: true, add: false }
    };


    constructor(protected source: ArtigoListService, private route: ActivatedRoute, private router: Router) { }

    public ngAfterViewInit(): void {
        //        this.route.params.subscribe(params => {
        //            console.log(params);
        //        });
    }

    public onNew(): void { this.router.navigate(['/my/artigo/artigo-form']); }
    public onEdit(row: any): void { this.router.navigate(['/my/artigo/artigo-form', row.data.id]); }

    public onDelete(row: any): void {
        this.source.deleteRow(row.data.id).then(res => {
            this.source.refresh();
        });
    }

    public onSearch(query: string = ''): void {
        this.source.setFilter([
            {
                field: 'id',
                search: query
            },
            {
                field: 'titulo',
                search: query
            },
            {
                field: 'subtitulo',
                search: query
            },
            {
                field: 'categoria',
                search: query
            },
            {
                field: 'imagem',
                search: query
            }
        ], false);

    }
}