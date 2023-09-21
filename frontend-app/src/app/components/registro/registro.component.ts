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

  constructor() {
    this.reloadUser = new EventEmitter();
  }

  ngOnInit(): void {
    $(document).ready(function () {
      // Tu código jQuery aquí
    });

  }


  getUsuarios() {
    this.reloadUser.emit();
  }


}
