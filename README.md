# tpf-loader
Movu JS library for loading Movu form widget on third party web-sites.
[![Build Status](https://semaphoreci.com/api/v1/projects/e78ee014-a96b-4949-a876-ba87842d1daa/676959/badge.svg)](https://semaphoreci.com/nenad/tpf-loader)

# Development
## clean install
    $ cd development
    $ npm install
    
## run tests
    $ cd development
    $ grunt test

## build
    $ cd development
    $ grunt build
if build is success files for production are in ROOT\dest
## run development server
    $ cd development
    $ node our_server.js
You can edit widget file and testit on localhost:3002/autoinit

# Integration

## Initialization with data attributes on html element
### Data attributes
Folowing attributes

    data-autoinit="true" 
    data-customer-id="customer id"
    
## Example
### Autoinit

    <html>
      <head>
        <script type="text/javascript" src="https://s3-eu-west-1.amazonaws.com/movu-production-s3/static/js/tpf-loader.min.js"></script>
      </head>
      <body>
        <!-- autoload init -->
        <div id="movu-embedded-widget-holder" data-autoinit="true" data-customer-id="adasaddasd"></div>
      </body>
    </html>

### Init from js

    <html>
      <head>
        <script type="text/javascript" src="https://s3-eu-west-1.amazonaws.com/movu-production-s3/static/js/tpf-loader.min.js"></script>
        
      </head>
      <body>
        <!-- autoload init -->
        <div id="movu-embedded-widget-holder" data-autoinit="false" ></div>

        <script type="text/javascript">
          MovuWidget.settings().set('width','350px');
          MovuWidget.settings().set('server','staging2.movu.ch');
          MovuWidget.settings().set('protocol','https');

          MovuWidget.params().set('customerId','3eb6f46b-76b8-4049-a380-7fd5d63ffa7d');
          MovuWidget.params().set('language','de');

          MovuWidget.params().set('is_moving_request',true);
          MovuWidget.params().set('is_cleaning_request',true);
          MovuWidget.params().set('client_street_and_number','Zuric strase 21');
          MovuWidget.params().set('client_postal_code','8006');
          MovuWidget.params().set('moving_street_and_number','Morgen strase 48');
          MovuWidget.params().set('moving_postal_code','8006');
          MovuWidget.params().set('moving_date','2016-03-10');
          MovuWidget.params().set('cleaning_date','2016-03-12');
          MovuWidget.params().set('client_first_name','Sara');
          MovuWidget.params().set('client_last_name','Froyd');
          MovuWidget.params().set('client_email','sara@movu.ch');
          MovuWidget.params().set('client_mobile','0791111111');
          MovuWidget.init();
        </script>
        
      </body>
    </html>
    

