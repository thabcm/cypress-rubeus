describe('Link Certificação', () => {
  /* Como não tenho acesso as regras de negócio para a realização do teste, nos teste a seguir
  estou considerando apenas os comportamentos atuais do site e o meu senso próprio */
  beforeEach(() => {
    cy.visit('https://qualidade.apprbs.com.br/certificacao')
    cy.window().should('have.property', 'ActionsForm')
  })
  it('Deve carregar corretamente e conter logo e frase inicial', () => {
    cy.get('#ipflcg')
      .should('be.visible')
    cy.contains('Lorem Ipsum Text pellentesque cras enim').should('be.visible')
  })
  it('Deve manter o botão Avançar desabilitado quando email não estiver preenchido', () => {
    cy.get('input[name="pessoa.emailPrincipal').clear()
    cy.contains('Avançar')
      .should('be.disabled')
    cy.contains('Preencha este campo')
  })
  it('Deve exibir erro ao inserir email inválido', () => {
    cy.get('input[name="pessoa.emailPrincipal"]').type('emailinvalido')
    cy.contains('Preencha este campo')
    cy.get('input[name="pessoa.emailPrincipal').clear()
    cy.get('input[name="pessoa.emailPrincipal"]').type('emailinvalido@email')
    cy.contains('Preencha este campo')
    cy.get('input[name="pessoa.emailPrincipal').clear()
    cy.get('input[name="pessoa.emailPrincipal"]').type('emailinvalido#email.com')
    cy.contains('Preencha este campo')
  })
  it('Deve manter botão desabilitado com telefone inválido', () => {
    cy.get('input[name="pessoa.emailPrincipal"]').type('teste@email.com')
    cy.get('input[name="pessoa.telefonePrincipal"]').type('abc123')
    cy.contains('Avançar')
      .should('be.disabled')
    cy.contains('Preencha este campo')
  })
  it('Deve possuir atributo maxlength no campo Nome', () => {
    cy.get('input[name="pessoa.nome"]')
    .should('have.attr', 'maxlength')
  })
  it('Deve possuir atributo maxlength no campo Email', () => {
    cy.get('input[name="pessoa.emailPrincipal"]')
    .should('have.attr', 'maxlength')
  })
  it('Deve possuir atributo maxlength no campo Telefone', () => {
    cy.get('input[name="pessoa.telefonePrincipal"]')
    .should('have.attr', 'maxlength')
  })
  it('Verifica se formulário preenchido corretamente é enviado com sucesso', () => {
    cy.get('input[name="pessoa.nome"]').type('Nome Teste')
    cy.get('input[name="pessoa.emailPrincipal"]').type('teste@email.com')
    cy.get('input[name="pessoa.telefonePrincipal"]').type('11999999999')
    cy.intercept('PATCH', '/api/v2/sendData').as('envioForm')
    cy.contains('Avançar').click()
    cy.wait('@envioForm')
    .its('response.statusCode')
    .should('eq', 200)
  })
  it('Deve exibir mensagem correta quando API retornar 403', () => {
    cy.intercept('PATCH', '/api/v2/sendData', {
      statusCode: 403,
      body: {
        success:false,
        error:["\u00c9 necess\u00e1rio informar a base legal"]
      }
    }).as('envioFormErro')
    cy.get('input[name="pessoa.nome"]').type('Nome Teste')
    cy.get('input[name="pessoa.emailPrincipal"]').type('teste@email.com')
    cy.get('input[name="pessoa.telefonePrincipal"]').type('11999999999')
    cy.contains('Avançar').click()
    cy.wait('@envioFormErro')
    cy.contains('É necessário informar a base legal')
      .should('be.visible')
  })
  it('Botões de Saiba mais deve conter link de redirecionamento', () => {
    cy.contains('Saiba mais') //Saiba mais início da página (bug)
    .should('have.attr', 'href')
    .and('not.be.empty')
    cy.get('#i27rwk') //Saiba mais 1/3 final da página (bug)
    .should('have.attr', 'href')
    and('not.be.empty')
    cy.get('#i5ddsq') //Saiba mais 2/3 final da página (bug)
    .should('have.attr', 'href')
    and('not.be.empty')
    cy.get('#imis54') //Saiba mais 3/3 final da página (bug)
    .should('have.attr', 'href')
    and('not.be.empty')
  })
  it('Botões de Quero me certificar devem conter link de redirecionamento correto', () => {
    cy.get('#ivw5ng') //primeiro botão banner inicial
    .should('have.attr', 'href', 'https://rubeus.com.br/')
    cy.get('#i72bga') //segundo botão faixa azul
    .should('have.attr', 'href', 'https://rubeus.com.br/')
    cy.get('#ixy3u1') //terceiro botão faixa azul (bug)
    .should('have.attr', 'href', 'https://rubeus.com.br/') 
  })
  it('Botão de Facebook deve conter link de redirecionamento correto', () => {
    cy.get('#io0o4o')
    .should('have.attr', 'href')
    .and('include', 'facebook')
  })
  it('Botão de Instagram deve conter link de redirecionamento correto', () => {
    cy.get('#il7i3x')
    .should('have.attr', 'href')
    .and('include', 'instagram')
  })
  it('Botão de Linkedin deve conter link de redirecionamento correto', () => {
    cy.get('#i2m2tn')
    .should('have.attr', 'href')
    .and('include', 'linkedin')
  })
  it('Botão de Youtube deve conter link de redirecionamento correto', () => {
    cy.get('#ifpwp7') //bug
    .should('have.attr', 'href')
    .and('include', 'youtube')
  })
})