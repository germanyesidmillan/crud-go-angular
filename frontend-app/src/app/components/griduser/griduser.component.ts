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
    let boton = document.getElementById(butonId)  as HTMLButtonElement;
  
  

    
    this.s_user.deleteUserByid(id).subscribe(resp=>{
      alert("Registro eliminado con exito!")
      $('#'+elemtId).modal('hide');
      this.getUsuarios();
      
    }, (error)=>{
      alert(error.message);
    });

  }

  getUsuarios() {
    this.reloadUser.emit();
  }

}
