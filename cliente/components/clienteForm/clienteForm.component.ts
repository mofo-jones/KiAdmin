import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClienteService } from '../../cliente.service';

import { host } from '../../../../globalVars';

@Component({
    //moduleId: module.id,
    selector: 'clienteForm',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./clienteForm.scss')],
    template: require('./clienteForm.html'),
})

export class ClienteForm implements OnInit {
    private form: FormGroup
    public submitted: boolean = false;
    public sub: boolean = true;
    private saveEnd = '';
    private totalContatos = 0;

    private pt: any;

    private cidades = [
        { 'nome': 'Taquari', 'id': '1' }, { 'nome': 'Tabai', 'id': '2' }, { 'nome': 'Lajeado', 'id': '3' },
        { 'nome': 'Paverama', 'id': '4' }, { 'nome': 'Montenegro', 'id': '5' }, { 'nome': 'Venâncio Aires', 'id': '6' }
    ];

    private estados = [
        { 'id': '21', 'nome': 'AC' }, { 'id': '2', 'nome': 'AL' }, { 'id': '3', 'nome': 'AP' },
        { 'id': '4', 'nome': 'AM' }, { 'id': '5', 'nome': 'BA' }, { 'id': '6', 'nome': 'CE' },
        { 'id': '7', 'nome': 'DF' }, { 'id': '8', 'nome': 'ES' }, { 'id': '9', 'nome': 'GO' },
        { 'id': '10', 'nome': 'MA' }, { 'id': '11', 'nome': 'MT' }, { 'id': '12', 'nome': 'MS' },
        { 'id': '13', 'nome': 'MG' }, { 'id': '14', 'nome': 'PA' }, { 'id': '15', 'nome': 'PB' },
        { 'id': '16', 'nome': 'PR' }, { 'id': '17', 'nome': 'PE' }, { 'id': '18', 'nome': 'PI' },
        { 'id': '19', 'nome': 'RJ' }, { 'id': '20', 'nome': 'RN' }, { 'id': '1', 'nome': 'RS' },
        { 'id': '22', 'nome': 'RO' }, { 'id': '23', 'nome': 'RR' }, { 'id': '24', 'nome': 'SC' },
        { 'id': '25', 'nome': 'SP' }, { 'id': '26', 'nome': 'SE' }, { 'id': '27', 'nome': 'TO' }
    ];

    private paises = [
        { 'id': '1', 'nome': 'Brasil' },
        { 'id': '2', 'nome': 'Argentina' },
        { 'id': '3', 'nome': 'Chile' },
        { 'id': '4', 'nome': 'Uruguay' },
        { 'id': '5', 'nome': 'Paraguay' }
    ];

    private estadoCivil = [
        { 'id': '1', 'nome': 'Solteiro' },
        { 'id': '2', 'nome': 'Divorciado' },
        { 'id': '3', 'nome': 'Separado' },
        { 'id': '4', 'nome': 'Viúvo' },
        { 'id': '5', 'nome': 'Casado' }
    ];

