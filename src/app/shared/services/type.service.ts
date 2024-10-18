import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { TypeModel } from '@shared/models/type-model';


@Injectable({
  providedIn: 'root'
})
export class TypeService {


  private http = inject(HttpClient)

  private url:string = `types`;

  constructor() {}
  getAll(){
    return this.http.get<TypeModel[]>(`${this.url}`)
  }

}
