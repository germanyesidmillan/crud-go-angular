import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  //FORM
  identificacion: number;
  name: string;
  apellido: string;
  email: string;
  department: number;
  city: string;

  valid: boolean = false;
  cities: any = [];

  @Input() dptos: any = [];
  @Input() user: any;
  @Input() indiceFormulario: number;
  edit: number = 0;
  idUser: number;

  @Output() reloadUser = new EventEmitter<void>();

  constructor(private s_user: UserService) {
    this.reloadUser = new EventEmitter();
  }

  ngOnInit(): void {
    this.getDatosUsers(this.user)
  }

  onSubmit() {

    let msg = this.validarCampos();
    console.log("user", this.user)

    if (msg == "") {

      let ciudadId = this.city;
      let payload = {
        number_id: this.identificacion,
        nombre: this.name,
        apellido: this.apellido,
        correo: this.email,
        ciudad_id: parseInt(ciudadId)
      }

      //EDITAR USUARIO
      if (this.edit) {
        let elemtId = 'staticBackdrop' + this.idUser;
        this.s_user.UpdateUser(this.idUser, payload).subscribe(resp => {
          alert("Usuario actualizado con exito")
          $('#' + elemtId).modal('hide');
          this.getUsuarios()
        }, (error) => {
          alert(error.message);
        });

      } else {

        //CREAR USUARIO
        this.s_user.createUser(payload).subscribe(resp => {
          alert("Usuario creado con exito")
          this.limpiarCampos();
          this.getUsuarios()

        }, (error) => {
          if (error.status == 302) {
            alert("Usuario ya existe");
          } else {
            alert(error.message);
          }
        })
      }

    } else {
      alert("FALTAN REGISTROS POR DILIGENCIAR\n\n" + msg);
    }


  }

  //GET CITIES FOR DEPARTMENT_ID
  getCities() {

    if (this.department > 0) {
      this.s_user.getCityPorDptoId(this.department).subscribe((resp: any) => {
        this.cities = resp;
      });
    } else {
      this.cities = [];
    }

  }


  validarCampos() {

    let msg = "";

    if (isNaN(this.identificacion) == true || this.identificacion == null) {
      msg += "Debe diligenciar el númeo de identificacion\n"
    }
    if (this.name == null) {
      msg += "Debe diligenciar el nombre\n"
    }
    if (this.apellido == null) {
      msg += "Debe diligenciar el apellido\n"
    }
    if (this.email == null) {
      msg += "Debe diligenciar el correo\n"
    }
    if (isNaN(this.department) == true || this.department == null) {
      msg += "Debe seleccionar el Departamento\n"
    }
    if (this.city == null) {
      msg += "Debe seleccionar la ciudad\n"
    }

    return msg;

  }

  async getDatosUsers(user: any) {
    if (user) {
      this.edit = 1;
      this.idUser = user.ID;
      this.identificacion = user.number_id
      this.name = user.nombre
      this.apellido = user.apellido
      this.email = user.correo
      this.department = user.ciudad.departamento_id;

      /*let resultado = await this.s_user.getCityPorDptoId(user.depto_id).subscribe(resp=>{
        console.log('resp-->citiesxdpto',resp);
        this.cities = [resp];
        this.city = user.ciudad_id
      },(error)=>{
        console.log(error);
      });*/
      let resultado = await this.s_user.getCityPorDptoId(user.ciudad.departamento_id).toPromise()
      this.cities = resultado;
      this.city = user.ciudad_id
    } else {
      //console.log("getDatosUser-else--formulario", user.ID)
    }
  }


  getUsuarios() {
    console.log("emit desde formulario")
    this.reloadUser.emit();
  }

  limpiarCampos() {
    this.identificacion = null;
    this.name = null;
    this.apellido = null;
    this.email = null;
    this.city = null;
  }



}
