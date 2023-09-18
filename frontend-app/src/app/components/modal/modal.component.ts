import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() dato: number;
  @Input() btnModal: string;
  @Output() deleteUserId: EventEmitter<number>;


  constructor() {
    this.deleteUserId = new EventEmitter();
  }

  ngOnInit(): void {
  }


  deleteUser(id: number) {
    //let element = document.getElementById("exampleModal");
    console.log('id-modal', id);
    //element.style.display = "none";
    //element.classList.remove("show");
    this.deleteUserId.emit(this.dato);
  }

  botonModal(){
    console.log("botonModal")
  }

}
