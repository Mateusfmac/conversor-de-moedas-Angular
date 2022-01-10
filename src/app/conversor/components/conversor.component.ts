import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConversorService, MoedaService } from '../service';
import { Moeda, Conversao, ConversaoResponse } from '../model/';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

   moedas: Moeda[]
   conversao: Conversao
   possuiErro: boolean
   conversaoResponse: ConversaoResponse

  @ViewChild("conversaoForm", { static: true }) conversaoForm: NgForm

  constructor(private moedaService: MoedaService, private conversorService: ConversorService) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodas()
    this.init()
  }

  /**
   * Efetua a conversao dos valores.
   */

  init(): void {
    this.conversao = new Conversao('USD', 'BRL', null)
    this.possuiErro = false
  }

  converter(): void {
    if (this.conversaoForm.form.valid) {
      this.conversorService.converter(this.conversao).subscribe(response => this.conversaoResponse = response, error => this.possuiErro = true)
    }
  }

}
