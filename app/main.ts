import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();

// Enable production mode unless running locally
/*if (!/localhost/.test(document.location.host)) {*/
  enableProdMode();
//}

platform.bootstrapModule(AppModule)
  .then((success: any) => {})
  .catch((err: any) => console.error(err));