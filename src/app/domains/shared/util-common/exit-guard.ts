import { CanDeactivateFn } from '@angular/router';

export interface DirtyAware{
  isDirty(): boolean;
}

export const exitGuard: CanDeactivateFn<DirtyAware> = (component) => {

  if (!component.isDirty()){
    return true;
  }

  return confirm('Do You Really wnat to leave without saving?');
};
