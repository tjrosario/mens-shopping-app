import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { ServerCookiesModule } from '@ngx-utils/cookies/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

const APP_ID = 'threadlab';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerCookiesModule.forRoot()
  ],
  providers: [
    // Add universal-only providers here
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}
