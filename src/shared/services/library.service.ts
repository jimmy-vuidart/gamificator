import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  public static forEachKey(object: any, func: any) {
    if (object) {
      Object.keys(object).map(function (objectKey, index) {
        let item = object[objectKey]
        func(item)
      })
    }
  }

  public static forEachKeyMap(func: any) {
    return (object: any) => {
      LibraryService.forEachKey(object, (item: any) => func(item))
      return object
    }
  }

  public static mapToArray(map: any) {
    if (!map) return null
    let array: any[] = []
    LibraryService.forEachKey(map, (item: any) => array.push(item))
    return array
  }

  public static makeid() {
    let text = ''
    let possible = 'abcdefghijklmnopqrstuvwxyz'

    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }

  public static limitByMap(number: number) {
    return (array: any[]) => {
      return array.splice(0, number)
    }
  }

  public static outputMap(label: string) {
    return (array: any) => {
      console.log(label || 'Array content : ', array)
      return array
    }
  }

  public static filterMap(filterFunc: (item: any) => boolean): (array: any[]) => any[] {
    return (array: any[]) => {
      return array.filter(filterFunc)
    }
  }

  public static orderByMap(sortFunc: (quest1: any, quest2: any) => boolean): (array: any[]) => any[] {
    return (array: any[]) => {
      return array.sort((a, b) => sortFunc(a, b) ? -1 : 1)
    }
  }

  public keys(object: {}) {
    if (!object) return []
    return Object.keys(object)
  }

  public level(experience: number): number {
    if (!experience) {
      return 0
    }
    return Math.floor(experience / 500)
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/library.service.ts
