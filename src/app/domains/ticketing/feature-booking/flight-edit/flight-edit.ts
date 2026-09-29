import { booleanAttribute, Component, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.html',
})
export class FlightEdit {


  //flight-edit/id
  readonly id = input.required({transform: numberAttribute});
  readonly showDetails = input(false, {transform: booleanAttribute});

  constructor(){
    effect(()=>{
      console.log('id: ', this.id(), 'show details: ', this.showDetails());
    })
  }


  /* private readonly router = inject(ActivatedRoute);

  protected readonly id = signal(0);
  protected readonly showDetails = signal(false);

  constructor(){
    this.router.paramMap.subscribe( 
      paramMap => {
        this.id.set(Number(paramMap.get('id') ?? 0));
        this.showDetails.set(paramMap.get('showDetails') === 'true')
        console.log('id: ', this.id(), 'show details: ', this.showDetails());
      }
    )
  } */



}
