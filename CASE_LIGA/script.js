/**
 * LIA UFSCar - Painel de Gestão Estratégica de Oportunidades
 * Ciclo Estratégico 2026.2 (Capacidade Ativa: 6 Membros)
 * 
 * Funcionalidades Interativas:
 * 1. Simulador de Capacidade em Tempo Real (What-If Analysis & Alertas de Sobrecarga)
 * 2. Alternador de Visualização (Grade de Cartões vs Quadro Kanban com Drag & Drop)
 * 3. Linha do Tempo Interativa de Prazos (Outubro 2026 com Navegação Suave)
 * 4. Checklist Interativo de Ações & Pendências com Persistência
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. BASE DE DADOS OFICIAL DAS 6 ORGANIZAÇÕES (LIA UFSCar 2026.2)
  // =========================================================================
  const defaultOrganizations = [
    {
      id: "meridian",
      name: "Meridian Estratégia",
      segment: "Consultoria Estratégica & Gestão",
      icon: "fa-chart-pie",
      iconColor: "#06b6d4",
      status: "executar",
      statusLabel: "Executar Agora",
      priority: "Alta (Urgência Limite)",
      priorityClass: "priority-urgente",
      justificativa: "Workshop de apenas uma manhã. Baixo esforço técnico contínuo e altíssima visibilidade para 20 alunos e consultores.",
      proximaAcao: "Responder ao Raul confirmando o interesse e indicando o responsável da LIA.",
      responsavel: "Relações Institucionais / Operações",
      responsavelTag: "RI / Ops",
      prazo: "01/10/2026",
      prazoDate: "2026-10-01",
      isUrgentDeadline: true,
      pendencias: "Definição dos objetivos de aprendizagem pretendidos e mobilização dos alunos da UFSCar.",
      hasPendencias: true,
      membrosAlocados: 0, // Evento pontual de 1 manhã
      dedicacaoOriginal: "1 membro na coordenação prévia + 6 membros presentes no evento.",
      highlight: "Resposta Crítica",
      actionDone: false,
      pendenciaDone: false
    },
    {
      id: "senda",
      name: "Senda Patrimonial",
      segment: "Gestão Patrimonial & Wealth Management",
      icon: "fa-shield-halved",
      iconColor: "#10b981",
      status: "executar",
      statusLabel: "Executar Agora",
      priority: "Alta",
      priorityClass: "priority-alta",
      justificativa: "Piloto de baixo risco operacional e sem dados sensíveis de clientes reais, consumindo apenas 33% da equipe por 4 semanas.",
      proximaAcao: "Confirmar aceite do piloto e alinhar palestra sobre carreira com Theo.",
      responsavel: "Relações Institucionais",
      responsavelTag: "RI",
      prazo: "02/10/2026",
      prazoDate: "2026-10-02",
      isUrgentDeadline: true,
      pendencias: "Validação do fluxo de dados sanitizados junto à equipe de formação da Senda.",
      hasPendencias: true,
      membrosAlocados: 2, // 2 membros por 4 semanas (33% contínuo)
      dedicacaoOriginal: "2 membros por 4 semanas.",
      highlight: "Início Imediato",
      actionDone: false,
      pendenciaDone: false
    },
    {
      id: "violeta",
      name: "Violeta Financeira",
      segment: "Fintech & Soluções de Crédito",
      icon: "fa-wallet",
      iconColor: "#a855f7",
      status: "postergar",
      statusLabel: "Postergar",
      priority: "Média",
      priorityClass: "priority-media",
      justificativa: "Projeto estruturado de 3 meses estouraria a capacidade atual de 6 membros simultaneamente à Senda e Brava.",
      proximaAcao: "Realizar reunião de 30 min e formalizar inclusão do projeto no ciclo do próximo semestre.",
      responsavel: "Growth / RI",
      responsavelTag: "Growth / RI",
      prazo: "05/10/2026",
      prazoDate: "2026-10-05",
      isUrgentDeadline: false,
      pendencias: "Agendamento do horário definitivo da reunião de alinhamento com a equipe da Violeta.",
      hasPendencias: true,
      membrosAlocados: 0,
      dedicacaoOriginal: "1 membro para reunião pontual de 30 min (0 membros em execução no momento).",
      highlight: "Ciclo 2027.1",
      actionDone: false,
      pendenciaDone: false
    },
    {
      id: "brava",
      name: "Brava Consultoria",
      segment: "Treinamento & Métodos de Consultoria",
      icon: "fa-graduation-cap",
      iconColor: "#f59e0b",
      status: "preparar",
      statusLabel: "Preparar",
      priority: "Média-Alta",
      priorityClass: "priority-media-alta",
      justificativa: "Capacitação de 6 semanas em metodologias de consultoria de alto nível sem a pressão de entrega comercial direta.",
      proximaAcao: "Enviar aceite da formação e alinhar cronograma de aulas.",
      responsavel: "Operações",
      responsavelTag: "Operações",
      prazo: "07/10/2026",
      prazoDate: "2026-10-07",
      isUrgentDeadline: false,
      pendencias: "Seleção interna dos 3 membros participantes e compatibilização de agenda pós-piloto Senda.",
      hasPendencias: true,
      membrosAlocados: 0, // Previsto 3 membros na 2ª quinzena de outubro
      dedicacaoOriginal: "3 membros por 6 semanas (início na 2ª quinzena de outubro).",
      highlight: "Capacitação Time",
      actionDone: false,
      pendenciaDone: false
    },
    {
      id: "prisma",
      name: "Prisma Estratégica",
      segment: "Inteligência de Mercado & Competitiva",
      icon: "fa-compass",
      iconColor: "#64748b",
      status: "postergar",
      statusLabel: "Postergar",
      priority: "Baixa-Média",
      priorityClass: "priority-baixa-media",
      justificativa: "Manter relacionamento institucional sem consumo de horas operacionais; alinhar desafio para o ciclo de novembro.",
      proximaAcao: "Enviar apresentação institucional (deck) e agendar conversa inicial de 20 min.",
      responsavel: "Growth",
      responsavelTag: "Growth",
      prazo: "15/10/2026",
      prazoDate: "2026-10-15",
      isUrgentDeadline: false,
      pendencias: "Revisão final e envio do deck institucional da LIA.",
      hasPendencias: true,
      membrosAlocados: 0,
      dedicacaoOriginal: "1 membro por 2 horas (preparação e conversa).",
      highlight: "Nutrição de Lead",
      actionDone: false,
      pendenciaDone: false
    },
    {
      id: "aerion",
      name: "Aerion Sistemas Aeroespaciais",
      segment: "Tecnologia Aeroespacial & Defesa",
      icon: "fa-jet-fighter",
      iconColor: "#f43f5e",
      status: "nao-assumir",
      statusLabel: "Não Assumir",
      priority: "Baixa",
      priorityClass: "priority-baixa",
      justificativa: "Escopo extenso de 5 meses com alta complexidade técnica e elevado risco de atraso para o tamanho atual da equipe.",
      proximaAcao: "Responder declinando o projeto longo e propondo visita técnica exploratória na sede da empresa em novembro.",
      responsavel: "Relações Institucionais",
      responsavelTag: "RI",
      prazo: "16/10/2026",
      prazoDate: "2026-10-16",
      isUrgentDeadline: false,
      pendencias: "Nenhuma (decisão de declínio tomada).",
      hasPendencias: false,
      membrosAlocados: 0,
      dedicacaoOriginal: "0 membros em desenvolvimento (apenas visita institucional em novembro).",
      highlight: "Visita Técnica",
      actionDone: false,
      pendenciaDone: false
    }
  ];

  // Carrega estado persistido ou usa o oficial
  let organizationsData = loadSavedState();

  function loadSavedState() {
    try {
      const saved = localStorage.getItem('lia_dashboard_state_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === defaultOrganizations.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Falha ao carregar estado salvo, utilizando padrão oficial.', e);
    }
    return JSON.parse(JSON.stringify(defaultOrganizations));
  }

  function persistState() {
    try {
      localStorage.setItem('lia_dashboard_state_v1', JSON.stringify(organizationsData));
    } catch (e) {
      console.warn('Falha ao persistir dados no localStorage', e);
    }
  }

  // =========================================================================
  // 2. MODELOS DE COMUNICAÇÃO INSTITUCIONAL (Meridian, Senda, Unificado)
  // =========================================================================
  const communicationTemplates = {
    meridian: {
      recipient: "Raul (Meridian Estratégia)",
      subject: "Confirmação de Interesse & Workshop Conjunto | LIA UFSCar",
      channel: "Relações Institucionais / Operações (Prazo: 01/10/2026)",
      text: `Prezado Raul e equipe da Meridian Estratégia,

Em nome da Diretoria da Liga de Inteligência Artificial da UFSCar (LIA), confirmo oficialmente nosso grande interesse e entusiasmo na realização conjunta do workshop de IA aplicada à consultoria estratégica.

Avaliamos nossa capacidade operacional e entendemos que este evento possui altíssimo alinhamento pedagógico e institucional:
1. Coordenação Prévia: 1 membro de nossa diretoria ficará dedicado ao alinhamento prévio dos tópicos técnicos e dinâmica do encontro;
2. Presença Integral: Todos os nossos 6 membros ativos estarão presencialmente engajados na condução;
3. Mobilização Estudantil: Abriremos as inscrições para a comunidade acadêmica da UFSCar de modo a preencher o público previsto de 20 alunos e consultores.

Em cumprimento ao prazo acordado de 01/10/2026, formalizamos nosso aceite e indicamos nosso responsável de Relações Institucionais e Operações como ponto focal direto para o alinhamento de agenda.

Ficamos no aguardo das orientações para um alinhamento rápido de 20 minutos com a equipe da Meridian.

Atenciosamente,

Diretoria de Relações Institucionais & Operações
Liga de Inteligência Artificial (LIA UFSCar)
Universidade Federal de São Carlos`
    },

    senda: {
      recipient: "Theo (Senda Patrimonial)",
      subject: "Confirmação de Aceite do Projeto Piloto & Alinhamento de Palestra | LIA UFSCar",
      channel: "Relações Institucionais (Prazo: 02/10/2026)",
      text: `Prezado Theo e equipe Senda Patrimonial,

A Liga de Inteligência Artificial da UFSCar (LIA) tem a satisfação de confirmar o aceite formal para a realização do Projeto Piloto conjunto.

Nossa decisão estratégica baseou-se nos seguintes pontos acordados:
1. Alocação Focada: Alocamos 2 membros dedicados de nossa equipe técnica para atuar exclusivamente ao longo das 4 semanas de projeto (consumindo exatamente 33% da nossa capacidade global);
2. Conformidade & Segurança: Registramos positivamente o modelo acordado com fluxo de dados sanitizados (sem dados sensíveis ou informações de clientes reais), garantindo conformidade acadêmica e técnica;
3. Palestra de Carreira: Reiteramos nosso enorme entusiasmo em realizar a palestra sobre carreiras no mercado financeiro e patrimonial conduzida por você para os membros da LIA e alunos da UFSCar.

Conforme o prazo limite de 02/10/2026, formalizamos este aceite. Nosso responsável de Relações Institucionais entrará em contato para alinhar os detalhes finais do fluxo de dados com a equipe de formação da Senda.

Agradecemos a confiança e estamos prontos para gerar valor mútuo neste piloto!

Cordialmente,

Diretoria de Relações Institucionais & Operações
Liga de Inteligência Artificial (LIA UFSCar)
Universidade Federal de São Carlos`
    },

    unified: {
      recipient: "Membros da LIA & Stakeholders Externos",
      subject: "Consolidação de Despachos Estratégicos | Ciclo 2026.2",
      channel: "Diretoria Colegiada (LIA UFSCar)",
      text: `===================================================================
PAINEL DE DESPACHOS OFICIAIS DA LIA UFSCAR - CICLO 2026.2
===================================================================

[RESUMO DE DECISÕES DO FUNIL DE OPORTUNIDADES]
• Capacidade Operacional: 6 membros ativos no ciclo atual
• Alocação Efetiva Atual: 2 membros dedicados no piloto Senda (33% da equipe)
• Pipeline Ativo: Senda (Piloto), Meridian (Workshop) e Brava (Capacitação)

1. MERIDIAN ESTRATÉGIA (Prazo: 01/10/2026) -> CONFIRMADO
   - Situação: Executar Agora | Prioridade: Alta (Urgência Limite)
   - Formato: Workshop de 1 manhã para 20 alunos e consultores.
   - Dedicação: 1 coordenador prévio + 6 membros presentes.

2. SENDA PATRIMONIAL (Prazo: 02/10/2026) -> CONFIRMADO
   - Situação: Executar Agora | Prioridade: Alta
   - Formato: Piloto de 4 semanas com dados sanitizados + Palestra com Theo.
   - Dedicação: 2 membros dedicados por 4 semanas (33% da equipe).

3. BRAVA CONSULTORIA (Prazo: 07/10/2026) -> PREPARAR
   - Capacitação de 6 semanas em metodologias de consultoria.
   - Início na 2ª quinzena de outubro (3 membros participantes).

4. VIOLETA FINANCEIRA -> POSTERGAR
   - Reunião de 30 min (05/10) para inclusão programada em 2027.1.

5. PRISMA ESTRATÉGICA -> POSTERGAR
   - Envio de deck institucional e agendamento de call de 20 min (15/10).

6. AERION SISTEMAS AEROESPACIAIS -> NÃO ASSUMIR
   - Declinado projeto longo de 5 meses; proposta de visita técnica em novembro.

Todas as ações encontram-se com responsáveis definidos e cronograma vigente.`
    }
  };

  // =========================================================================
  // 3. ELEMENTOS DA INTERFACE (DOM)
  // =========================================================================
  const organizationsContainer = document.getElementById('organizationsContainer');
  const kanbanContainer = document.getElementById('kanbanContainer');
  const noResultsMessage = document.getElementById('noResultsMessage');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const resultsSummaryText = document.getElementById('resultsSummaryText');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const timelineTrack = document.getElementById('timelineTrack');

  // Alternador de Visualização & Reset
  const btnViewGrid = document.getElementById('btnViewGrid');
  const btnViewKanban = document.getElementById('btnViewKanban');
  const btnResetSimulation = document.getElementById('btnResetSimulation');
  const tasksCompletedCount = document.getElementById('tasksCompletedCount');

  // KPIs DOM
  const kpiOperacoes = document.getElementById('kpi-operacoes');
  const kpiAllocVal = document.getElementById('kpiAllocVal');
  const kpiAllocFraction = document.getElementById('kpiAllocFraction');
  const kpiAllocBar = document.getElementById('kpiAllocBar');
  const kpiAllocTrend = document.getElementById('kpiAllocTrend');
  const kpiAllocDesc = document.getElementById('kpiAllocDesc');
  const kpiAllocLabelAlocado = document.getElementById('kpiAllocLabelAlocado');
  const kpiAllocLabelLivre = document.getElementById('kpiAllocLabelLivre');

  const kpiConvVal = document.getElementById('kpiConvVal');
  const kpiConvFraction = document.getElementById('kpiConvFraction');
  const kpiConvBar = document.getElementById('kpiConvBar');
  const kpiConvDesc = document.getElementById('kpiConvDesc');
  const kpiConvLabelAprovadas = document.getElementById('kpiConvLabelAprovadas');
  const kpiConvLabelOutras = document.getElementById('kpiConvLabelOutras');

  const kpiRespVal = document.getElementById('kpiRespVal');
  const kpiRespFraction = document.getElementById('kpiRespFraction');
  const kpiRespBar = document.getElementById('kpiRespBar');
  const kpiRespLabelPontual = document.getElementById('kpiRespLabelPontual');
  const kpiRespLabelSLA = document.getElementById('kpiRespLabelSLA');

  // Elementos de Comunicação
  const partnerTabs = document.querySelectorAll('.partner-tab');
  const emailDraftTextarea = document.getElementById('emailDraftTextarea');
  const commRecipient = document.getElementById('commRecipient');
  const commSubject = document.getElementById('commSubject');
  const commChannel = document.getElementById('commChannel');
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const copyBtnText = document.getElementById('copyBtnText');

  // Elementos do Modal
  const detailModal = document.getElementById('detailModal');
  const modalOrgTitle = document.getElementById('modalOrgTitle');
  const modalOrgStatusBadge = document.getElementById('modalOrgStatusBadge');
  const modalOrgContent = document.getElementById('modalOrgContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalActionBtn = document.getElementById('modalActionBtn');

  // Toast Container & Export
  const toastContainer = document.getElementById('toastContainer');
  const btnQuickExport = document.getElementById('btnQuickExport');

  // Estado atual
  let currentFilter = 'all';
  let searchQuery = '';
  let currentViewMode = 'grid'; // 'grid' | 'kanban'

  // =========================================================================
  // 4. RECÁLCULO DINÂMICO DE KPIS (SIMULADOR DE CAPACIDADE EM TEMPO REAL)
  // =========================================================================
  function recalculateKPIs() {
    // 1. Operações: Alocação da Equipe (Limite rigoroso: 6 membros)
    // Membros dedicados em oportunidades com status "executar"
    const membrosAlocados = organizationsData
      .filter(org => org.status === 'executar')
      .reduce((sum, org) => sum + (org.membrosAlocados || 0), 0);

    const percentAlloc = Math.round((membrosAlocados / 6) * 100);
    const livre = 6 - membrosAlocados;

    kpiAllocVal.textContent = `${percentAlloc}%`;
    kpiAllocFraction.textContent = `${membrosAlocados} / 6 membros`;
    kpiAllocBar.style.width = `${Math.min(percentAlloc, 100)}%`;
    kpiAllocLabelAlocado.textContent = `Alocado: ${percentAlloc}%`;

    if (membrosAlocados > 6) {
      // SOBRECARGA DETECTADA
      kpiOperacoes.classList.add('overcapacity');
      kpiAllocTrend.className = 'kpi-trend overcapacity';
      kpiAllocTrend.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> SOBRECARGA (+${membrosAlocados - 6})`;
      kpiAllocLabelLivre.textContent = `Déficit: -${membrosAlocados - 6} membros!`;
      kpiAllocDesc.textContent = `Atenção: A capacidade máxima de 6 membros da LIA foi excedida nesta simulação!`;
      kpiAllocBar.style.background = '#ef4444';
    } else {
      kpiOperacoes.classList.remove('overcapacity');
      kpiAllocTrend.className = 'kpi-trend positive';
      kpiAllocTrend.innerHTML = `<i class="fa-solid fa-shield-check"></i> Seguro`;
      kpiAllocLabelLivre.textContent = `Margem Livre: ${Math.max(0, 100 - percentAlloc)}% (${livre} membros)`;
      kpiAllocDesc.textContent = `${membrosAlocados} de 6 membros alocados em projetos de execução ativa.`;
      kpiAllocBar.style.background = 'var(--status-executar)';
    }

    // 2. Growth: Taxa de Conversão do Funil (Executar + Preparar)
    const aprovadas = organizationsData.filter(org => org.status === 'executar' || org.status === 'preparar').length;
    const outras = organizationsData.length - aprovadas;
    const percentConv = Math.round((aprovadas / organizationsData.length) * 100);

    kpiConvVal.textContent = `${percentConv}%`;
    kpiConvFraction.textContent = `${aprovadas} / ${organizationsData.length} empresas`;
    kpiConvBar.style.width = `${percentConv}%`;
    kpiConvLabelAprovadas.textContent = `Aprovadas: ${aprovadas}`;
    kpiConvLabelOutras.textContent = `Postergar/Declinar: ${outras}`;

    // 3. Relações Institucionais: Índice de Resposta aos Prazos & Conclusão de Ações
    const totalAcoes = organizationsData.length;
    const acoesConcluidas = organizationsData.filter(org => org.actionDone).length;
    const totalPendencias = organizationsData.filter(org => org.hasPendencias).length;
    const pendenciasResolvidas = organizationsData.filter(org => org.hasPendencias && org.pendenciaDone).length;
    
    // Contagem global de tarefas
    const totalTarefas = totalAcoes + totalPendencias;
    const tarefasResolvidas = acoesConcluidas + pendenciasResolvidas;
    tasksCompletedCount.textContent = `${tarefasResolvidas}/${totalTarefas}`;

    // O índice de cumprimento considera as respostas imediatas
    const respPercent = 100; // SLA de resposta 100% no ciclo oficial
    kpiRespVal.textContent = `${respPercent}%`;
    kpiRespFraction.textContent = `${acoesConcluidas} ações concluídas`;
    kpiRespBar.style.width = `${respPercent}%`;
    kpiRespLabelPontual.textContent = `Pontualidade: 100%`;
    kpiRespLabelSLA.textContent = `Pendências: ${totalPendencias - pendenciasResolvidas} ativas`;
  }

  // =========================================================================
  // 5. RENDERIZAÇÃO DA LINHA DO TEMPO INTERATIVA (OUTUBRO / 2026)
  // =========================================================================
  function renderTimeline() {
    // Ordena por data cronológica (01/10 até 16/10)
    const sorted = [...organizationsData].sort((a, b) => a.prazoDate.localeCompare(b.prazoDate));

    timelineTrack.innerHTML = sorted.map(org => {
      const isUrgent = org.isUrgentDeadline;
      const isDone = org.actionDone;
      const statusClass = isDone ? 'done-node' : (isUrgent ? 'urgent-node' : '');

      return `
        <div class="timeline-node ${statusClass}" data-id="${org.id}" title="Clique para focar em ${org.name}">
          <div class="timeline-node-top">
            <span class="timeline-date-badge">
              <i class="fa-solid fa-calendar-day"></i> ${org.prazo}
            </span>
            <span class="timeline-tag-status status-badge-${org.status}">
              ${org.statusLabel}
            </span>
          </div>

          <div class="timeline-node-org">
            <i class="fa-solid ${org.icon}" style="color: ${org.iconColor};"></i>
            <span>${org.name}</span>
          </div>

          <p class="timeline-node-action">
            ${org.proximaAcao}
          </p>

          <div class="timeline-node-footer">
            <span><i class="fa-solid fa-user-gear"></i> ${org.responsavelTag}</span>
            <span class="timeline-task-status ${isDone ? 'completed' : 'pending'}">
              <i class="fa-solid ${isDone ? 'fa-circle-check' : 'fa-clock'}"></i>
              ${isDone ? 'Ação Feita' : 'Ação Aberta'}
            </span>
          </div>
        </div>
      `;
    }).join('');

    // Eventos de clique nos nós da timeline para navegação instantânea
    document.querySelectorAll('.timeline-node').forEach(node => {
      node.addEventListener('click', () => {
        const orgId = node.dataset.id;
        focusOrganization(orgId);
      });
    });
  }

  // Foco suave com scroll e animação de destaque
  window.focusOrganization = function(orgId) {
    const org = organizationsData.find(o => o.id === orgId);
    if (!org) return;

    // Se o filtro atual ocultar o card, volta para "Todos"
    if (currentFilter !== 'all' && org.status !== currentFilter) {
      currentFilter = 'all';
      filterPills.forEach(p => {
        if (p.dataset.filter === 'all') {
          p.classList.add('active');
          p.setAttribute('aria-selected', 'true');
        } else {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        }
      });
      renderCurrentView();
    }

    // Scroll até o card
    setTimeout(() => {
      const cardElement = document.getElementById(`card-${orgId}`);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cardElement.classList.remove('highlight-pulse');
        // Force reflow
        void cardElement.offsetWidth;
        cardElement.classList.add('highlight-pulse');

        showToast(`Focando em ${org.name} (Prazo: ${org.prazo})`, 'info');
      }
    }, 50);
  };

  // =========================================================================
  // 6. RENDERIZAÇÃO DOS CARTÕES EM GRADE (GRID PADRÃO)
  // =========================================================================
  function renderOrganizationsGrid() {
    const filtered = getFilteredOrganizations();
    updateCounts();
    resultsSummaryText.innerHTML = `Mostrando <strong>${filtered.length} de ${organizationsData.length}</strong> oportunidades`;

    if (filtered.length === 0) {
      organizationsContainer.innerHTML = '';
      noResultsMessage.style.display = 'block';
      return;
    }

    noResultsMessage.style.display = 'none';

    organizationsContainer.innerHTML = filtered.map(org => {
      // Pips de capacidade interativos (clique para definir alocação de 1 a 6)
      const pipsHtml = Array.from({ length: 6 }).map((_, idx) => {
        const pipIndex = idx + 1;
        const isFilled = pipIndex <= org.membrosAlocados;
        const fillClass = isFilled ? getFillClassByStatus(org.status) : '';
        return `
          <span class="capacity-pip interactive ${fillClass}" 
                title="Definir ${pipIndex} membro${pipIndex > 1 ? 's' : ''}" 
                onclick="setAllocation('${org.id}', ${pipIndex === org.membrosAlocados ? 0 : pipIndex})">
          </span>
        `;
      }).join('');

      return `
        <article class="org-card" data-status="${org.status}" id="card-${org.id}">
          
          <!-- Header do Card -->
          <div class="org-card-header">
            <div class="org-badges-row">
              <span class="status-badge status-badge-${org.status}">
                <i class="fa-solid fa-circle" style="font-size: 0.5rem;"></i> ${org.statusLabel}
              </span>
              
              <!-- Seletor Rápido de Status no Card -->
              <select class="quick-status-select" onchange="changeStatus('${org.id}', this.value)" title="Alterar situação estratégica">
                <option value="executar" ${org.status === 'executar' ? 'selected' : ''}>Executar Agora</option>
                <option value="preparar" ${org.status === 'preparar' ? 'selected' : ''}>Preparar</option>
                <option value="postergar" ${org.status === 'postergar' ? 'selected' : ''}>Postergar</option>
                <option value="nao-assumir" ${org.status === 'nao-assumir' ? 'selected' : ''}>Não Assumir</option>
              </select>
            </div>

            <div class="org-title-group">
              <div class="org-icon-avatar" style="color: ${org.iconColor};">
                <i class="fa-solid ${org.icon}"></i>
              </div>
              <div style="flex: 1;">
                <h3 class="org-name">${org.name}</h3>
                <span class="org-tagline">
                  <i class="fa-solid fa-briefcase"></i> ${org.segment}
                </span>
              </div>
            </div>
          </div>

          <!-- Corpo do Card: Os 6 Campos com Interatividade -->
          <div class="org-card-body">
            
            <!-- Campo 3: Justificativa -->
            <div class="field-box field-justificativa">
              <span class="field-label">
                <i class="fa-solid fa-lightbulb"></i> Justificativa Estratégica
              </span>
              <div class="field-value">${org.justificativa}</div>
            </div>

            <!-- Campo 4: Próxima Ação (Checklist Interativo) -->
            <div class="field-action-container">
              <div class="interactive-checklist">
                <div class="checklist-item ${org.actionDone ? 'is-done' : ''}" onclick="toggleTask('${org.id}', 'action')">
                  <div class="custom-checkbox">
                    <i class="fa-solid fa-check"></i>
                  </div>
                  <div class="checklist-content">
                    <span class="checklist-label-tag">
                      <i class="fa-solid fa-list-check"></i> Próxima Ação ${org.actionDone ? '(Concluída)' : ''}
                    </span>
                    <span class="checklist-text">${org.proximaAcao}</span>
                  </div>
                </div>
              </div>

              <div class="field-meta-row" style="margin-top: 0.55rem;">
                <span class="responsible-pill" title="Responsável por função">
                  <i class="fa-solid fa-user-gear"></i> ${org.responsavel}
                </span>
                <span class="deadline-pill ${org.isUrgentDeadline ? 'urgent-date' : ''}" title="Prazo fatal">
                  <i class="fa-solid fa-calendar-clock"></i> ${org.prazo}
                </span>
              </div>
            </div>

            <!-- Campo 5: Pendências (Checklist Interativo) -->
            <div class="field-box">
              <div class="interactive-checklist">
                <div class="checklist-item ${org.pendenciaDone ? 'is-done' : ''}" onclick="toggleTask('${org.id}', 'pendencia')">
                  <div class="custom-checkbox">
                    <i class="fa-solid fa-check"></i>
                  </div>
                  <div class="checklist-content">
                    <span class="checklist-label-tag">
                      <i class="fa-solid fa-triangle-exclamation"></i> Pendência ${org.pendenciaDone ? '(Resolvida)' : 'Mapeada'}
                    </span>
                    <span class="checklist-text">${org.pendencias}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Campo 6: Dedicação da Equipe (Simulador com Stepper e Pips) -->
            <div class="field-box">
              <span class="field-label">
                <i class="fa-solid fa-users"></i> Dedicação da Equipe (Simulação de Capacidade)
              </span>
              <div class="field-dedicacao-box">
                <div class="dedicacao-info-row">
                  <span class="dedicacao-text">
                    ${org.membrosAlocados} membro${org.membrosAlocados !== 1 ? 's' : ''} alocado${org.membrosAlocados !== 1 ? 's' : ''}
                  </span>
                  <div class="capacity-indicators" title="Clique nos pips para definir alocação (0 a 6)">
                    ${pipsHtml}
                  </div>
                </div>

                <div class="capacity-sim-controls">
                  <span style="font-size: 0.72rem; color: var(--text-muted);">
                    <i class="fa-solid fa-sliders"></i> Ajustar membros:
                  </span>
                  <div class="sim-stepper">
                    <button class="stepper-btn" onclick="changeAllocation('${org.id}', -1)" ${org.membrosAlocados <= 0 ? 'disabled' : ''} title="Diminuir alocação">-</button>
                    <span class="stepper-value">${org.membrosAlocados}</span>
                    <button class="stepper-btn" onclick="changeAllocation('${org.id}', 1)" ${org.membrosAlocados >= 6 ? 'disabled' : ''} title="Aumentar alocação">+</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Footer do Card -->
          <div class="org-card-footer">
            <span class="card-action-flag">
              <i class="fa-solid fa-tag"></i> ${org.highlight}
            </span>
            <button class="btn-card-details" data-id="${org.id}" onclick="openDetailModal('${org.id}')">
              <span>Detalhes & Alinhamento</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

        </article>
      `;
    }).join('');
  }

  // =========================================================================
  // 7. RENDERIZAÇÃO DO QUADRO KANBAN (DRAG & DROP NATIVO)
  // =========================================================================
  function renderKanbanBoard() {
    const q = searchQuery.toLowerCase().trim();
    const columns = [
      { id: "executar", label: "Executar Agora", icon: "fa-bolt", class: "kanban-col-executar" },
      { id: "preparar", label: "Preparar", icon: "fa-clock", class: "kanban-col-preparar" },
      { id: "postergar", label: "Postergar", icon: "fa-hourglass-start", class: "kanban-col-postergar" },
      { id: "nao-assumir", label: "Não Assumir", icon: "fa-ban", class: "kanban-col-nao-assumir" }
    ];

    kanbanContainer.innerHTML = `
      <div class="kanban-board">
        ${columns.map(col => {
          const orgsInCol = organizationsData.filter(org => {
            const matchesCol = org.status === col.id;
            if (!q) return matchesCol;
            return matchesCol && (
              org.name.toLowerCase().includes(q) ||
              org.proximaAcao.toLowerCase().includes(q) ||
              org.responsavel.toLowerCase().includes(q)
            );
          });

          return `
            <div class="kanban-column ${col.class}" 
                 data-status="${col.id}" 
                 ondragover="handleDragOver(event)" 
                 ondragleave="handleDragLeave(event)" 
                 ondrop="handleDrop(event, '${col.id}')">
              
              <div class="kanban-col-header">
                <div class="kanban-col-title-wrap">
                  <i class="fa-solid ${col.icon}"></i>
                  <h4 class="kanban-col-title">${col.label}</h4>
                </div>
                <span class="kanban-col-count">${orgsInCol.length}</span>
              </div>

              <div class="kanban-col-cards">
                ${orgsInCol.length === 0 ? `
                  <div class="kanban-drop-hint">
                    <i class="fa-solid fa-arrow-down"></i>
                    <span>Arraste uma oportunidade aqui</span>
                  </div>
                ` : orgsInCol.map(org => `
                  <div class="kanban-card" 
                       id="card-${org.id}" 
                       draggable="true" 
                       ondragstart="handleDragStart(event, '${org.id}')" 
                       ondragend="handleDragEnd(event)">
                    
                    <div class="kanban-card-top">
                      <span class="kanban-card-name">
                        <i class="fa-solid ${org.icon}" style="color: ${org.iconColor};"></i>
                        ${org.name}
                      </span>
                      <span class="priority-badge ${org.priorityClass}" style="font-size: 0.65rem;">
                        ${org.priority}
                      </span>
                    </div>

                    <div class="kanban-card-meta">
                      <i class="fa-solid fa-briefcase"></i> ${org.segment}
                    </div>

                    <!-- Checklist Próxima Ação -->
                    <div class="checklist-item ${org.actionDone ? 'is-done' : ''}" 
                         style="margin-bottom: 0.45rem; padding: 0.35rem 0.5rem;" 
                         onclick="toggleTask('${org.id}', 'action')">
                      <div class="custom-checkbox" style="width: 14px; height: 14px; font-size: 0.55rem;">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <div class="checklist-content">
                        <span class="checklist-text" style="font-size: 0.72rem;">${org.proximaAcao}</span>
                      </div>
                    </div>

                    <div class="kanban-card-footer">
                      <span class="deadline-pill ${org.isUrgentDeadline ? 'urgent-date' : ''}" style="font-size: 0.65rem;">
                        <i class="fa-solid fa-clock"></i> ${org.prazo}
                      </span>
                      
                      <!-- Stepper de Capacidade Compacto -->
                      <div class="sim-stepper" style="transform: scale(0.9);">
                        <button class="stepper-btn" onclick="changeAllocation('${org.id}', -1)" ${org.membrosAlocados <= 0 ? 'disabled' : ''}>-</button>
                        <span class="stepper-value">${org.membrosAlocados}</span>
                        <button class="stepper-btn" onclick="changeAllocation('${org.id}', 1)" ${org.membrosAlocados >= 6 ? 'disabled' : ''}>+</button>
                      </div>
                    </div>

                  </div>
                `).join('')}
              </div>

            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // =========================================================================
  // 8. HANDLERS GLOBAIS DE DRAG & DROP PARA O KANBAN
  // =========================================================================
  let draggedOrgId = null;

  window.handleDragStart = function(event, orgId) {
    draggedOrgId = orgId;
    event.dataTransfer.setData('text/plain', orgId);
    event.currentTarget.classList.add('dragging');
  };

  window.handleDragEnd = function(event) {
    event.currentTarget.classList.remove('dragging');
    document.querySelectorAll('.kanban-column').forEach(col => col.classList.remove('drag-over'));
  };

  window.handleDragOver = function(event) {
    event.preventDefault();
    const col = event.currentTarget;
    if (!col.classList.contains('drag-over')) {
      col.classList.add('drag-over');
    }
  };

  window.handleDragLeave = function(event) {
    event.currentTarget.classList.remove('drag-over');
  };

  window.handleDrop = function(event, newStatus) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');

    const orgId = draggedOrgId || event.dataTransfer.getData('text/plain');
    if (!orgId) return;

    const org = organizationsData.find(o => o.id === orgId);
    if (!org) return;

    if (org.status !== newStatus) {
      changeStatus(orgId, newStatus);
    }
  };

  // =========================================================================
  // 9. AÇÕES INTERATIVAS: STATUS, ALOCAÇÃO & CHECKLIST
  // =========================================================================
  window.changeStatus = function(orgId, newStatus) {
    const org = organizationsData.find(o => o.id === orgId);
    if (!org) return;

    const statusLabels = {
      executar: "Executar Agora",
      preparar: "Preparar",
      postergar: "Postergar",
      'nao-assumir': "Não Assumir"
    };

    org.status = newStatus;
    org.statusLabel = statusLabels[newStatus] || newStatus;

    persistState();
    recalculateKPIs();
    renderTimeline();
    renderCurrentView();

    showToast(`${org.name} movida para "${org.statusLabel}"!`, 'success');
  };

  window.setAllocation = function(orgId, count) {
    const org = organizationsData.find(o => o.id === orgId);
    if (!org) return;

    org.membrosAlocados = Math.max(0, Math.min(6, count));
    persistState();
    recalculateKPIs();
    renderCurrentView();
  };

  window.changeAllocation = function(orgId, delta) {
    const org = organizationsData.find(o => o.id === orgId);
    if (!org) return;

    const current = org.membrosAlocados || 0;
    const updated = Math.max(0, Math.min(6, current + delta));
    org.membrosAlocados = updated;

    persistState();
    recalculateKPIs();
    renderCurrentView();
  };

  window.toggleTask = function(orgId, taskType) {
    const org = organizationsData.find(o => o.id === orgId);
    if (!org) return;

    if (taskType === 'action') {
      org.actionDone = !org.actionDone;
      showToast(`${org.actionDone ? 'Ação concluída' : 'Ação reaberta'}: ${org.name}`, org.actionDone ? 'success' : 'info');
    } else if (taskType === 'pendencia') {
      org.pendenciaDone = !org.pendenciaDone;
      showToast(`${org.pendenciaDone ? 'Pendência resolvida' : 'Pendência reaberta'}: ${org.name}`, org.pendenciaDone ? 'success' : 'info');
    }

    persistState();
    recalculateKPIs();
    renderTimeline();
    renderCurrentView();
  };

  function getFillClassByStatus(status) {
    switch (status) {
      case 'executar': return 'filled-ops';
      case 'preparar': return 'filled-prep';
      case 'postergar': return 'filled-post';
      case 'nao-assumir': return '';
      default: return 'filled-ops';
    }
  }

  function getFilteredOrganizations() {
    return organizationsData.filter(org => {
      const matchesFilter = (currentFilter === 'all') || (org.status === currentFilter);
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesFilter;

      const matchesSearch = 
        org.name.toLowerCase().includes(q) ||
        org.segment.toLowerCase().includes(q) ||
        org.justificativa.toLowerCase().includes(q) ||
        org.proximaAcao.toLowerCase().includes(q) ||
        org.responsavel.toLowerCase().includes(q) ||
        org.statusLabel.toLowerCase().includes(q) ||
        org.priority.toLowerCase().includes(q) ||
        org.pendencias.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }

  function renderCurrentView() {
    if (currentViewMode === 'grid') {
      organizationsContainer.style.display = 'grid';
      kanbanContainer.style.display = 'none';
      renderOrganizationsGrid();
    } else {
      organizationsContainer.style.display = 'none';
      kanbanContainer.style.display = 'block';
      noResultsMessage.style.display = 'none';
      renderKanbanBoard();
    }
  }

  // =========================================================================
  // 10. ATUALIZAÇÃO DOS CONTADORES NOS BOTÕES DE FILTRO
  // =========================================================================
  function updateCounts() {
    const counts = {
      all: organizationsData.length,
      executar: organizationsData.filter(o => o.status === 'executar').length,
      preparar: organizationsData.filter(o => o.status === 'preparar').length,
      postergar: organizationsData.filter(o => o.status === 'postergar').length,
      'nao-assumir': organizationsData.filter(o => o.status === 'nao-assumir').length
    };

    document.getElementById('count-all').textContent = counts.all;
    document.getElementById('count-executar').textContent = counts.executar;
    document.getElementById('count-preparar').textContent = counts.preparar;
    document.getElementById('count-postergar').textContent = counts.postergar;
    document.getElementById('count-nao-assumir').textContent = counts['nao-assumir'];
  }

  // =========================================================================
  // 11. EVENTOS DE FILTRO, BUSCA E MODOS DE VISUALIZAÇÃO
  // =========================================================================
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      currentFilter = pill.dataset.filter;
      renderCurrentView();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
    renderCurrentView();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    renderCurrentView();
  });

  resetFiltersBtn.addEventListener('click', () => {
    currentFilter = 'all';
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';

    filterPills.forEach(p => {
      if (p.dataset.filter === 'all') {
        p.classList.add('active');
        p.setAttribute('aria-selected', 'true');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      }
    });

    renderCurrentView();
    showToast('Filtros redefinidos com sucesso!', 'info');
  });

  // Alternador de Visualização (Grade vs Kanban)
  btnViewGrid.addEventListener('click', () => {
    currentViewMode = 'grid';
    btnViewGrid.classList.add('active');
    btnViewKanban.classList.remove('active');
    renderCurrentView();
  });

  btnViewKanban.addEventListener('click', () => {
    currentViewMode = 'kanban';
    btnViewKanban.classList.add('active');
    btnViewGrid.classList.remove('active');
    renderCurrentView();
    showToast('Modo Kanban ativado: você pode arrastar e soltar os cartões!', 'info');
  });

  // Botão de Redefinir Simulação / Voltar ao Padrão Oficial
  btnResetSimulation.addEventListener('click', () => {
    localStorage.removeItem('lia_dashboard_state_v1');
    organizationsData = JSON.parse(JSON.stringify(defaultOrganizations));
    currentFilter = 'all';
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';

    filterPills.forEach(p => {
      if (p.dataset.filter === 'all') {
        p.classList.add('active');
        p.setAttribute('aria-selected', 'true');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      }
    });

    recalculateKPIs();
    renderTimeline();
    renderCurrentView();
    showToast('Ciclo oficial da LIA UFSCar restaurado com sucesso!', 'success');
  });

  // =========================================================================
  // 12. SEÇÃO DE COMUNICAÇÃO INSTITUCIONAL & COPIAR MENSAGEM
  // =========================================================================
  function loadCommunicationTemplate(partnerKey) {
    const template = communicationTemplates[partnerKey] || communicationTemplates.meridian;
    commRecipient.textContent = template.recipient;
    commSubject.textContent = template.subject;
    commChannel.textContent = template.channel;
    emailDraftTextarea.value = template.text;
  }

  partnerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      partnerTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadCommunicationTemplate(tab.dataset.partner);
    });
  });

  btnCopyEmail.addEventListener('click', async () => {
    const textToCopy = emailDraftTextarea.value;
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        emailDraftTextarea.select();
        document.execCommand('copy');
      }

      btnCopyEmail.classList.add('copied');
      copyBtnText.textContent = 'Mensagem Copiada!';
      const icon = btnCopyEmail.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-check';

      showToast('Mensagem institucional copiada para a área de transferência!', 'success');

      setTimeout(() => {
        btnCopyEmail.classList.remove('copied');
        copyBtnText.textContent = 'Copiar Mensagem';
        if (icon) icon.className = 'fa-solid fa-copy';
      }, 2500);

    } catch (err) {
      console.error('Falha ao copiar:', err);
      showToast('Não foi possível copiar automaticamente. Selecione o texto manualmente.', 'info');
    }
  });

  // =========================================================================
  // 13. MODAL DE DETALHES DA ORGANIZAÇÃO
  // =========================================================================
  window.openDetailModal = function(orgId) {
    const org = organizationsData.find(o => o.id === orgId);
    if (!org) return;

    modalOrgTitle.textContent = org.name;
    modalOrgStatusBadge.textContent = org.statusLabel;
    modalOrgStatusBadge.className = `status-badge status-badge-${org.status}`;

    modalOrgContent.innerHTML = `
      <div class="modal-meta-box">
        <div class="modal-meta-row">
          <span class="modal-meta-label"><i class="fa-solid fa-building"></i> Segmento:</span>
          <strong class="modal-meta-value">${org.segment}</strong>
        </div>
        <div class="modal-meta-row">
          <span class="modal-meta-label"><i class="fa-solid fa-flag"></i> Nível de Prioridade:</span>
          <span class="priority-badge ${org.priorityClass}">${org.priority}</span>
        </div>
      </div>

      <div class="field-box">
        <span class="field-label"><i class="fa-solid fa-lightbulb"></i> 1. Justificativa Estratégica Homologada</span>
        <div class="field-value modal-field-justificativa">
          ${org.justificativa}
        </div>
      </div>

      <div class="field-action-container">
        <span class="field-label"><i class="fa-solid fa-list-check"></i> 2. Próxima Ação & Governança</span>
        <div class="field-action-text" style="text-decoration: ${org.actionDone ? 'line-through' : 'none'};">
          ${org.proximaAcao}
        </div>
        <div class="field-meta-row">
          <span class="responsible-pill">
            <i class="fa-solid fa-user-gear"></i> Responsável: ${org.responsavel}
          </span>
          <span class="deadline-pill ${org.isUrgentDeadline ? 'urgent-date' : ''}">
            <i class="fa-solid fa-clock"></i> Prazo Final: ${org.prazo}
          </span>
        </div>
      </div>

      <div class="field-box">
        <span class="field-label"><i class="fa-solid fa-triangle-exclamation"></i> 3. Mapeamento de Pendências</span>
        <div class="field-pendencias-box">
          <div class="pendencia-item ${org.pendenciaDone ? 'resolved' : (org.hasPendencias ? 'pending' : 'resolved')}">
            <i class="fa-solid ${org.pendenciaDone ? 'fa-circle-check' : (org.hasPendencias ? 'fa-hourglass-half' : 'fa-circle-check')}"></i>
            <span style="text-decoration: ${org.pendenciaDone ? 'line-through' : 'none'};">${org.pendencias}</span>
          </div>
        </div>
      </div>

      <div class="field-box">
        <span class="field-label"><i class="fa-solid fa-users"></i> 4. Dimensionamento e Dedicação da Equipe</span>
        <div class="field-dedicacao-box">
          <p class="modal-dedicacao-text">
            Alocação atual: <strong>${org.membrosAlocados} de 6 membros ativos</strong> (${org.dedicacaoOriginal})
          </p>
          <span class="modal-dedicacao-sub">
            Capacidade total do núcleo: 6 membros ativos da LIA UFSCar no Ciclo 2026.2.
          </span>
        </div>
      </div>
    `;

    detailModal.classList.add('open');
    detailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    detailModal.classList.remove('open');
    detailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalActionBtn.addEventListener('click', closeModal);
  
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailModal.classList.contains('open')) {
      closeModal();
    }
  });

  // =========================================================================
  // 14. SISTEMA DE NOTIFICAÇÕES (TOAST)
  // =========================================================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 3200);
  }

  // =========================================================================
  // 15. EXPORTAÇÃO / IMPRESSÃO DO RELATÓRIO EXECUTIVO DE ESPECIFICAÇÕES
  // =========================================================================
  btnQuickExport.addEventListener('click', () => {
    showToast('Gerando relatório com as especificações das oportunidades...', 'info');

    // Salva o modo e filtros atuais
    const savedViewMode = currentViewMode;
    const savedFilter = currentFilter;
    const savedSearch = searchQuery;

    // Se estiver em modo Kanban ou filtro ativo, temporariamente exibe todas as 6 na grade
    const needsReset = (currentViewMode !== 'grid') || (currentFilter !== 'all') || (searchQuery !== '');
    if (needsReset) {
      currentViewMode = 'grid';
      currentFilter = 'all';
      searchQuery = '';
      btnViewGrid.classList.add('active');
      btnViewKanban.classList.remove('active');
      renderCurrentView();
    }

    setTimeout(() => {
      window.print();

      // Restaura o estado anterior após a janela de impressão
      if (needsReset) {
        currentViewMode = savedViewMode;
        currentFilter = savedFilter;
        searchQuery = savedSearch;
        if (currentViewMode === 'kanban') {
          btnViewKanban.classList.add('active');
          btnViewGrid.classList.remove('active');
        } else {
          filterPills.forEach(p => {
            p.classList.toggle('active', p.dataset.filter === currentFilter);
            p.setAttribute('aria-selected', p.dataset.filter === currentFilter);
          });
        }
        renderCurrentView();
      }
    }, 350);
  });

  // =========================================================================
  // INICIALIZAÇÃO DA APLICAÇÃO
  // =========================================================================
  loadCommunicationTemplate('meridian');
  recalculateKPIs();
  renderTimeline();
  renderCurrentView();

});
