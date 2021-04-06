describe('Post Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/post');
  });
  it('don\'t call the backend', () => {
    cy.get('i').contains('result call :');
  });
  it('have a trace span in console after post in the form', () => {
    cy.get('input[name="avalue"]').as('avalue').type('test');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.get('i').contains('result call : test').should(() => {
      const value = JSON.parse(localStorage.getItem('consoleLog'));
      expect(value.traceId).to.be.not.null;
      expect(value.name).to.eq('HTTP POST');
    });
  });
});
