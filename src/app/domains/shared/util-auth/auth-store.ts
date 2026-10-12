
import { computed, Service, signal } from '@angular/core';

@Service()
export class AuthStore {
    private readonly _userName = signal<string | null>(null);
    readonly userName = this._userName.asReadonly();

    readonly isLoggedIn = computed(()=> this.userName() !== null);

    readonly token = computed(()=>{
        const userName = this._userName();
        return userName ? `demo-token-${userName.toLowerCase()}` : null;
    })

    login(userName: string):void{
        this._userName.set(userName)
    }

    logout():void{
        this._userName.set(null)
    }
}
