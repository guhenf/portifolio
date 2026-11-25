// Todo o conteúdo editável do site fica aqui.

export const GITHUB = 'https://github.com/guhenf'
export const LINKEDIN = 'https://www.linkedin.com/in/guhenf'
export const EMAIL = 'guhenf@gmail.com'

export const stackMain = ['C#', '.NET', 'React', 'TypeScript', 'Rest API']
export const stackOther = ['JavaScript', 'Next.js', 'HTML e CSS', 'DDD', 'Git']
export const stackOther2 = ['Nest.js', 'DDD', 'Docker']
export const languages = ['Português nativo', 'Inglês intermediário']

export type Project = {
  name: string
  description: string
  tags: string[]
  repo: string
  live?: string
}

export const projects: Project[] = [
  { name: 'Portfólio em React', description: 'Este site: React, TypeScript e Vite, com um mini game em canvas.', tags: ['React', 'TypeScript', 'Vite'], repo: 'guhenf' },
  { name: 'ClinAgenda', description: 'Front-end de um sistema de agendamento para clínicas.', tags: ['Vue'], repo: 'clinAgenda-Frontend' },
  { name: 'Tic Tac Toe', description: 'Jogo da velha para web, pensado primeiro para celular.', tags: ['HTML', 'CSS', 'JavaScript'], repo: 'ticaoegame' },
  { name: 'Teste técnico Pecege', description: 'Teste técnico para vaga de desenvolvedor front-end, publicado na Vercel.', tags: ['Next.js', 'JavaScript'], repo: 'pecege-test-next', live: 'https://pecege-test-next.vercel.app' },
  { name: 'Introdução a DDD', description: 'Estudos de Domain-Driven Design em C#.', tags: ['C#', '.NET', 'DDD'], repo: 'introducao_em_DDD' },
  { name: 'Toggle theme', description: 'Base com alternância de tema claro e escuro para usar em aplicações futuras.', tags: ['TypeScript'], repo: 'toggletheme' },
  { name: 'Pets API', description: 'API desenvolvida no curso VemSerDev.', tags: ['TypeScript', 'API'], repo: 'pets' },
]

export type Job = { when: string; role: string; company: string; current?: boolean; description?: string }

export const jobs: Job[] = [
  { when: 'nov 2025 – hoje', role: 'Programador', company: 'Rede Drogal', description: 'Atuação em projetos de desenvolvimento de software, com foco em qualidade e entregas eficientes e otimizadas.', current: true },
  { when: 'jan – dez 2025', role: 'Desenvolvedor Fullstack', company: 'Algorama', description: 'Soluções sob medida para clientes, com foco em escalabilidade e performance. Aplicações web em .NET e Blazor.' },
  { when: 'ago 2024 – jan 2025', role: 'Desenvolvedor Web', company: 'URL Grátis', description: 'Desenvolvimento de aplicações web responsivas em React com Shadcn.' },
  { when: '2024', role: 'Cozinheiro', company: 'Bar do Ilson', description: 'Do recebimento e armazenamento ao preparo e finalização, com foco em qualidade, organização e agilidade.' },
  { when: '2022 – 2024', role: 'Assistente técnico', company: 'Motan Group', description: 'Manutenção e suporte técnico em campo tanto de equipamentos como os softwares de clientes.' },
  { when: '2020 – 2021', role: 'Técnico em Química, controle de qualidade', company: 'Hyundai Motor Brasil', description: 'Responsável pelo laboratório de química do prédio de pintura: análise e aprovação de materiais para a linha de produção e monitoramento de cor das carrocerias.' },
]

export const education: [string, string][] = [
  ['Análise e Desenvolvimento de Sistemas', 'Estácio · 2024 – 2026'],
  ['Técnico em Química', 'ETEC Cel. Fernando Febeliano da Costa · 2020 – 2021'],
  ['Gastronomia', 'Universidade São Francisco · 2017 – 2018'],
]

export const community: [string, string][] = [
  ['DEVPIRA', 'Contribuição no site da comunidade dev de Piracicaba'],
  ['VemSerDev', 'Participante do curso, com projeto de API'],
  ['Instituto Passe de Mágica', 'Ex-aluno, medalha de mérito'],
]

// Palavras que sobem a cada cesta no jogo da Kelly
export const blessings = ['Amém', 'Luz', 'Paz', 'Obrigado, Kelly', 'Gratidão', 'Saudade', 'Descanse em paz', 'Deus te guarde', 'Para sempre', 'Fica com Deus']
