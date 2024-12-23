import { Injectable } from '@angular/core'
import { Database, listVal, objectVal, ref } from '@angular/fire/database'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private database: Database) {
  }

  public getSkills(): Observable<any[]> {
    return listVal<any>(ref(this.database, '/skills'))
  }

  public getSkill(skillKey: string): Observable<any> {
    return objectVal<any>(ref(this.database, `/skills/${skillKey}`), {keyField: '$key'})
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/skill.service.ts
