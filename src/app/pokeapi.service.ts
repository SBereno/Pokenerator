import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokemonApiService {
    constructor(private http: HttpClient) {
    }

    getRegions(): Observable<any> {
        return this.http.get<any>('https://pokeapi.co/api/v2/region');
    }

    getTypes(): Observable<any> {
        return this.http.get<any>('https://pokeapi.co/api/v2/type');
    }
}