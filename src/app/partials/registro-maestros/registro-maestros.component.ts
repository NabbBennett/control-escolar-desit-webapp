import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit {

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public maestro:any = {};
  public errors:any = {};
  public editar:boolean = false;
  public token: string = "";
  public idUser: Number = 0;

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  // Lista de materias
  public listaMaterias: string[] = [
    'Aplicaciones Web',
    'Programación 1', 
    'Base de Datos',
    'Tecnologías Web',
    'Minería de Datos',
    'Desarrollo Móvil',
    'Estructuras de Datos',
    'Administración de Redes',
    'Ingeniería de Software',
    'Administración de S.O'
  ];

  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private administradoresService: AdministradoresService,
    private facadeService: FacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.maestro = this.administradoresService.esquemaAdmin();
    // Rol del usuario
    this.maestro.rol = this.rol;

    // Inicializar materias como array vacío si no existe
    if (!this.maestro.materias) {
      this.maestro.materias = [];
    }

    console.log("Datos maestro: ", this.maestro);
  }

  // Función para manejar cambios en los checkboxes de materias
  onMateriaChange(event: any, materia: string) {
    if (event.target.checked) {
      // Agregar materia si no existe
      if (!this.maestro.materias.includes(materia)) {
        this.maestro.materias.push(materia);
      }
    } else {
      // Remover materia
      const index = this.maestro.materias.indexOf(materia);
      if (index > -1) {
        this.maestro.materias.splice(index, 1);
      }
    }
    console.log('Materias seleccionadas:', this.maestro.materias);
  }

  //Funciones para password
  public showPassword() {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar() {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    this.errors = {};
    this.errors = this.administradoresService.validarAdmin(this.maestro, this.editar);
    if(Object.keys(this.errors).length > 0){
      return false;
    }
    console.log("Pasó la validación");
    console.log("Materias seleccionadas:", this.maestro.materias);
  }

  public actualizar(){
  }

  // Función para los campos solo de datos alfabeticos
  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }
}