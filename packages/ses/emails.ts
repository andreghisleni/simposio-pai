function email_base(data: string) {
  return `
<style>
  .message-content {
    font-family: Arial, Helvetica, sans-serif;
    max-width: 600px;
    font-size: 18px;
    line-height: 21px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
  }

  th,
  td {
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2
  }

  th {
    background-color: #4CAF50;
    color: white;
  }
</style>

<div class="message-content">
${data}

</div>  
  `
}

export const new_enrolled_owner = email_base(`
  <p><strong>Nome</strong>: {{=it.name}}</p>
  <p><strong>E-mail</strong>: {{=it.email}}</p>
  <p><strong>CPF</strong>: {{=it.document}}</p>
  <p><strong>Telefone</strong>: {{=it.phone}}</p>
  <p><strong>Data de nascimento</strong>: {{=it.birthDate}}</p>
  <p><strong>Cidade</strong>: {{=it.city}}</p>
  <p><strong>Estado</strong>: {{=it.state}}</p>
  <p><strong>Area de atuação</strong>: {{=it.occupationArea}}</p>
  <p><strong>Instituição</strong>: {{=it.institute}}</p>
  <p><strong>Teria interesse de hospedar-se em alojamento? Caso seja oferecido</strong>: {{=it.interestedInStayingInAccommodation}}</p>
`)

export const new_enrolled = email_base(`
  <p>Olá, {{=it.name}}!</p>
  <p>Seu cadastro foi realizado com sucesso!</p>
  <p>Em breve entraremos em contato com mais informações.</p>
  <p>Área do inscrito: <a href="{{=it.link}}" target="_blank" rel="noopener noreferrer">Clique aqui para acessar a area do inscrito</a></p>
  <p>Pela area do inscrito você pode submeter trabalhos e astro fotografias.</p>
  <p>Atenciosamente, equipe Simposio trocar nome.</p>
`)

export const new_astrophotography_owner = email_base(`
  <p>Dados de quem enviou a astrofotografia:</p>
  <p><strong>Nome</strong>: {{=it.name}}</p>
  <p><strong>E-mail</strong>: {{=it.email}}</p>
  <p><strong>CPF</strong>: {{=it.document}}</p>
  <p><strong>Telefone</strong>: {{=it.phone}}</p>
  <p><strong>Data de nascimento</strong>: {{=it.birthDate}}</p>
  <p><strong>Cidade</strong>: {{=it.city}}</p>
  <p><strong>Estado</strong>: {{=it.state}}</p>
  <p><strong>Area de atuação</strong>: {{=it.occupationArea}}</p>
  <p><strong>Instituição</strong>: {{=it.institute}}</p>

  <p>Informações da astrofotografia:</p>
  <p><strong>Título</strong>: {{=it.title}}</p>
  <p><strong>Data</strong>: {{=it.date}}</p>
  <p><strong>Equipamento</strong>: {{=it.equipment}}</p>
  <p><strong>Detalhes da imagem</strong>: {{=it.image_details}}</p>
  <p><strong>Foto sem marca d'água</strong>: <a href="{{=it.link_photo}}" target="_blank" rel="noopener noreferrer">Foto</a></p>
`)

export const new_astrophotography = email_base(`
  <p>Olá, {{=it.name}}!</p>
  <p>Sua astrofotografia {{=it.title}} foi enviada com sucesso!</p>
  <p>Em breve entraremos em contato com mais informações.</p>
  <p>Atenciosamente, equipe Simposio trocar nome.</p>
`)

export const new_work_owner = email_base(`
  <p>Dados de quem enviou o trabalho:</p>
  <p><strong>Nome</strong>: {{=it.name}}</p>
  <p><strong>E-mail</strong>: {{=it.email}}</p>
  <p><strong>CPF</strong>: {{=it.document}}</p>
  <p><strong>Telefone</strong>: {{=it.phone}}</p>
  <p><strong>Data de nascimento</strong>: {{=it.birthDate}}</p>
  <p><strong>Cidade</strong>: {{=it.city}}</p>
  <p><strong>Estado</strong>: {{=it.state}}</p>
  <p><strong>Area de atuação</strong>: {{=it.occupationArea}}</p>
  <p><strong>Instituição</strong>: {{=it.institute}}</p>

  <p>Informações do trabalho:</p>
  <p><strong>Título</strong>: {{=it.title}}</p>
  <p><strong>Resumo</strong>: {{=it.abstract}}</p>
  <p><strong>Nome do apresentador</strong>: {{=it.presenterName}}</p>
  <p><strong>Instituição do apresentador</strong>: {{=it.presenterInstitute}}</p>
  <p><strong>Autores</strong>: {{=it.authors}}</p>
`)

export const new_work = email_base(`
  <p>Olá, {{=it.name}}!</p>
  <p>Seu trabalho {{=it.title}} foi enviado com sucesso!</p>
  <p>Em breve entraremos em contato com mais informações.</p>
  <p>Atenciosamente, equipe Simposio trocar nome.</p>
`)
