
import { Technique } from './types';

export const COLORS = {
  primary: '#1E88FE',
  white: '#FFFFFF',
  text: '#0E0E0E',
  bg: '#F8FAFC',
};

export const SYSTEM_INSTRUCTION = `
Você é a Calma, uma presença dedicada ao suporte emocional e ao desenvolvimento da resiliência mental.

DIRETRIZES DE PERSONALIDADE E CONDUTA:
1. ADAPTABILIDADE (TOM CAMALEÔNICO): Analise o vocabulário e o estado emocional do usuário. Se ele for informal ou usar gírias, adapte-se suavemente para criar rapport. Se ele for polido e formal, responda com elegância e precisão.
2. CURIOSIDADE INVESTIGATIVA: Não se limite a dar conselhos. Seja uma ouvinte ativa e curiosa. Sempre que o usuário introduzir um novo elemento (ex: "minha namorada", "meu novo emprego", "uma viagem"), você deve fazer perguntas abertas e gentis para entender o contexto antes de opinar.
   - Exemplo: "É a primeira vez que menciona seu relacionamento. Como você se sente em relação a ela ultimamente?"
3. VALIDAÇÃO EMPÁTICA: Antes de sugerir qualquer ação ou técnica, valide o que o usuário está sentindo. Utilize frases como "Compreendo a profundidade do que compartilha" ou "É natural sentir-se assim diante dessas circunstâncias".
4. EVITE PADRÕES MECÂNICOS: Fuja de respostas clichês de assistentes virtuais. Sua voz deve soar como a de um mentor ou amigo sábio e atencioso.
5. SIGILO E SEGURANÇA: Reitere que este é um espaço seguro. Em casos de risco, oriente o contato com o CVV (188) de forma solene e cuidadosa.

O objetivo fundamental é que o usuário sinta que está em um diálogo real com alguém que realmente deseja conhecer a história dele.
`;

export const TECHNIQUES: Technique[] = [
  {
    id: 'grounding-54321',
    title: 'Ancoragem Sensorial (5-4-3-2-1)',
    category: 'Anxiety',
    description: 'Um protocolo estruturado para restabelecer a conexão com o momento presente através dos sentidos.',
    steps: [
      'Identifique 5 elementos visuais em seu ambiente imediato.',
      'Reconheça 4 texturas ou superfícies ao seu alcance.',
      'Atente-se a 3 estímulos auditivos distintos.',
      'Perceba 2 aromas presentes no ambiente.',
      'Identifique 1 paladar ou sensação bucal residual.'
    ]
  },
  {
    id: 'breath-478',
    title: 'Ciclo Respiratório Terapêutico (4-7-8)',
    category: 'Relaxation',
    description: 'Técnica de regulação autonômica projetada para promover a estabilidade e a serenidade profunda.',
    steps: [
      'Expire completamente todo o ar residual dos pulmões.',
      'Inspire profundamente pelas narinas durante 4 segundos.',
      'Retenha a respiração de forma confortável por 7 segundos.',
      'Exale o ar suavemente pela boca durante 8 segundos.'
    ]
  },
  {
    id: 'muscle-relaxation',
    title: 'Relaxamento Muscular Progressivo',
    category: 'Relaxation',
    description: 'Redução sistemática da tensão física acumulada no organismo para alívio do estresse.',
    steps: [
      'Inicie a atenção pelos membros inferiores, progredindo gradualmente.',
      'Contraia grupos musculares específicos por 5 segundos.',
      'Libere a tensão subitamente, observando a sensação de alívio.',
      'Prossiga com o exercício até atingir a região cervical e facial.'
    ]
  },
  {
    id: 'thought-restructure',
    title: 'Reestruturação Cognitiva',
    category: 'Anxiety',
    description: 'Análise criteriosa e acolhedora de padrões de pensamento para o desenvolvimento de uma perspectiva equilibrada.',
    steps: [
      'Identifique o pensamento que gera desconforto emocional.',
      'Questione a evidência real dessa preocupação no momento atual.',
      'Considere qual orientação você ofereceria a alguém estimado em situação idêntica.',
      'Reformule a narrativa interna com mais compaixão e clareza objetiva.'
    ]
  }
];
