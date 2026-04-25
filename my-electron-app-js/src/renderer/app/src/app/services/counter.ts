import { Injectable } from '@angular/core';
import { ElectronService } from './electron'

@Injectable({
  providedIn: 'root',
})

export class Counter {
  constructor(private electron: ElectronService) {}

  add(): Promise<{ counter: number }>{
    return this.electron.getApi().counter.add()
  }

  remove(): Promise<{ counter: number }>{
    return this.electron.getApi().counter.remove()
  }

  clear(): Promise<{ counter: number }>{
    return this.electron.getApi().counter.reset()
  }

  get(): Promise <{ counter: number }>{
    return this.electron.getApi().counter.get()
  }

}
