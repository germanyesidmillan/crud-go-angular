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



  //@Output() getUser 
  @Output() reloadUser = new EventEmitter<void>();


  constructor(private s_user: UserService) {
    this.reloadUser = new EventEmitter();
  }

  ngOnInit(): void {
    console.log('ngOnInit-user-Formulario-->', this.user);
    console.log('ngOnInit-dptos-Formulario-->', this.dptos);


    // console.log('ngOnInit-user-Formulario-ID-->', this.user.ID);
    this.getDatosUsers(this.user)
  }

  onSubmit() {
    console.log("identi", this.identificacion)
    console.log("nombre", this.name)
    console.log("apellido", this.apellido)
    console.log("email", this.email)
    console.log("ciudad", this.city)
    console.log("user", this.user)

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
        let elemtId = 'staticBackdrop'+this.idUser;
        this.s_user.UpdateUser(this.idUser, payload).subscribe(resp=>{
          alert("Usuario actualizado con exito")
          $('#'+elemtId).modal('hide');
          this.getUsuarios()
        },(error)=>{
          alert(error.message);
        });

      } else { 

        //CREAR USUARIO
        this.s_user.createUser(payload).subscribe(resp => {
          console.log('resp==>', resp);
          console.log("usuario creado");
          alert("Usuario creado con exito")
          this.limpiarCampos();
          this.getUsuarios()

        }, (error) => {
          console.log('error-->formulario',error);
          if(error.status == 302){
            alert("Usuario ya existe");
          }else{
            alert(error.message);
          }
        })
      }

    } else {
      alert("FALTAN REGISTROS POR DILIGENCIAR\n\n" + msg);
    }


  }

  /*getDepartment(){
    this.s_user.getDepartments().subscribe(resp=>{
      console.log("departments",resp)
    });
  }*/

  //GET CITIES FOR DEPARTMENT_ID
  getCities() {
    console.log('ciudaddpto', this.department);

    if (this.department > 0) {
      this.s_user.getCityPorDptoId(this.department).subscribe((resp: any) => {
        console.log("cities", resp)
        this.cities = resp;
      });
    } else {
      this.cities = [];
      console.log('entro al esle');
    }

  }


  validarCampos() {

    let msg = "";

    console.log('this.identificacion', isNaN(this.identificacion));
    console.log('this.this.name', this.name);
    console.log('this.this.apellido', this.apellido);
    console.log('this.this.email', this.email);
    console.log('this.this.department', isNaN(this.department));
    console.log('this.this.city', (this.city));

    if (isNaN(this.identificacion) == true || this.identificacion == null) {
      msg += "Debe diligenciar el númeo de identificacion\n"
      //return false;
    }
    if (this.name == null) {
      msg += "Debe diligenciar el nombre\n"
      //return false;
    }
    if (this.apellido == null) {
      msg += "Debe diligenciar el apellido\n"
      //return false;
    }
    if (this.email == null) {
      msg += "Debe diligenciar el correo\n"
      //return false;
    }
    if (isNaN(this.department) == true || this.department == null) {
      msg += "Debe seleccionar el Departamento\n"
      //return false;
    }
    if (this.city == null) {
      msg += "Debe seleccionar la ciudad\n"
      //return false;
    }

    //this.valid = true;
    return msg;

  }

  async getDatosUsers(user: any) {
    if (user) {
      console.log("getDatosUsers--formulario", user.ID)
      console.log("getDatosUsers--formulario===>", user.ciudad.departamento_id)
      console.log("getDatosUsers--formulario-dptos===>", this.dptos)

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
      //console.log("getCityPorDptoId----->",user,"---id--->", user.depto_id);
      let resultado = await this.s_user.getCityPorDptoId(user.ciudad.departamento_id).toPromise()
      this.cities = resultado;
      this.city = user.ciudad_id
      console.log(' this.city', this.cities,resultado);
    }else{
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
