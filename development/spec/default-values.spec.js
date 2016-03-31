describe("Def value tests", function() {
  it("host", function() {
    expect(MovuWidget.settings().get('server')).toBe('www.movu.ch');
  });
  it("protocol", function() {
    expect(MovuWidget.settings().get('protocol')).toBe('https');
  });
  it("holderId", function() {
    expect(MovuWidget.settings().get('holderId')).toBe('movu-embedded-widget-holder');
  });
  it("language", function() {
    expect(MovuWidget.params().get('language')).toBe('en');
  });
});