import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Parqueadero } from 'src/app/model/parqueadero';
import { ParqueaderoService } from 'src/app/service/parqueadero.service';

interface Estado {
  nombre: string;
}

@Component({
  selector: 'app-parqueadero-admin',
  templateUrl: './parqueadero-admin.component.html',
  styleUrls: ['./parqueadero-admin.component.css']
})
export class ParqueaderoAdminComponent implements OnInit {

  estados: Estado[] = [
    { nombre: 'Libre' },
    { nombre: 'Ocupado' }
  ];

  form: FormGroup;
  editar: boolean = false;
  titulo: string = "Administrar Parqueaderos";

  codigo: number;

  mensajeSatisfactorio: string = 'Satisfactorio';

  displayedColumns: string[] = ['id','nombre', 'estado', 'editar'];

  dataSource = new MatTableDataSource<Parqueadero>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private personaService: ParqueaderoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.buscar();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      estado: new FormControl('Libre', Validators.required),
      id: new FormControl('')
    })
  }


  clickEnviar(): void {
    let parqueadero: Parqueadero = new Parqueadero();

    parqueadero.id = this.form.get('id').value;
    parqueadero.nombre = this.form.get('nombre').value;
    parqueadero.estado = this.form.get('estado').value

    if (!this.editar) {

      this.registrar(parqueadero);

    } else {

      this.actualizar(parqueadero);

    }

    this.editar = false;
  }

  onCancelar() {

    this.form.reset();
    this.editar = false;

  }


  registrar(parqueadero: Parqueadero): void {

    this.personaService.crear(parqueadero).subscribe(data => {

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();

        this.buscar();

    }, err => this.mensajeError(err));
  }

  actualizar(parqueadero: Parqueadero): void {

    this.personaService.editar(parqueadero).subscribe(data => {

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();

        this.buscar();

    }, err => this.mensajeError(err));

  }

  buscar() {
    this.personaService.buscarTodo().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource<Parqueadero>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }

  private mensajeError(err: any) {
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }

  onEditarClick(element: Parqueadero) {

    this.editar = true;
    this.form.get('id').setValue(element.id);
    this.form.get('nombre').setValue(element.nombre);
    this.form.get('estado').setValue(element.estado);
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

}
