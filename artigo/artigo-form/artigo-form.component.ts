import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ArtigoFormService } from './artigo-form.service';

import { NgUploaderOptions } from 'ngx-uploader';
@Component({
    styles: [require('./artigo-form.component.scss')],
    template: require('./artigo-form.component.html')
})
export class ArtigoFormComponent {
    private form: FormGroup
    public submitted: boolean = false;

    public defaultPicture = 'assets/img/theme/no-photo.png';
    public back = '';

    public profile: any = {
        //        picture: 'assets/img/app/profile/Nasta.png'
        picture: ''
    };

    public uploaderOptions: NgUploaderOptions = {
        url: 'http://localhost/kodeinside.com/index/index.php/Site/Capa/upload',
        autoUpload: true,
        calculateSpeed: true
    };

    private categorias: any[];

    constructor(private formBuilder: FormBuilder, private service: ArtigoFormService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {

        // Inicializa o form
        this.initialFormBuilder();
        
        // Carrega a combo de categorias 
        this.service.getCategorias().then(res => {
            this.categorias = res.categorias;
        });

        this.route.params.subscribe(params => {
            if (params['id']) {
                this.service.get(params['id']).then(res => {

                    // carrega o artigo no component
                    this.form.controls['artigo'].patchValue({
                        id: res.artigo.id,
                        site_capa_id: res.artigo.site_capa_id,
                        titulo: res.artigo.titulo,
                        subtitulo: res.artigo.subtitulo,
                        resumo: res.artigo.resumo,
                        descricao: res.artigo.descricao,
                        categoria: res.artigo.categoria

                    });

                    // carrega a capa no component
                    this.form.controls['capa'].patchValue({
                        id: res.capa.id,
                        titulo: res.capa.titulo,
                        subtitulo: res.capa.subtitulo,
                        descricao: res.capa.descricao,
                        link: res.capa.link,
                        link_titulo: res.capa.link_titulo,
                        imagem: res.capa.imagem
                    });

                    // carrega a imagem no component
                    this.profile = {
                        picture: res.capa.imagem
                    };
                });
            }
        });
    }


    private initialFormBuilder() {
        this.form = this.formBuilder.group(
            {
                artigo: this.formBuilder.group(
                    {
                        id: '',
                        site_capa_id: '',
                        titulo: 'titulo',
                        subtitulo: 'subtitulo',
                        resumo: 'resumo',
                        descricao: 'descricao',
                        categoria: '1'
                    }),

                capa: this.formBuilder.group({
                    id: '',
                    titulo: 'titulo',
                    subtitulo: 'subtitulo',
                    descricao: 'descricao',
                    link: 'link',
                    link_titulo: 'link_titulo',
                    imagem: ''
                }),
                conteudo: this.formBuilder.group(
                    {
                        id: '',
                        site_artigo_id: '',
                        titulo: 'Título do Conteudo',
                        descricao: 'Descrição do código ao ladoo',
                        codigo_fonte: '<b>Kode Inside</b>',
                        arquivo_fonte: '/Site/Artigo/Artigo.php',
                    })
            }
        );
    }

    onUploadCompleted(event: any) {
        this.form.controls['capa'].value.imagem = JSON.parse(event.response).data.name;
    }

    private saveNew(frm: any) {
        this.service.save(frm).then(res => {
            this.onReset();
        });
    }


    private saveList(frm: any) {
        this.service.save(frm).then(res => {
            this.onReset();
            this.router.navigate(['my/artigo/artigo-list']);
        });
    }
    private onReset() {
        this.initialFormBuilder();
        this.profile = {
            picture: ''
        };
    }

    private onList() {
        this.router.navigate(['my/artigo/artigo-list']);
    }
    
    
    private onTest(){
        this.service.novo();
    }
}
