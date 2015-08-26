describe("Def value tests", function() {
  it("host", function() {
    expect(MovuWidget.settings().get('server')).toBe('movu.ch');
  });
  it("protocol", function() {
    expect(MovuWidget.settings().get('protocol')).toBe('http');
  });
  it("holderId", function() {
    expect(MovuWidget.settings().get('holderId')).toBe('movu-embedded-widget-holder');
  });
  it("background", function() {
    expect(MovuWidget.settings().get('background')).toBe('#4283BD');
  });
  it("language", function() {
    expect(MovuWidget.params().get('language')).toBe('en');
  });
});