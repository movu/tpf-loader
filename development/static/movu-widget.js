(function(window, document) {
  var MovuWidgetObj = function(){
    this._protected = ['width', 'height', 'server', 'protocol', 'holderId'];
    this._settings = {
      width:'100%',
      height:'100%',
      server:'movu.ch',
      protocol:'https',
      holderId: 'movu-embedded-widget-holder',


    };
    this._errors = {
      NotFoundHolderId: new Error('\nCan\'t find holder element with id: ' + this._settings.holderId +
        '\n* Use MovuWidget.settings.set(\'holderId\',\'element name\');' +
        '\n* Or place html elemenent with id: ' + this._settings.holderId),
      CustomerIdNotProvided: new Error('CustomerId Not Provided')
    };
    this._params = {
      language:'en',
    };
    this._forms = [];
  };
  var proto = MovuWidgetObj.prototype;

  proto.settings = function(){
    var self = this;
    return {
      set: function(key, value){
        self._settings[key] = value;
      },
      get: function(key){
        return self._settings[key];
      }
    };
  };


  proto.getApiUrl = function(){
    var q = '?';
    for (var pk in this._params){
      if (['language','customerId'].indexOf(pk) === -1) {
        q += 'inquiry[' + pk + ']=' + this._params[pk] + '&';
      }
    }

    for (var sk in this._settings){
      if (this._protected.indexOf(sk) === -1) {
        q += 'config[' + sk + ']=' + encodeURIComponent(this._settings[sk]) + '&';
      }
    }

    if(q.substr(-1) === '&'){
      q = q.substring(0, q.length - 1);
    }

    return this._settings.protocol + '://' + 
      this._settings.server + 
      '/' + 
      this._params.language + 
      '/tpf_widgets/' + 
      this.getCustomerId() + 
      (q === '?' ? '' : q);

  };


  proto.isIE = function() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1]) : false;
  };
  proto.createXhr = function(method) {
    var msie = this.isIE();
    if (msie <= 8 && (!method.match(/^(get|post|head|put|delete|options)$/i) || !window.XMLHttpRequest)) {
      return new window.ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
      return new window.XMLHttpRequest();
    }
    throw minErr('$httpBackend')('noxhr', "This browser does not support XMLHttpRequest.");
  };
  proto.http = function(options, cb) {
    var msie = this.isIE();
    var xmlhttp = this.createXhr(options.method);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          cb(null,{
            status: xmlhttp.status,
            statusText: (msie < 10 ? "" : xmlhttp.statusText),
            response: (('response' in xmlhttp) ? xmlhttp.response : xmlhttp.responseText)
          });
        } else {
          if (xmlhttp.status !== 0)
            cb((('response' in xmlhttp) ? xmlhttp.response : xmlhttp.responseText), {
              status: xmlhttp.status,
              statusText: (msie < 10 ? "" : xmlhttp.statusText),
              response: (('response' in xmlhttp) ? xmlhttp.response : xmlhttp.responseText)
            });
        }
      }
    };
    xmlhttp.open(options.method, options.url);
 
    if(options.headers){
      for(var h in options.headers){
        xmlhttp.setRequestHeader(h,options.headers[h]);
      }
    }
    if (options.data !== undefined) {
        xmlhttp.send(JSON.stringify(options.data));
    } else {
        xmlhttp.send();

    }
    return xmlhttp;
  };
  proto.form = function(formId){
    var loaderSelf = this;
    if(this._forms[formId] === undefined){
      this._forms[formId] = {};
    }
    return {
      set:function(key,value){
        loaderSelf._forms[formId][key] = value;
      }
    };
  };
  proto.populateForm = function(formId,idPrefix){
    idPrefix = idPrefix || '';
    if(this._forms[formId] === undefined){
      return;
    }

    for (var k in this._forms[formId]){
      var el = document.getElementById(idPrefix + k);
      el.value = this._forms[formId][k];
    }
  };

  proto.params = function(){
    var self = this;
    return {
      set: function(key,value){
        self._params[key] = value;
      },
      get: function(key){
        return self._params[key];
      }
    };
  };
  proto.getCustomerId = function(){
    if(this.el){
      var cId = this.el.getAttribute('data-customer-id');
      if(cId){
        return cId;      
      }
    }
    return this._params.customerId;
  };
  proto.init = function(){
    this.el = document.getElementById(this._settings.holderId);
    this.iframe = iframe = document.createElement('iframe');

    var loaderSelf = this;
    var customerId = this.getCustomerId();
    if(customerId === undefined || customerId === null){
      throw this._errors.CustomerIdNotProvided;
    }

    this.el = this.el || document.getElementById(this._settings.holderId);
    if(this.el === undefined || this.el === null){
      throw this._errors.NotFoundHolderId;
    }
    this.el.style.width = this._settings.width;
    
    iframe.frameBorder = "0";
    iframe.marginheight = "0";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "no";
    window.addEventListener('message',function(e){loaderSelf.handleSizingResponse.call(loaderSelf,e);} , false);
    iframe.onload = function(){
      iframe.contentWindow.postMessage('sizing?', loaderSelf.settings().get('protocol') + '://' + loaderSelf.settings().get('server'));
    };

    iframe.src = this.getApiUrl();
    this.el.appendChild(iframe);
    
  };
  proto.getRemoteUrl = function(){
    return this.settings().get('protocol') + '://' + this.settings().get('server');
  };
  proto.handleSizingResponse = function(e){
    if(e.origin == this.getRemoteUrl()) {
      var action = e.data.split(':')[0];
      if(action == 'sizing') {
        console.log(e.data.split(':')[1]);
        this.el.style.height = e.data.split(':')[1];
      }
    }
  };
  proto.tryToAutoInit = function(){

    var el = document.getElementById(this._settings.holderId);
    if(el){
      var autoinit = el.getAttribute('data-autoinit');
      if(autoinit && autoinit.toLowerCase() === 'true'){
        this.el = el;
        this.init();
      }
    }
  };
  
  window.MovuWidget = new MovuWidgetObj();

}(window,document));

document.addEventListener('DOMContentLoaded',function(){
  MovuWidget.tryToAutoInit();
});


