// Must export the config
import { NgModule } from '@angular/core'
import { ComponentsModule } from './components/components.module'
import { ServicesModule } from './services/services.module'



@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    ServicesModule
  ],
  providers: [],
  exports: [ComponentsModule, ServicesModule],
})
export class SharedModule {
}


// WEBPACK FOOTER //
// ./src/shared/shared.module.ts
