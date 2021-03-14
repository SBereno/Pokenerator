import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, Subject, of } from 'rxjs';
import { mergeMap, takeUntil, map } from 'rxjs/operators';


var typesToRemove = ['shadow', 'unknown'];

@Injectable({
    providedIn: 'root'
})
export class PokemonApiService {
    private endSubs$ = new Subject();
    pokemonArray = [];
    constructor(private http: HttpClient) {
    }

    getRegions(): Observable<any> {
        return this.http.get<any>('https://pokeapi.co/api/v2/region').pipe(map(response => {
            return response.results;
        }));
    }

    getTypes(): Observable<any> {
        return this.http.get<any>('https://pokeapi.co/api/v2/type').pipe(map(response => {
            var result = response.results.filter((el) => !typesToRemove.includes(el.name));
            result.sort(function (a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            });
            return result;
        }));
    }

    getPokemon(teamNumber): Observable<any> {
        if (teamNumber == null) teamNumber = 6;
        var pokemonIdArray = [];
        var generatedId;
        for (let i = 0; i < teamNumber; i++) {
            generatedId = Math.floor(Math.random() * (899 - 1)) + 1;
            while (pokemonIdArray.includes(generatedId)) {
                generatedId = Math.floor(Math.random() * (899 - 1)) + 1;
            }
            pokemonIdArray.push(generatedId);
        }
        console.log('Generated IDs: ' + pokemonIdArray);
        from(pokemonIdArray).pipe(
            mergeMap(id => this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`)), takeUntil(this.endSubs$)
        ).subscribe(
            pokemon => {
                this.pokemonArray.push(pokemon);
            },
            err => console.log('Error loading a pokemon', err)
        );
        return of(this.pokemonArray);
    }

    ngOnDestory() {
        this.endSubs$.next();
        this.endSubs$.complete();
    }
}