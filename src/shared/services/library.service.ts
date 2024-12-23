import {Injectable} from "@angular/core";

@Injectable()
export class LibraryService {

    public static forEachKey(object, func) {
        if (object) {
            Object.keys(object).map(function (objectKey, index) {
                let item = object[objectKey];
                func(item);
            });
        }
    }

    public static forEachKeyMap(func) {
        return (object) => {
            LibraryService.forEachKey(object, item => func(item));
            return object;
        }
    }

    public static mapToArray(map) {
        if (!map) return null;
        let array = [];
        LibraryService.forEachKey(map, item => array.push(item));
        return array;
    }

    public static makeid() {
        let text = "";
        let possible = "abcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    public static limitByMap(number: number) {
        return (array) => {
            return array.splice(0, number);
        }
    }

    public static outputMap(label) {
        return array => {
            console.log(label || "Array content : ", array);
            return array;
        }
    }

    public static filterMap(filterFunc: (item) => any) {
        return (array) => {
            return array.filter(filterFunc);
        }
    }

    public static orderByMap(sortFunc: (quest1, quest2) => boolean) {
        return array => {
            return array.sort(sortFunc);
        }
    }

    public keys(object) {
        if (!object) return [];
        return Object.keys(object);
    }

    public level(experience: number): number {
        if(!experience) {
            return 0;
        }
        return Math.floor(experience / 500);
    }
}



// WEBPACK FOOTER //
// ./src/shared/services/library.service.ts