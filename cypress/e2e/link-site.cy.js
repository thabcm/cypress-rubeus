describe('Link Site', () => {
  /* Como não tenho acesso as regras de negócio para a realização do teste, nos teste a seguir
  estou considerando apenas os comportamentos atuais do site e o meu senso próprio */
  beforeEach(() => {
    cy.visit('https://qualidade.apprbs.com.br/site')
    cy.window().should('have.property', 'ActionsForm')
  })
  it('Deve carregar corretamente e conter logo do site', () => {
    cy.get('#iiq2g')
      .should('be.visible')
  })
  it('Botão Atendimento deve conter link de redirecionamento para whatsapp', () => {
    cy.get('#ipkda') 
    .should('have.attr', 'href')
    .and('include', 'whatsapp')
  })
  it('Botão Whatsapp deve conter link de redirecionamento para whatsapp', () => {
    cy.get('#iks3g') 
    .should('have.attr', 'href')
    .and('include', 'whatsapp')
  })
  it('Botão Linkedin da barra superior deve conter link de redirecionamento correto', () => {
    cy.get('#iuowq') 
    .should('have.attr', 'href')
    .and('include', 'linkedin')
  })
  it('Botão Facebook da barra superior deve conter link de redirecionamento correto', () => {
    cy.get('#i5aau') 
    .should('have.attr', 'href')
    .and('include', 'facebook')
  })
  it('Botão X da barra superior deve conter link de redirecionamento correto', () => {
    cy.get('#icstg') 
    .should('have.attr', 'href')
    .and('include', 'x')
  })
  it('Botão Youtube da barra superior deve conter link de redirecionamento correto', () => {
    cy.get('#in0ql') 
    .should('have.attr', 'href')
    .and('include', 'youtube')
  })
  it('Botão Instagram da barra superior deve conter link de redirecionamento correto', () => {
    cy.get('#i5rqa') 
    .should('have.attr', 'href')
    .and('include', 'instagram')
  })
  it('Botão Institucional da barra superior deve conter link de redirecionamento correto', () => {
    cy.get('#ilmc2') 
    .should('have.attr', 'href')
    .and('include', 'rubeus')
  })
  it('Botão Biblioteca da barra superior deve conter link de redirecionamento correto', () => {
    cy.get('#ier16') 
    .should('have.attr', 'href')
    .and('include', 'crmrubeus')
  })
  it('Botão Nossos diferenciais do menu de navegação deve rolar até seção correspondente', () => {
    cy.get('#i7qsxy').click()
    cy.get('#inrj09') //id da âncora
      .should('exist')
      .and('be.visible')
  })
  it('Botão Eventos do menu de navegação deve rolar até seção correspondente', () => {
    cy.get('#iycti4').click()
    cy.get('#i41106') //id da âncora
      .should('exist')
      .and('be.visible')
  })
  it('Botão Depoimentos do menu de navegação deve rolar até seção correspondente', () => {
    cy.get('#iv4nx6').click()
    cy.get('#ipjmqj') //id da âncora
      .should('exist')
      .and('be.visible')
  })
  it('Botão Nosso diferenciais do menu de navegação não deve abrir novo link', () => {
    cy.get('#i7qsxy')
    .find('a')
    .should('not.have.attr', 'href') //não deve ter redirecionamento pra outra url
  })
  it('Botão Eventos do menu de navegação não deve abrir novo link', () => {
    cy.get('#iycti4')
    .find('a')
    .should('not.have.attr', 'href') //não deve ter redirecionamento pra outra url
  })
  it('Botão Depoimentos do menu de navegação não deve abrir novo link', () => {
    cy.get('#iv4nx6')
    .find('a')
    .should('not.have.attr', 'href') //não deve ter redirecionamento pra outra url
  })
  it('Botão Falar com consultor deve conter link de redirecionamento para whatsapp', () => {
    cy.get('#iopirr') 
    .should('have.attr', 'href')
    .and('include', 'whatsapp')
  })
  it('Carossel deve exibir múltiplos slides', () => {
    cy.get('.mySlides')
    .should('have.length.greaterThan', 1)
  })
  it('Carossel deve trocar slide ao clicar nas setas', () => {
    cy.get('.mySlides[style*="block"] img') //seta para a direita
    .invoke('attr', 'src')
    .then((srcInicial) => {
      cy.get('.next').click()
      cy.get('.mySlides[style*="block"] img')
        .invoke('attr', 'src')
        .should('not.eq', srcInicial)
    })
    cy.get('.mySlides[style*="block"] img') //seta para a esquerda
    .invoke('attr', 'src')
    .then((srcInicial) => {
      cy.get('.prev').click()
      cy.get('.mySlides[style*="block"] img')
        .invoke('attr', 'src')
        .should('not.eq', srcInicial)
    })
  })
  it('Botão Inscreva-se agora! deve conter link de redirecionamento correto', () => {
    cy.get('#i6b9dk') 
    .should('have.attr', 'href')
    .and('include', 'cursos.rubeus')
  })
  it('Deve conter títulos principais das seções da página', () => {
    cy.contains('CONHEÇA NOSSOS DIFERENCIAIS')
    .should('be.visible')
    cy.contains('PRÓXIMOS EVENTOS')
    .should('be.visible')
    cy.contains('NÃO FIQUE DE FORA!')
    .should('be.visible')
    cy.contains('O QUE NOSSOS ALUNOS DIZEM?')
    .should('be.visible')
  })
  it('Deve manter o botão Concluir desabilitado quando Nome não estiver preenchido', () => {
    cy.get('input[name="pessoa.nome').clear()
    cy.contains('Concluir')
      .should('be.disabled')
    cy.contains('Preencha este campo')
  })
  it('Deve manter o botão Concluir desabilitado quando Email não estiver preenchido', () => {
    cy.get('input[name="pessoa.emailPrincipal').clear()
    cy.contains('Concluir')
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
    cy.get('input[name="pessoa.nome"]').type('Nome Teste')
    cy.get('input[name="pessoa.emailPrincipal"]').type('teste@email.com')
    cy.get('input[name="pessoa.telefonePrincipal"]').type('abc123')
    cy.contains('Concluir')
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
    cy.contains('Concluir').click()
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
    cy.contains('Concluir').click()
    cy.wait('@envioFormErro')
    cy.contains('É necessário informar a base legal')
      .should('be.visible')
  })
  it('Card Linkedin no fim da página deve conter link de redirecionamento correto', () => {
    cy.get('#iowxol') 
    .should('have.attr', 'href')
    .and('include', 'linkedin')
  })
  it('Card Facebook no fim da página deve conter link de redirecionamento correto', () => {
    cy.get('#iv4sbv') 
    .should('have.attr', 'href')
    .and('include', 'facebook')
  })
  it('Card X no fim da página deve conter link de redirecionamento correto', () => {
    cy.get('#in1aw2') 
    .should('have.attr', 'href')
    .and('include', 'x')
  })
  it('Card Youtube no fim da página deve conter link de redirecionamento correto', () => {
    cy.get('#ibg9i8') 
    .should('have.attr', 'href')
    .and('include', 'youtube')
  })
  it('Card Instagram no fim da página deve conter link de redirecionamento correto', () => {
    cy.get('#iyoebg') 
    .should('have.attr', 'href')
    .and('include', 'instagram')
  })
  it('Rodapé deve conter informações', () => {
    cy.contains('Endereço')
    .should('be.visible')
    cy.contains('Contatos')
    .should('be.visible')
    cy.contains('UNIEXEMPLO Social')
    .should('be.visible')
    cy.contains('UNIEXEMPLO - Todos os Direitos Reservados')
    .should('be.visible')
  })
  it('Botão Institucional no rodapé deve conter link de redirecionamento correto', () => {
    cy.get('#ij9km7') 
    .should('have.attr', 'href')
    .and('include', 'sobre-a-rubeus')
  })
  it('Botão Fale Conosco no rodapé deve conter link de redirecionamento correto', () => {
    cy.get('#iwyjp1') 
    .should('have.attr', 'href')
    .and('include', 'whatsapp')
  })
  it('Botão Política de Privacidade no rodapé deve conter link de redirecionamento correto', () => {
    cy.get('#i1feng') 
    .should('have.attr', 'href')
    .and('include', 'politica-de-privacidade')
  })
  it('Botão Facebook no rodapé deve conter link de redirecionamento correto', () => {
    cy.get('#ivmnr9') 
    .should('have.attr', 'href')
    .and('include', 'facebook')
  })
  it('Botão Linkedin no rodapé deve conter link de redirecionamento correto', () => {
    cy.get('#ixax8x') 
    .should('have.attr', 'href')
    .and('include', 'linkedin')
  })
  it('Botão Youtube no rodapé deve conter link de redirecionamento correto', () => {
    cy.get('#ic6rdi') 
    .should('have.attr', 'href')
    .and('include', 'youtube')
  })
  it('Botão Instagram no rodapé deve conter link de redirecionamento correto', () => {
    cy.get('#ilnvjq') 
    .should('have.attr', 'href')
    .and('include', 'instagram')
  })
})