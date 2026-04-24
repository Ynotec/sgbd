import { Injectable } from '@angular/core';
import { ElectronService } from './electron'

@Injectable({
  providedIn: 'root',
})

export class Counter {
  constructor(private electron: ElectronService) {}

  add(): Promise<{ counter: number }>{
    return this.electron.getApi().addCount()
  }

  remove(): Promise<{ counter: number }>{
    return this.electron.getApi().removeCount()
  }

  clear(): Promise<{ counter: number }>{
    return this.electron.getApi().resetCount()
  }

  get(): Promise <{ counter: number }>{
    return this.electron.getApi().getCount()
  }

}
