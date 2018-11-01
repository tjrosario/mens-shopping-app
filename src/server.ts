declare var window;
declare var document;

import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = join(process.cwd(), 'dist');

const app = express();

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('main.server');


app.engine('html', (_, options, callback) => {
  let engine = ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      { provide: 'REQUEST', useFactory: () => options.req, deps: [] },
      { provide: 'RESPONSE', useFactory: () => options.res, deps: [] },
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  });
  engine(_, options, callback);
});

app.set('view engine', 'html');
app.set('views', 'src')

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
