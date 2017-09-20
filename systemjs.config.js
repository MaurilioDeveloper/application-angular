/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/forms/bundles/upgrade.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.min.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',

      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',

      '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
      '@angular/cdk/a11y':'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
      '@angular/cdk/bidi':'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
      '@angular/cdk/observers':'npm:@angular/cdk/bundles/cdk-observers.umd.js',
      '@angular/cdk/overlay':'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
      '@angular/cdk/portal':'npm:@angular/cdk/bundles/cdk-portal.umd.js',
      '@angular/cdk/scrolling':'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
      '@angular/cdk/platform':'npm:@angular/cdk/bundles/cdk-platform.umd.js',
      '@angular/cdk/keycodes':'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
      '@angular/cdk/coercion':'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
      '@angular/cdk/collections':'npm:@angular/cdk/bundles/cdk-collections.umd.js',
      '@angular/cdk/rxjs':'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
      '@angular/cdk/table':'npm:@angular/cdk/bundles/cdk-table.umd.js',
      
      '@angular/flex-layout': 'npm:@angular/flex-layout/bundles/flex-layout.umd.js',
      'app/translate': 'app/transpiled-js/translate',
      'ngx-toastr': 'npm:ngx-toastr/toastr.umd.js',
      'ng-lightning/ng-lightning': 'npm:ng-lightning/bundles/ng-lightning.umd.js',
      'tether': 'npm:tether/dist/js',
      'ng2-currency-mask': 'npm:ng2-currency-mask',
      'hammerjs': 'npm:hammerjs/hammer.js',
      'ngx-quill': 'npm:ngx-quill/bundles/ngx-quill.umd.js',
      'quill': 'npm:quill/dist/quill.js',
      '@swimlane/ngx-datatable': 'npm:@swimlane/ngx-datatable/release/index.js',
     
      'file-saver': 'npm:file-saver/FileSaver.js',
      // other libraries
      'rxjs': 'npm:rxjs',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './transpiled-js/main.js', //path to main.js
        defaultExtension: 'js'
      },

      'app/translate': {
        main: 'index.js',
        defaultExtension: 'js'
      },

      'tether': {
        main: 'tether.js',
        defaultExtension: 'js'
      },
      
      'ng2-currency-mask': {
        main: 'index.js',
        defaultExtension: 'js'
      },

      rxjs: {
        defaultExtension: 'js'
      },

      '.': {
        defaultExtension: 'js'
      },
      
      'ngx-quill': {
        format: 'cjs',
        meta: {
          deps: ['quill']
        }
      },
      
      'quill': {
        format: 'cjs'
      }

    }
  });
})(this);