import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { TypeModel } from '@shared/models/type-model';

const {API_URL} = environment;

@Injectable({
  providedIn: 'root'
})
export class TypeService {


  private http = inject(HttpClient)

  private endpoint:string = `${API_URL}/types`;

  constructor() {}
  getAll(){
    return this.http.get<TypeModel[]>(`${this.endpoint}/index`)
  }

}
