import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  users: any = [];
  dptos: any = [];

  numId: number;

  constructor(private s_user: UserService) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.getDepartments()
  }


  getUsuarios() {
    this.users = [];
    this.s_user.getUser().subscribe(resp => {
      this.users = resp;
    }, (error) => {
      console.log('Error', error);
      alert("Erroren el servidor\n" + error.message);
    });
  }

  getDepartments() {
    this.s_user.getDepartments().subscribe(resp => {
      this.dptos = resp;
    });
  }

  getUserNumId(numId: number) {
    this.users = [];
    this.s_user.getUserByNumId(numId).subscribe((resp) => {
      this.users = [resp];
    }, (err) => {
      if (err.status) {
        alert(err.error);
      }
    })
  }

  onSubmit() {

    if (this.numId == null) {
      this.getUsuarios();
    } else {
      this.getUserNumId(this.numId)
    }
  }

  deleteUser(id: number) {
    console.log('id-papa-principal');

  }


}
