import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private database: AngularFireDatabase) {
  }

  public getSkills(): Observable<any[]> {
    return this.database.list('/skills').valueChanges()
  }

  public getSkill(skillKey: string): Observable<any> {
    return this.database.object('/skills/' + skillKey).valueChanges()
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/skill.service.ts
