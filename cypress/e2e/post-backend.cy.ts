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
      const value = JSON.parse(localStorage.getItem('consoleDir'));
      expect(value.traceId).to.be.not.undefined;
      expect(value.name).to.eq('POST /api/');
    });
  });
});
