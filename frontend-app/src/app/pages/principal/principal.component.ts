import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  users:any = [];
  dptos:any = [];

  numId:number;

  constructor(private s_user:UserService) {
    console.log("constructor")
   }

  ngOnInit(): void {
    console.log("oninit")
    this.getUsuarios();
    this.getDepartments()
  }


  getUsuarios(){
    console.log("getUsers--principal")
    this.users =[];
    this.s_user.getUser().subscribe(resp=>{
    //this.s_user.getUsersDpt().subscribe(resp=>{
      console.log("users-DEPTO", resp);
      this.users = resp;
    },(error)=>{
      console.log('Error',error);
      alert("Erroren el servidor\n"+error.message);
    });
  }

  getDepartments(){
    this.s_user.getDepartments().subscribe(resp=>{
      console.log("departments-principal==>",resp)
      this.dptos = resp;
    });
  }

  getUserNumId(numId:number){
    this.users = [];
    this.s_user.getUserByNumId(numId).subscribe((resp)=>{
      this.users = [resp];
      console.log('getUserByNumId',resp);
    }, (err)=>{
      console.log('Error',err)
      if(err.status){
        alert(err.error);
      }
    })
  }

  onSubmit(){

    console.log("onsubmi",this.numId)

    if(this.numId == null){
      this.getUsuarios();
    }else{
      this.getUserNumId(this.numId)
    }
  }

  deleteUser(id:number){
    console.log('id-papa-principal');

  }
  

}
