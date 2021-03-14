import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './Pokeapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  regionsArray = [];
  typesArray = [];
  pokemonArray = [];
  typesModel = {
    repeatedTypes: false
  };

  constructor(private _pokemonApiService: PokemonApiService) {
  }

  ngOnInit() {
    this._pokemonApiService.getRegions().subscribe(response => {
      this.regionsArray = response;
    });

    this._pokemonApiService.getTypes().subscribe(response => {
      this.typesArray = response;
    });
  }

  generate(teamNumber) {
    this.pokemonArray.splice(0, this.pokemonArray.length);
    this._pokemonApiService.getPokemon(teamNumber).subscribe(response => {
      this.pokemonArray = response;
    });
  }
}