import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './Pokeapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regionsArray;
  typesArray;
  constructor(private _pokemonApiService: PokemonApiService) {
  }

  ngOnInit() {
    this._pokemonApiService.getRegions().subscribe(response => {
      this.regionsArray = response.results;
    });

    this._pokemonApiService.getTypes().subscribe(response => {
      this.typesArray = response.results;
      this.typesArray.splice(18, 2);
      this.typesArray.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    });
  }

  onSubmit() {
    for (let i = 0; i < this.typesArray.length; i++) {
      console.log(this.typesArray[i].name);
    }
  }
}