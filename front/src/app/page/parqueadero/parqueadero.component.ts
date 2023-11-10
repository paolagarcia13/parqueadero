import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Parqueadero } from 'src/app/model/parqueadero';
import { ParqueaderoPersona } from 'src/app/model/parqueadero-persona';
import { Persona } from 'src/app/model/persona';
import { ParqueaderoService } from 'src/app/service/parqueadero.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css']
})
export class ParqueaderoComponent implements OnInit {

  asignar: boolean = false;
  form: FormGroup;
  titulo: string = "Parqueaderos";
  mensajeSatisfactorio: string = 'Satisfactorio';
  libres: number;
  columnasParqueaderoLibre: string[] = ['id', 'nombre', 'estado', 'asignar'];
  columnasParqueaderoPersona: string[] = ['id', 'nombre', 'identificacion', 'ocupante', 'desocupar']

  dataSourceParqueaderoLibre = new MatTableDataSource<Parqueadero>([]);
  dataSourceParqueaderoPersona = new MatTableDataSource<ParqueaderoPersona>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private parqueaderoService: ParqueaderoService

  ) { }

  ngOnInit(): void {
    this.buscarParqueaderoLibre();
    this.buscarParqueaderoPersona();
    this.initForm();
  }

  buscarParqueaderoLibre() {
    this.parqueaderoService.listarPorEstado().subscribe(data => {
      this.libres = data.length;
      this.dataSourceParqueaderoLibre = new MatTableDataSource<Parqueadero>(data);
      this.paginator.firstPage();
      this.dataSourceParqueaderoLibre.paginator = this.paginator;
    })
  }

  buscarParqueaderoPersona() {
    this.parqueaderoService.listarParqueaderoConPersona().subscribe(data => {
      this.dataSourceParqueaderoPersona = new MatTableDataSource<ParqueaderoPersona>(data);
      this.paginator.firstPage();
      this.dataSourceParqueaderoPersona.paginator = this.paginator;
    })
  }

  initForm(): void {
    this.form = this.fb.group({
      nombres: new FormControl('', Validators.required),
      apellido1: new FormControl('', Validators.required),
      apellido2: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      idParqueadero: new FormControl('')
    })
  }

  clickEnviar(): void {
    let persona: Persona = new Persona();
    let parqueadero: Parqueadero = new Parqueadero();
    let parqueaderoPersona: ParqueaderoPersona = new ParqueaderoPersona();

    persona.identificacion = this.form.get('identificacion').value;
    persona.nombres = this.form.get('nombres').value;
    persona.primerApellido = this.form.get('apellido1').value;
    persona.segundoApellido = this.form.get('apellido2').value;

    parqueadero.id = this.form.get("idParqueadero").value;

    parqueaderoPersona.parqueadero = parqueadero;

    parqueaderoPersona.persona = persona;

    this.parqueaderoService.asignarParqueadero(parqueaderoPersona).subscribe(data => {
      this.toastr.info(data);
    }, err => {
      this.toastr.info();
      this.form.reset();
      this.buscarParqueaderoPersona();
      this.buscarParqueaderoLibre();
    });

    this.asignar = false;
  }

  onAsignarClick(element: Parqueadero) {
    this.asignar = true;
    this.form.get('idParqueadero').setValue(element.id);
  }

  onCancelar() {
    this.asignar = false;
    this.form.reset();
    this.buscarParqueaderoLibre();
    this.buscarParqueaderoPersona();
  }

  desocuparClick(element: ParqueaderoPersona) {
    this.parqueaderoService.desocuparParqueadero(element.id).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.buscarParqueaderoLibre();
      this.buscarParqueaderoPersona();
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }
}
