describe("Url build", function() {
  it("Def url build", function() {
    //:lang/api/widget/:customerId
//    expect(MovuWidget.getApiUrl().indexOf('https://movu.ch/en/api/v1/templates/undefined')).toBe(0);
  });
  it("Language switch", function() {
    //:lang/api/widget/:customerId
    MovuWidget.params().set('language','de');
//    expect(MovuWidget.getApiUrl().indexOf('https://movu.ch/de/api/v1/templates/undefined')).toBe(0);
  });
  it("partner_id switch", function() {
    //:lang/api/widget/:customerId
    MovuWidget.params().set('customerId','customerId');
    MovuWidget.params().set('language','en');
//    expect(MovuWidget.getApiUrl().indexOf('https://movu.ch/en/api/v1/templates/customerId')).toBe(0);
  });
  it("other params existens", function() {
    //:lang/api/widget/:customerId
    MovuWidget.params().set('customerId','customerId');
    MovuWidget.params().set('p1','v1');
    MovuWidget.params().set('p2','v2');
    MovuWidget.params().set('p3','v3');
    expect(MovuWidget.getApiUrl().indexOf('?inquiry[p1]=v1&inquiry[p2]=v2&inquiry[p3]=v3')).not.toBe(-1);
  });
});