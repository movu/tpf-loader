(function(window, document) {
  var MovuWidgetObj = function(){
    this._settings = {
      width:'500px',
      height:'500px',
      server:'movu.ch',
      protocol:'http',
      holderId: 'movu-embedded-widget-holder',
      background:"#4283BD"


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
    for (var k in this._params){
      if (['language','customerId'].indexOf(k) === -1) {
        q += k + '=' + this._params[k] + '&';
      }
    }
    if(q.substr(-1) === '&'){
      q = q.substring(0, q.length - 1);
    }

    return this._settings.protocol + '://' + 
      this._settings.server + 
      '/' + 
      this._params.language + 
      '/api/widget/' + 
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
            cb(null, {
              status: xmlhttp.status,
              statusText: (msie < 10 ? "" : xmlhttp.statusText),
              response: (('response' in xmlhttp) ? xmlhttp.response : xmlhttp.responseText)
            });
        }
      }
    };
    xmlhttp.open(options.method, options.url);
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
    this.el.style.height = this._settings.height;
    this.el.style.background = this._settings.background;

    this.http({
      method:'GET',
      url:this.getApiUrl()
    },function(err, data){
      loaderSelf.el.innerHTML = JSON.parse(data.response).body;
      var codes = loaderSelf.el.getElementsByTagName("script");   
      for(var i=0;i<codes.length;i++){
         eval(codes[i].text); // jshint ignore:line
      }
    });
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


