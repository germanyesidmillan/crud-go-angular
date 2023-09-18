import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @Input() titleBtn!: string
  @Input() modalTitle!: string
  @Input() classBtn!: string
  @Input() dptos!: any[]
  @Input() user: any;
  @Input() targetModal: string;
  @Input() indice: string;


  @Output() reloadUser: EventEmitter<void>;




  identificacion: number;
  name: string;
  apellido: string;
  email: string;



  //@Output 


  constructor() {
    this.reloadUser = new EventEmitter();
  }

  ngOnInit(): void {
    console.log("registro-dptos==>",this.dptos)
    $(document).ready(function () {
      // Tu código jQuery aquí
    });

    //console.log('RegistroComponent-onInit--->', this.user);
  }


  getUsuarios() {
    console.log("emit--registro");
    this.reloadUser.emit();
  }

  datosUser(datos: any) {

    if (datos) {

      console.log('registro-User-->', datos);
      console.log('registro-User-->', datos.ID);


      let identId = 'identificacion' + datos.ID;
      let nameId = 'name' + datos.ID;
      let apellidoId = 'apellido' + datos.ID;
      let emailId = 'email' + datos.ID;
      let dptoId = 'cmbDptos' + datos.ID;
      let cityId = 'cmbCity' + datos.ID;

      /*$("#" + identId).val(datos.number_id);
      $("#" + nameId).val(datos.nombre);
      $("#" + apellidoId).val(datos.apellido);
      $("#" + emailId).val(datos.correo);
      //$("#"+dptoId).val(2);
      $("#" + dptoId).val(datos.depto_id);
      $("#" + cityId).val(datos.ciudad_id);*/
    }

  }
 
}
