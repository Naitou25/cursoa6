import { NgModule, Optional, SkipSelf, } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
})
export class AgioCoreModule {
  constructor( @Optional() @SkipSelf() parentModule: AgioCoreModule) {
    if (parentModule) {
      const msg = `ModuleName has already been loaded.
        Import ModuleName once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
 }
