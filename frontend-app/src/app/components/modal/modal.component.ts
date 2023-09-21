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
    this.deleteUserId.emit(this.dato);
  }

  botonModal(){
    console.log("botonModal")
  }

}
