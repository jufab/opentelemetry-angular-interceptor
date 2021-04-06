describe('View Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/view');
  });
  it('call the backend', () => {
    cy.get('i').contains('result call : ok');
  });
  it('have a trace span in console', () => {
    cy.wait(1000);
    cy.get('i').should(() => {
      const value = JSON.parse(localStorage.getItem('consoleLog'));
      expect(value.traceId).to.be.not.null;
      expect(value.name).to.eq('HTTP GET');
    });
  });
});
