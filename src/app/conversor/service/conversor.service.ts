import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ConversaoResponse, Conversao } from '../model';
import { Observable } from 'rxjs';

@Injectable()
export class ConversorService {
  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=10ed1b306dc7df0c7e0faecf87ae6e4f"

  constructor(private http: HttpClient) { }

  /**
   * Realizar a chamada para a API de conversao de moedas.
   */

  converter(conversao: Conversao): Observable<any> {
    let params = `&from=${conversao.moedaDe}&to=${conversao.moedaPara}`
    return this.http.get(this.BASE_URL + params)
  }

  /**
   * Retornar a cotação para um dado de resposta(response).
   * @param conversaoResponse 
   * @param conversao 
   * @returns 
   */

  cotacaoPara(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
    if (conversaoResponse === undefined) {
      return 0
    }
    return conversaoResponse.rates[conversao.moedaPara]
  }

  cotacaoDe(conversaoResponse: ConversaoResponse, conversao: Conversao): string {
    if (conversaoResponse === undefined) {
      return '0'
    }
    return (1 / conversaoResponse.rates[conversao.moedaPara]).toFixed(4)
  }

  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if(conversaoResponse === undefined) {
      return ''
    }
    return conversaoResponse.date
  }
}
