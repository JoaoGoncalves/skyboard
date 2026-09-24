import { Component, computed, signal } from '@angular/core';
import { Passenger } from '../../data/passenger';
import { form, FormField } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { PassengerRow } from '../../ui/passenger-row/passenger-row';

type BoardingFilter = 'all' | 'boarded' | 'pending';


@Component({
  imports: [FormField, JsonPipe, PassengerRow],
  selector: 'app-boarding-list',
  templateUrl: './boarding-list.html',
})
export class BoardingList {
  protected readonly passengers = signal<Passenger[]>([
    {id: 1, name:'Ana Silva', boarded: false},
    {id: 2, name:'Bruno Costa', boarded: false},
    {id: 3, name:'Carla Dias', boarded: false},
  ]);


  protected readonly newName = signal('');
  protected readonly newNameForm = form(this.newName);
  protected readonly filter = signal<BoardingFilter>('all');

  
  
  protected readonly total = computed(
    ()=> this.passengers().length
  )
  protected readonly boardedCount = computed(
    ()=> this.passengers().filter( p => p.boarded).length
  )
  protected readonly allboarded = computed(
    ()=> this.total() > 0 && this.boardedCount() === this.total()
  )
  protected readonly visible = computed(
    ()=> {
      const f = this.filter();
      const all = this.passengers();
      if(f === 'all') return all;
      return all.filter( p => f === 'boarded' ? p.boarded : !p.boarded)
    }
  )


  protected boardAll() : void {
    this.passengers.update( list => list.map( p => ({...p, boarded: true}) ))
  }
  protected reset() : void {
    this.passengers.update( list => list.map( p => ({...p, boarded: false}) ))
  }

  protected add():void{
    const name = this.newName().trim();
    if (!name) return;
    this.passengers.update( list => [
      ...list,
      { id: Math.max(0, ...list.map( p => p.id)) + 1 , name, boarded: false},
    ] );
    this.newName.set('');
  }

  protected toggle(id: number): void{
    this.passengers.update( list => 
      list.map ( p => p.id === id ? {...p, boarded: !p.boarded} : p)
    )
  }


}
