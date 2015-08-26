describe("Api specification tests", function() {
  it("MovuWidget exists", function() {
    expect(MovuWidget).toBeDefined();
  });
  it("MovuWidget.settings", function() {
    expect(MovuWidget.settings).toBeDefined();
  });
  it("MovuWidget.settings().get", function() {
    expect(MovuWidget.settings().get).toBeDefined();
  });
  it("MovuWidget.settings().set", function() {
    expect(MovuWidget.settings().set).toBeDefined();
  });
  it("MovuWidget.params", function() {
    expect(MovuWidget.params).toBeDefined();
  });
  it("MovuWidget.params().set", function() {
    expect(MovuWidget.params().set).toBeDefined();
  });
  it("MovuWidget.params().get", function() {
    expect(MovuWidget.params().get).toBeDefined();
  });
  it("MovuWidget.form().set", function() {
    expect(MovuWidget.form().set).toBeDefined();
  });

  it("MovuWidget.getApiUrl", function() {
    expect(MovuWidget.getApiUrl).toBeDefined();
  });
  it("MovuWidget.isIE", function() {
    expect(MovuWidget.isIE).toBeDefined();
  });
  it("MovuWidget.createXhr", function() {
    expect(MovuWidget.createXhr).toBeDefined();
  });
  it("MovuWidget.http", function() {
    expect(MovuWidget.http).toBeDefined();
  });
  it("MovuWidget.populateForm", function() {
    expect(MovuWidget.populateForm).toBeDefined();
  });
  it("MovuWidget.init", function() {
    expect(MovuWidget.init).toBeDefined();
  });
});