    private cidadeSelecionada = this.cidades[0].nome;
    private estadoSelecionado = this.estados[20].nome;
    private paisSelecionado = this.paises[0].nome;
    private estadoCivilSelecionado = this.estadoCivil[0].nome;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: ClienteService) { }

    ngOnInit() {
//        this.pt = globalVars.pt;
        this.loadFb();
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.loadCliente(params['id']);
                this.countContatos(params['id']);
            }
        });

    }


    private loadFb() {
        //        this.vlr = 0;
        this.form = this.fb.group(
            {
                id: new FormControl(''),
                nome: new FormControl(''),
                mae: new FormControl(''),
                pai: new FormControl(''),
                genero: new FormControl(''),
                cpf: new FormControl(''),
                rg: new FormControl(''),
                dtNascimento: new FormControl(''),
                fonePessoal: new FormControl(''),
                foneResidencial: new FormControl(''),
                foneTrabalho: new FormControl(''),
                estadoCivil: new FormControl(''),
                profissao: new FormControl(''),
                email: new FormControl(''),
                salario: new FormControl(''),
                conjuge: new FormControl({ value: '', disabled: true }, ),
                cidade: new FormControl(new FormControl('')),
                pais: new FormControl(new FormControl('')),
                naturalidade: new FormControl(''),
                estado: new FormControl(new FormControl('')),
                cep: new FormControl(new FormControl('')),
                numeroCasa: new FormControl(''),
                endereco: new FormControl(''),
                proximidade: new FormControl(''),
                bairro: new FormControl(''),
                complemento: new FormControl(''),
                dtUltimaCompra: new FormControl('')
            }
        );
        this.initForm();
    }

    private loadCliente(id: any) {
        this.service.get(id)
            .then(p => {
                this.form.controls['id'].setValue(p.data.cliente.id);
                this.form.controls['nome'].setValue(p.data.cliente.nome);
                this.form.controls['mae'].setValue(p.data.cliente.mae);
                this.form.controls['pai'].setValue(p.data.cliente.pai);
                this.form.controls['genero'].setValue(p.data.cliente.genero);
                this.form.controls['cpf'].setValue(p.data.cliente.cpf);
                this.form.controls['rg'].setValue(p.data.cliente.rg);
                this.form.controls['dtNascimento'].setValue('');
                this.form.controls['fonePessoal'].setValue(p.data.cliente.fone_pessoal.toString().replace(/\D/g, ''));
                this.form.controls['foneResidencial'].setValue(p.data.cliente.fone_residencial.toString().replace(/\D/g, ''));
                this.form.controls['foneTrabalho'].setValue(p.data.cliente.fone_trabalho.toString().replace(/\D/g, ''));
                this.form.controls['estadoCivil'].setValue(p.data.cliente.estado_civil);
                this.form.controls['profissao'].setValue(p.data.cliente.profissao);
                this.form.controls['email'].setValue(p.data.cliente.email);
                this.form.controls['salario'].setValue(p.data.cliente.salario);
                this.form.controls['conjuge'].setValue(p.data.cliente.conjuge);
                this.form.controls['cidade'].setValue(p.data.cliente.cidade);
                this.form.controls['pais'].setValue(p.data.cliente.pais);
                this.form.controls['naturalidade'].setValue(p.data.cliente.naturalidade);
                this.form.controls['estado'].setValue(p.data.cliente.estado);
                this.form.controls['cep'].setValue(p.data.cliente.cep);
                this.form.controls['numeroCasa'].setValue(p.data.cliente.numero_casa);
                this.form.controls['endereco'].setValue(p.data.cliente.endereco);
                this.form.controls['proximidade'].setValue(p.data.cliente.proximidade);
                this.form.controls['bairro'].setValue(p.data.cliente.bairro);
                this.form.controls['complemento'].setValue(p.data.cliente.complemento);
                this.form.controls['dtUltimaCompra'].setValue(p.data.cliente.dt_ultima_compra);
            });
    }



    public onSubmit(values: Object): void {
        //        console.log('onSubmit 4=> ', values);
        this.submitted = true;
        if (this.form.valid) {
            this.service.save(values).subscribe(
                data => this.save(data),
                error => console.log("Error HTTP Post Service" + error)
            );
        }
    }

    private onContatos() {
        if (this.form.controls['id'].value !== '') {
            this.router.navigate(['/pages/contato/contatoFormList/', this.form.controls['id'].value]);
        }
    }


    public countContatos(id:any) {
        this.service.getCountContato(id).then(response => {
            this.totalContatos = response; // create the source
        });
    }


    public save(result: any) {
        if (result.data.success == true) {
            if (this.saveEnd == 'sn') {
                this.initForm();
            }
            else {
                this.router.navigate(['/pages/cliente/clienteList']);
            }
        }
    }

    public saveNew() { this.saveEnd = 'sn'; }
    public saveList() { this.saveEnd = 'sl'; }
    public onList() { this.router.navigate(['/pages/cliente/clienteList']); }
//    public onCancel() { this.initForm(); this.msgs.push({ severity: 'success', summary: 'Registo restaurado!', detail: '' }); }

    private estadoCivilChange(estadoCivil: any) {
        (estadoCivil == 5) ? this.form.controls['conjuge'].enable({ onlySelf: true }) : this.form.controls['conjuge'].disable({ onlySelf: true });
    }


    private initForm() {

        this.form.reset(
            {
                //                id: '',
                //                nome: 'jones pereira',
                //                mae: 'delma',
                //                pai: 'antônio',
                //                genero: '1',
                //                cpf: '000.000.000-00',
                //                rg: '0000000000',
                //                dtNascimento: '13/12/1984',
                //                fonePessoal: '5198889243',
                //                foneResidencial: '5135631150',
                //                foneTrabalho: '5136531367',
                //                estadoCivil: '1',
                //                profissao: 'Programador',
                //                email: 'jones@kodeinside.com',
                //                salario: '1500.00',
                //                conjuge: '',
                //                cidade: '1',
                //                pais: '1',
                //                naturalidade: 'Taquariense',
                //                estado: '1',
                //                cep: '95860-000',
                //                numeroCasa: '147',
                //                endereco: 'rua 20 de setembro',
                //                proximidade: 'Boto autopeças',
                //                bairro: 'Santo Antônio',
                //                complemento: '...',
                //                dtUltimaCompra: '0000000'
                id: '',
                nome: '',
                mae: '',
                pai: '',
                genero: '0',
                cpf: '',
                rg: '',
                dtNascimento: '',
                fonePessoal: '',
                foneResidencial: '',
                foneTrabalho: '',
                estadoCivil: '1',
                profissao: '',
                email: '',
                salario: '',
                conjuge: '',
                cidade: '1',
                pais: '1',
                naturalidade: '',
                estado: '1',
                cep: '95860-000',
                numeroCasa: '',
                endereco: '',
                proximidade: '',
                bairro: '',
                complemento: '',
                dtUltimaCompra: ''
            }
        );

    }

}