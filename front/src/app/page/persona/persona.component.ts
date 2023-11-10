import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../../model/persona';
import { PersonaService } from '../../service/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  form: FormGroup;
  editar: boolean = false;
  titulo: string = "Personas";

  codigo: number;

  mensajeSatisfactorio: string = 'Satisfactorio';

  displayedColumns: string[] = ['id','nombres', 'apellido1', 'apellido2', 'identificacion', 'editar'];

  dataSource = new MatTableDataSource<Persona>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.buscar();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido1: new FormControl('', Validators.required),
      apellido2: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      id: new FormControl('')
    })
  }


  clickEnviar(): void {
    let persona: Persona = new Persona();

    persona.id = this.form.get('id').value;
    persona.nombres = this.form.get('nombre').value;
    persona.primerApellido = this.form.get('apellido1').value;
    persona.segundoApellido = this.form.get('apellido2').value;
    persona.identificacion = this.form.get('identificacion').value;

    console.log(persona);

    if (!this.editar) {

      this.registrar(persona);

    } else {

      this.actualizar(persona);

    }

    this.editar = false;
  }

  onCancelar() {

    this.form.reset();
    this.editar = false;

  }


  registrar(persona: Persona): void {

    this.personaService.crear(persona).subscribe(data => {

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();

        this.buscar();

    }, err => this.mensajeError(err));
  }

  actualizar(persona: Persona): void {

    this.personaService.editar(persona).subscribe(data => {

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();

        this.buscar();

    }, err => this.mensajeError(err));

  }

  buscar() {
    this.personaService.buscarTodo().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource<Persona>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }

  onEditarClick(element: Persona) {

    this.editar = true;
    this.form.get('id').setValue(element.id);
    this.form.get('nombre').setValue(element.nombres);
    this.form.get('apellido1').setValue(element.primerApellido);
    this.form.get('apellido2').setValue(element.segundoApellido);
    this.form.get('identificacion').setValue(element.identificacion);
    this.codigo=element.id;

  }

  onEliminar() {
    
    let id: number = this.form.get('id').value;
    this.personaService.eliminar(id).subscribe(data => {

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();
        this.editar = false;
        this.buscar();
    }, err => this.mensajeError(err));

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
