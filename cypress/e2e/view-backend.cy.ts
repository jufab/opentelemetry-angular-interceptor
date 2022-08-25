describe('View Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/view');
  });
  it('call the backend', () => {
    cy.get('i').contains('result call : ok');
  });
  it('have a trace span in console', () => {
    cy.wait(500);
    cy.get('i').should(() => {
      const value = JSON.parse(localStorage.getItem('consoleDir'));
      expect(value.traceId).to.be.not.undefined;
      expect(value.name).to.eq('HTTP GET');
    });
  });
});
