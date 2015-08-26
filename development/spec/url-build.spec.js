describe("Url build", function() {
  beforeEach(function(){
    MovuWidget = new MovuWidgetObj();
  });
  it("Def url build", function() {
    //:lang/api/widget/:customerId
    expect(MovuWidget.getApiUrl().indexOf('http://movu.ch/en/api/widget/undefined')).toBe(0);
  });
  it("Language switch", function() {
    //:lang/api/widget/:customerId
    MovuWidget.params().set('language','de');
    expect(MovuWidget.getApiUrl().indexOf('http://movu.ch/de/api/widget/undefined')).toBe(0);
  });
  it("partner_id switch", function() {
    //:lang/api/widget/:customerId
    MovuWidget.params().set('customerId','customerId');
    expect(MovuWidget.getApiUrl().indexOf('http://movu.ch/en/api/widget/customerId')).toBe(0);
  });
  it("other params existens", function() {
    //:lang/api/widget/:customerId
    MovuWidget.params().set('customerId','customerId');
    MovuWidget.params().set('p1','v1');
    MovuWidget.params().set('p2','v2');
    MovuWidget.params().set('p3','v3');
    expect(MovuWidget.getApiUrl().indexOf('?p1=v1&p2=v2&p3=v3')).not.toBe(-1);
  });
});