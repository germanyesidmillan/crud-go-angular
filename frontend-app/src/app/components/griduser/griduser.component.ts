import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare var $: any;

@Component({
  selector: 'app-griduser',
  templateUrl: './griduser.component.html',
  styleUrls: ['./griduser.component.css']
})
export class GriduserComponent implements OnInit {

  @Input() users: any[];
  @Input() dptos: any[];
  @Output() reloadUser: EventEmitter<void>;

  constructor(private s_user: UserService) {
    this.reloadUser = new EventEmitter();
  }

  ngOnInit(): void {
    console.log("dptos-griduser==>",this.dptos)
    $(document).ready(function() {
      // Tu código jQuery aquí
    });
  }

  deleteUser(id: number) {

    let elemtId = 'exampleModal'+id;
    let butonId = 'btnBorrar'+id;
    //let modal = document.getElementById(elemtId)  as HTMLButtonElement;
    let boton = document.getElementById(butonId)  as HTMLButtonElement;
    console.log('element-grid',elemtId,boton);

  

    //boton.disabled = true;
    //alert("Registro eliminado con exito!")
  
    console.log($('#'+elemtId).val());
    
    this.s_user.deleteUserByid(id).subscribe(resp=>{
      console.log('resp-eliminacion-->',resp);
      alert("Registro eliminado con exito!")
      $('#'+elemtId).modal('hide');
      this.getUsuarios();
    
      
    }, (error)=>{
      alert(error.message);
    });

    console.log("first--papa-grilla")
    console.log('id', id, boton);
  }

  /*deleteUserId(id:number){


   // this.s_user.

//if(id != null){
      console.log("first--papa-grilla",id);
    //}

    console.log('id',id);
  }*/

  getUsuarios() {
    this.reloadUser.emit();
  }

}
