describe("View build", function() {
  var httpMock = function(body){
    return function(options,cb){
      cb(null,{response:JSON.stringify({body:body})});
    };
  };

  beforeEach(function(done){
    var testHolder = document.getElementById('test-holder');
    if(testHolder === null){
      testHolder = document.createElement("div");
      testHolder.id = 'test-holder';
      document.body.appendChild(testHolder);
    }
    testHolder.innerHTML = '';
    var holderEl = document.createElement("div");
    holderEl.id = 'movu-embedded-widget-holder';
    testHolder.appendChild(holderEl);
    MovuWidget.params().set('customerId','aaaaaaaaa');
    done();

  });
    it("Expect throw error no customerId", function(done) {
    MovuWidget.http = httpMock({body:"<form></form>"});
    MovuWidget.params().set('customerId',null);
    var err;
    try{
      MovuWidget.init();
    } catch(e){
      err = e;
    }
    console.info(err);
    expect(err).toBeDefined();
    done();
  });

  it("Expect trow error for missing holder element", function(done) {
    MovuWidget.http = httpMock("<form></form>");
    document.getElementById('test-holder').innerHTML = '';  
    var err;
    try{
      MovuWidget.init();
    } catch(e){
      err = e;
    }
    console.info(err);
    expect(err).toBeDefined();
    done();
  });
});