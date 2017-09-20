import { TranslateService } from './translate.service';
import { TRANSLATION_PROVIDERS } from './translations';
import { TranslatePipe } from './translate.pipe';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';


@NgModule({
  imports: [
    
  ],
  declarations: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ],
  providers: [
    TRANSLATION_PROVIDERS, 
    TranslateService
  ]
})
export class TranslateModule { }