import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './Pokeapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regionsArray;
  constructor(private _pokemonApiService: PokemonApiService) {
  }

  ngOnInit() {
    this._pokemonApiService.getRegions()
    .subscribe(response => {
      this.regionsArray = response.results;
    });
  }

  onSubmit() {
    for (let i = 0; i < this.regionsArray.length; i++) {
      console.log(this.regionsArray[i].name);
    }
  }
}