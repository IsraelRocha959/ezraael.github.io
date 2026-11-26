// Configuração central: altere nomes, limites e ranks neste arquivo.
const RANKS = [
  {name:"E", points:0},
  {name:"D", points:10},
  {name:"C", points:25},
  {name:"B", points:50},
  {name:"A", points:100},
  {name:"S", points:150},
  {name:"SS", points:200}
];

// O heptágono tem sete eixos. O sétimo fica como espaço livre/editável,
// pois a lista solicitada define seis atributos ninja.
const ATTRIBUTES = [
  {id:"hijutsu", name:"HIJUTSU"},
  {id:"ninjutsu", name:"NINJUTSU"},
  {id:"genjutsu", name:"GENJUTSU"},
  {id:"fuinjutsu", name:"FUUINJUTSU"},
  {id:"bukijutsu", name:"BUKIJUTSU"},
  {id:"taijutsu", name:"TAIJUTSU"},
  {id:"chakra", name:"CHAKRA"}
];

// Regras de bônus: pontos nestes atributos extras somam a mesma quantidade ao atributo ninja indicado.
const BONUS_LINKS = {
  chakra:    ["Kinjutsu","Bunshinjutsu","Senjutsu","Kekkaijutsu","Doujutsu"],
  bukijutsu: ["Bojutsu","Shurikenjutsu","Kenjutsu"]
};
const ATTR_NAME = Object.fromEntries(ATTRIBUTES.map(a => [a.id, a.name]));
const linkedTo = extra => Object.keys(BONUS_LINKS).find(id => BONUS_LINKS[id].includes(extra));

// Grupos de seleção (ícones em icones/<pasta>/). Cada item: id (salvo na ficha), name, sub (opcional) e arquivo.
// Para adicionar um item, coloque o PNG na pasta do grupo e inclua uma linha aqui.
const ELEMENT_GROUPS = [
  {id:"chakraElements", title:"Elementos do Chakra", dir:"elementos-do-chakra", items:[
    {id:"Yin", name:"Yin", file:"yin.png"},
    {id:"Yang", name:"Yang", file:"yang.png"},
    {id:"Yin-Yang", name:"Yin-Yang", file:"yin-yang.png"}
  ]},
  {id:"basicElements", title:"Elementos Básicos", dir:"elementos-basicos", items:[
    {id:"Katon", name:"Katon", sub:"Fogo", file:"katon-fogo.png"},
    {id:"Suiton", name:"Suiton", sub:"Água", file:"suiton-agua.png"},
    {id:"Fuuton", name:"Fuuton", sub:"Vento", file:"fuuton-vento.png"},
    {id:"Raiton", name:"Raiton", sub:"Relâmpago", file:"raiton-relampago.png"},
    {id:"Doton", name:"Doton", sub:"Terra", file:"doton-terra.png"}
  ]},
  {id:"advancedNature", title:"Natureza Avançada", dir:"natureza-avancada", items:[
    {id:"Mokuton", name:"Mokuton", sub:"Madeira", file:"mokuton-madeira.png"},
    {id:"Hyouton", name:"Hyouton", sub:"Gelo", file:"hyouton-gelo.png"},
    {id:"Enton", name:"Enton", sub:"Inferno", file:"enton-inferno.png"},
    {id:"Youton (Lava)", name:"Youton", sub:"Lava", file:"youton-lava.png"},
    {id:"Youton (Dissolução)", name:"Youton", sub:"Dissolução", file:"youton-dissolucao.png"},
    {id:"Futton", name:"Futton", sub:"Ebulição", file:"futton-ebulicao.png"},
    {id:"Shakuton", name:"Shakuton", sub:"Calor", file:"shakuton-calor.png"},
    {id:"Bakuton", name:"Bakuton", sub:"Explosão", file:"bakuton-explosao.png"},
    {id:"Ranton", name:"Ranton", sub:"Tempestade", file:"ranton-tempestade.png"},
    {id:"Taiton", name:"Taiton", sub:"Tufão", file:"taiton-tufao.png"},
    {id:"Deiton", name:"Deiton", sub:"Lama", file:"deiton-lama.png"},
    {id:"Awaton", name:"Awaton", sub:"Espuma", file:"awaton-espuma.png"},
    {id:"Shouton", name:"Shouton", sub:"Cristal", file:"shouton-cristal.png"},
    {id:"Kouton", name:"Kouton", sub:"Aço", file:"kouton-aco.png"},
    {id:"Jiton (Magnetismo)", name:"Jiton", sub:"Magnetismo", file:"jiton-magnetismo.png"},
    {id:"Jinton (Rápido)", name:"Jinton", sub:"Rápido", file:"jinton-rapido.png"},
    {id:"Jinton (Partícula)", name:"Jinton", sub:"Partícula", file:"jinton-particula.png"},
    {id:"Meiton", name:"Meiton", sub:"Escuridão", file:"meiton-escuridao.png"}
  ]},
  {id:"kekkeiGenkai", title:"Kekkei Genkai", dir:"kekkei-genkai", items:[
    {id:"Shikotsumyaku", name:"Shikotsumyaku", file:"shikotsumyaku.png"},
    {id:"Soma no Ko", name:"Soma no Ko", file:"soma-no-ko.png"},
    {id:"Oxidação Corporal", name:"Oxidação Corporal", file:"oxidacao-corporal.png"},
    {id:"Poder do Dragão do Oceano", name:"Poder do Dragão do Oceano", file:"poder-do-dragao-do-oceano.png"},
    {id:"Reencarnação da Vida do Dragão", name:"Reencarnação da Vida do Dragão", file:"reencarnacao-da-vida-do-dragao.png"},
    {id:"Reflexão do Espírito", name:"Reflexão do Espírito", file:"reflexao-do-espirito.png"}
  ]},
  {id:"dojutsu", title:"Dojutsu", dir:"dojutsu", items:[
    {id:"Byakugan", name:"Byakugan", file:"byakugan.png"},
    {id:"Sharingan", name:"Sharingan", file:"sharingan.png"},
    {id:"Mangekyo", name:"Mangekyo", file:"mangekyo.png"},
    {id:"Rinnegan", name:"Rinnegan", file:"rinnegan.png"},
    {id:"Akagan", name:"Akagan", file:"akagan.png"},
    {id:"Ketsuryugan", name:"Ketsuryugan", file:"ketsuryugan.png"},
    {id:"Seringan", name:"Seringan", file:"seringan.png"},
    {id:"Yochi", name:"Yochi", file:"yochi.png"},
    {id:"Yome", name:"Yome", file:"yome.png"}
  ]}
];
const ELEMENT_IDS = new Set(ELEMENT_GROUPS.flatMap(g => g.items.map(i => i.id)));
// Nomes antigos (fichas já salvas) -> nomes atuais. O que não existir mais é descartado.
const ELEMENT_MIGRATION = {"Koton":"Kouton","Shoton":"Shouton","Hyoton":"Hyouton","Yoton":"Youton (Lava)"};

const NINJA_TYPES = [
  {id:"Iryo-nin", label:"Iryō-Nin", title:"IRYŌ-NIN", sub:"001 / NINJA MÉDICO", desc:`**Iryō-Ninjutsu, A Esperança Ninja**
A vida de um companheiro nunca deve ser perdida em vão.

Ninjas Médicos dedicam-se ao estudo do corpo humano, anatomia, chakra e técnicas de cura. Utilizando Iryō-Ninjutsu, são capazes de tratar ferimentos, estabilizar aliados e realizar procedimentos médicos durante missões.

Seu conhecimento também pode ser utilizado ofensivamente, explorando pontos vitais e o funcionamento interno do corpo humano. Um verdadeiro Ninja Médico combina precisão, controle de chakra e conhecimento científico.

**Técnica Exclusiva**
• Shousen Jutsu (Técnica da Palma Mística)
• Estilo Yang (Acrescenta a ficha o Elemento do Chakra Yang)

**Habilidades Exclusivas**
• Diagnóstico rápido de ferimentos e doenças
• Tratamento de ferimentos em campo
• Utilização de técnicas de cura avançadas
• Conhecimento em anatomia e fisiologia
• Capacidade de realizar cirurgias de emergência

**Especializações**
• Ninjutsu Médico (Iryō-Ninjutsu)
• Cirurgia de Campo
• Herbologia e Poções

**Vantagens & Desvantagens**
• (+8) Chakra
• (-10) Taijutsu
• Realizar Jutsu de cura demanda muita concentração pois é uma habilidade ativa. O Ninja não pode se auto-curar.

**Regeneração de Feridas**
• Simples/Superficiais (1 Turno)
• Moderadas/Cortantes/Contusas (2 Turnos)
• Graves/Lacerantes/Perfurações/Hemorrágicas/Queimaduras/Envenenamento (5 Turnos)
(Somente estabiliza o paciente, será necessário cuidados médicos especializados)`},
  {id:"Shugonin", label:"Shugonin", title:"SHUGONIN", sub:"002 / NINJA GUARDIÃO", desc:`**Shugonin, O Verdadeiro Portão**
Enquanto eu estiver de pé, ninguém passará.

Ninjas Guardiões são especialistas em proteção, defesa e combate direto. São responsáveis por proteger pessoas importantes, vilas, territórios e pontos estratégicos. Seu treinamento prioriza resistência, combate e capacidade de enfrentar ameaças de frente.

**Especializações**
Guardiões podem se especializar em técnicas de defesa, combate corpo a corpo, uso de armas e estratégias de proteção. Sua presença é essencial em missões de alto risco e na defesa de aliados. Escolha duas maestrias para se especializar acrescentando +5 pontos de atributos. Escolha uma maestria que será penalizada diminuindo -10 pontos de atributos.

• Ninjutsu
• Taijutsu
• Genjutsu
• Fuuinjutsu
• Hijutsu
• Kugutsu
• Kenjutsu
• Shurikenjutsu`},
  {id:"Oinin", label:"Oinin", title:"OININ", sub:"003 / NINJA CAÇADOR", desc:`**Oinin, O Especialista em Rastreamento**
Se você fugir, eu encontrarei você.

Ninjas Caçadores são especialistas em rastreamento, perseguição e eliminação de alvos. Conhecem técnicas de sobrevivência, leitura de rastros, investigação e combate em ambientes hostis.

São frequentemente utilizados para localizar criminosos, perseguir ninjas renegados ou eliminar ameaças específicas. Muitos trabalham em unidades especializadas semelhantes às forças de perseguição e caça das grandes vilas.

**Habilidades Exclusivas**
Ninjas Caçadores podem desenvolver seu próprio Método de Procura, isto é um conjunto de técnicas e habilidades que permitem rastrear, localizar e eliminar alvos específicos. A escolha do Método de Procura define o estilo de caça do ninja.

**Método de Procura**
• Audição Sobre-humana / Eco localização
• Olfato Aguçado
• Dōjutsu Específico (Existente ou Crie o seu próprio)
• Sensoriamento Triunfante / Sexto Sentido`},
  {id:"Nukenin", label:"Nukenin", title:"NUKENIN", sub:"004 / NINJA RENEGADO", desc:`**Nukenin, O Ninja Renegado**
Minha lealdade morreu junto com a minha antiga vila.

Ninjas Renegados são shinobi que romperam seus vínculos com uma vila, clã ou organização. Podem ter abandonado seus antigos aliados por convicção, vingança, sobrevivência ou simplesmente por não aceitarem mais as regras que lhes foram impostas.

Alguns tornam-se criminosos procurados, enquanto outros seguem seus próprios códigos e vivem à margem do sistema shinobi. Seu conhecimento sobre as vilas de origem frequentemente os torna extremamente perigosos.

**Vantagens & Desvantagens**
• Despertar de uma Habilidade Única, Jutsu Proibido ou Elemento do Chakra.
• Inicialmente a recompensa por sua cabeça é de 10.000 Ryo.
• Você não será aceito em nenhuma das 5 Grandes Nações e suas aldeias ocultas.`},
  {id:"Innin", label:"Innin", title:"INNIN", sub:"005 / NINJA ESPIÃO", desc:`**Innin, O Especialista em Infiltração**
A melhor missão é aquela que ninguém sabe que aconteceu.

Ninjas Espiões são especialistas em infiltração, disfarce, coleta de informações e operações clandestinas. Seu objetivo raramente é vencer uma batalha; é impedir que ela aconteça antes mesmo que o inimigo perceba sua presença.

Podem assumir identidades falsas, infiltrar organizações, roubar informações, sabotar instalações e manipular situações nos bastidores. São algumas das peças mais valiosas — e perigosas — de uma vila ninja. Pode adquirir duas das técnicas abaixo.

**Técnicas Exclusivas**
• Técnica de Disfarce
• Técnica da Fantasia
• Técnica de Modificação da Voz
• Técnica de Infiltração: Douka`},
  {id:"Kijin", label:"Kijin", title:"KIJIN", sub:"006 / NINJA DEMÔNIO", desc:`**Kijin, O Demônio**
Meu inimigo não verá um homem. Verá seu próprio pesadelo.

O Caminho do Ninja Demônio representa shinobi que transformaram sua própria existência em uma arma de terror. São guerreiros conhecidos por sua ferocidade, crueldade, presença intimidadora ou técnicas que fazem seus inimigos questionarem se estão enfrentando um homem ou um monstro. Alguns desenvolveram estilos de combate brutais; outros são usuários de técnicas proibidas, maldições, transformações ou poderes capazes de consumir sua própria humanidade. O Caminho do Demônio não significa necessariamente ser maligno. Significa abraçar aquilo que os outros temem.

A escolha do Caminho do Demônio é uma decisão que molda a identidade do personagem, influenciando sua reputação, suas interações com outros shinobi e o tipo de desafios que enfrentará. É um caminho de poder, mas também de isolamento e conflito. Este caminho é recomendado para Jinchuurikis, usuários de maldições ou shinobi que desejam explorar o lado mais sombrio de suas habilidades.

**Técnicas Exclusivas**
• Sairento Kiringu (Assassinato Silencioso / Matança Silenciosa)
• Kirai (Chegada do Demônio: Ao correr em direção ao inimigo, uma aura demoníaca que provoca efeitos de lentidão ou paralisia aos oponentes fracos e indefesos, comumente confundido com genjutsu. No entanto, é apenas o instinto humano)
• Sakki (Intenção Assassina: Provoca efeitos de lentidão, Paralisia e uma breve visão de morte. Comumente confundido como genjutsu, mas é apenas uma reação ao extremo medo da vítima)

**Vantagens & Desvantagens**
• Restrição de Aprendizagem: o Ninja deverá escolher dois tipos de arte que não poderá aprender: Ninjutsu, Genjutsu, Fuuinjutsu, Hijutsu, Bukijutsu ou Taijutsu.`},
  {id:"Gaijin", label:"Gaijin", title:"GAIJIN", sub:"007 / NINJA ESTRANGEIRO", desc:`**Ninja Estrangeiro**
Não pertenço a esta terra. Mas ainda posso encontrar meu lugar nela.

Ninjas Estrangeiros são shinobi que nasceram, foram treinados ou possuem vínculos com uma nação diferente daquela onde atualmente vivem ou atuam. Carregam consigo técnicas, costumes, conhecimentos e experiências que podem ser completamente diferentes das tradições locais.

Podem ser viajantes, imigrantes, diplomatas, desertores acolhidos, membros de clãs estrangeiros ou shinobi enviados para representar seus países. Sua origem pode fazer deles uma ponte entre diferentes culturas — ou despertar desconfiança entre aqueles que enxergam estrangeiros como possíveis ameaças.

**Disponíveis para Personagem Estrangeiro**
• Samurai
• Monge
• Clã Extinto
• Ninja Estrangeiro`},
  {id:"Kanchi", label:"Kanchi", title:"KANCHI", sub:"008 / NINJA SENSORIAL", desc:`**Kanchi, O Ninja Rastreador**
Técnicas utilizadas pelos shinobi para enfrentar seus adversários.

Ninjas Sensoriais desenvolveram uma percepção extraordinária do chakra e do ambiente ao seu redor. São capazes de detectar presenças, identificar assinaturas de chakra e perceber inimigos mesmo quando estes utilizam técnicas de ocultação.

Sua importância aumenta durante missões de reconhecimento, guerras e operações contra inimigos infiltrados. Um sensor experiente pode transformar uma batalha inteira ao revelar aquilo que os demais não conseguem enxergar.

**Técnica Exclusiva**
• Kanchi no Jutsu

**Modo Sensorial**
O Modo Sensorial é uma habilidade ativa. É necessário que o ninja se concentre e utilize um selo manual específico para que possa utilizar esta habilidade.`},
  {id:"Kagaku", label:"Kagaku", title:"KAGAKU", sub:"009 / NINJA CIENTISTA", desc:`**Kagaku, A Evolução Ninja**
O conhecimento é a arma que ainda não aprendemos a temer.

Ninjas Cientistas estudam a relação entre chakra, tecnologia, biologia e técnicas ninja. Seu trabalho pode resultar em novas ferramentas, armas, métodos de combate e aprimoramentos capazes de ultrapassar os limites tradicionais dos shinobi.

Com o avanço tecnológico da era moderna, esses ninjas tornaram-se cada vez mais importantes. Alguns utilizam a ciência para aprimorar equipamentos e aliados; outros ultrapassam limites éticos em busca de descobertas proibidas.`},
  {id:"Especialista", label:"Especialista", title:"ESPECIALISTA", sub:"010 / NINJA ESPECIALISTA", desc:`**ESPECIALISTA, O GÊNIO SHINOBI**
Ninjas Especialistas dedicam sua vida ao aperfeiçoamento extremo de uma determinada área. Enquanto outros buscam dominar diversas habilidades, o Especialista transforma uma única disciplina em sua maior arma.

Pode ser um mestre em Kenjutsu, Taijutsu, Ninjutsu, Genjutsu, Fūinjutsu, Shurikenjutsu, Kugutsu ou qualquer outra especialidade reconhecida pelo sistema ninja.

Sua força está na especialização: quanto mais profundamente conhece seu campo, mais difícil se torna enfrentá-lo dentro dele. Para isto o ninja deve ter sua composição de habilidades entre 80% e 100% em sua especialidade, e no máximo 20% em outras áreas.

**Técnicas Exclusivas**
Ninjas Especialistas podem adquirir e desenvolver técnicas únicas, totalmente focadas em sua área de especialização.

**Vantagens & Desvantagens**
• +10 Pontos de Atributo no Atributo em que se especializou.
• Restrição de Atributo: o Ninja deverá escolher dois tipos de arte que não poderá aprender: Ninjutsu, Genjutsu, Fuuinjutsu, Hijutsu, Bukijutsu ou Taijutsu.`}
];

const EXTRA_ATTRIBUTES = ["Senjutsu","Kekkaijutsu","Doujutsu","Kinjutsu","Kenjutsu","Bojutsu","Shurikenjutsu","Bunshinjutsu"];
const newSheet = () => ({
  fields: [], country: -1, village: -1, portrait: "",
  available: 0, ryo: 0,
  attributes: Object.fromEntries(ATTRIBUTES.map(a => [a.id, 0])),
  extras: Object.fromEntries(EXTRA_ATTRIBUTES.map(a => [a, 0])),
  jutsus: [], equipment: [], elements: [], skills: [], hidens: [], kuchiyose: [], backstory: "", locked: false
});
let state = newSheet();

const bonusFor = id => (BONUS_LINKS[id] || []).reduce((sum, n) => sum + state.extras[n], 0);
const attrTotal = id => Math.min(200, state.attributes[id] + bonusFor(id));
const $ = id => document.getElementById(id);
const rankFor = points => [...RANKS].reverse().find(r => points >= r.points) || RANKS[0];

function renderPoints(){
  $("availablePoints").textContent = state.available;
  $("ryoTotal").textContent = state.ryo.toLocaleString("pt-BR");
  renderChart();
  renderExtras();
  persist();
}
function renderChart(){
  const svg = $("attributeChart"), cx=220, cy=190, radius=128;
  const angle = i => (-Math.PI/2) + i*2*Math.PI/7;
  const point = (r,i) => [cx+Math.cos(angle(i))*r, cy+Math.sin(angle(i))*r];
  const polygon = r => Array.from({length:7},(_,i)=>point(r,i).join(",")).join(" ");
  let markup = "";
  // Camadas visuais correspondentes aos sete ranks: centro E até limite SS.
  const radii = [0, 18, 38, 59, 81, 103, 128];
  radii.slice(1).forEach((r,i)=>{
    const fill = 244 - i*29;
    markup += `<polygon points="${polygon(r)}" fill="rgb(${fill},${fill},${fill})" fill-opacity=".16" stroke="rgba(255,255,255,.5)" stroke-width="1"/>`;
  });
  for(let i=0;i<7;i++){
    const [x,y]=point(radius,i);
    markup += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,.4)" stroke-width="1"/>`;
  }
  const maxRadius=128;
  const values=ATTRIBUTES.map(a=>attrTotal(a.id));
  const dataPoints=values.map((v,i)=>point(maxRadius*Math.min(v,200)/200,i).join(",")).join(" ");
  markup += `<polygon points="${dataPoints}" fill="#cfd3da" fill-opacity=".36" stroke="#fff" stroke-width="1.5"/>`;
  ATTRIBUTES.forEach((a,i)=>{
    const [x,y]=point(164,i), [vx,vy]=point(143,i);
    const rank=rankFor(values[i]).name;
    const anchor = x < cx-20 ? "end" : x > cx+20 ? "start" : "middle";
    markup += `<text class="axis-label" x="${x}" y="${y}" text-anchor="${anchor}">${a.name}</text>`;
    markup += `<text class="axis-value" x="${vx}" y="${vy+4}" text-anchor="${anchor}">${values[i]} · ${rank}</text>`;
  });
  markup += `<text x="${cx}" y="${cy-7}" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">RANK</text><text x="${cx}" y="${cy+12}" text-anchor="middle" fill="#fff" font-size="17" font-weight="bold">E</text>`;
  svg.innerHTML=markup;
  $("attributeControls").innerHTML = ATTRIBUTES.map(a => {
    const value=attrTotal(a.id), canAdd=state.available>0 && value<200;
    return `<div class="attribute-control"><span>${a.name}: <b>${value}</b></span>${canAdd?`<button type="button" data-attribute="${a.id}" aria-label="Adicionar ponto em ${a.name}">+</button>`:`<span class="plus-placeholder"></span>`}</div>`;
  }).join("");
  $("attributeControls").querySelectorAll("button[data-attribute]").forEach(button=>button.addEventListener("click",()=>{
    const id=button.dataset.attribute;
    if(state.available>0 && attrTotal(id)<200){state.available--;state.attributes[id]++;renderPoints();}
  }));
}
function renderExtras(){
  $("extrasList").innerHTML = EXTRA_ATTRIBUTES.map(name=>{
    const points=state.extras[name], rankIndex=RANKS.findIndex(r=>r.name===rankFor(points).name);
    return `<div class="extra-item"><div class="extra-head"><strong>${name}${linkedTo(name)?`<span class="link-tag" title="Soma o mesmo valor em ${ATTR_NAME[linkedTo(name)]}">+${ATTR_NAME[linkedTo(name)]}</span>`:""}</strong><span>${rankFor(points).name} · ${points} pts</span></div>
      <div class="extra-actions">${state.available>0 && points<200 ? `<button type="button" data-extra="${name}">+ Acréscimo</button>` : ""}</div>
      <div class="rank-track">${RANKS.map((r,i)=>`<span class="rank-mark ${i<=rankIndex && points>=r.points ? "active":""}" title="Rank ${r.name}: ${r.points} pontos"></span>`).join("")}</div>
      <div class="rank-names">${RANKS.map(r=>`<span>${r.name}</span>`).join("")}</div></div>`;
  }).join("");
  $("extrasList").querySelectorAll("button[data-extra]").forEach(button=>button.addEventListener("click",()=>{
    const name=button.dataset.extra;
    if(state.available>0 && state.extras[name]<200){state.available--;state.extras[name]++;renderPoints();}
  }));
}
// ---------- Persistência (localStorage) ----------
const STORE = "ninjaRpgSheets.v1";
let db = {current:null, sheets:{}};
const formFields = () => [...document.querySelectorAll(".identity input, .identity select, .origin input")].filter(f => !f.closest(".skills"));
const emblems = id => [...document.querySelectorAll(`#${id} .emblem`)];
const sheetName = sh => ((sh.fields && sh.fields[0]) || "").trim() || "Ficha sem nome";
const uid = () => "f" + Date.now().toString(36) + Math.random().toString(36).slice(2,6);

function setStatus(text, error){ const el=$("saveStatus"); el.textContent=text; el.classList.toggle("error", !!error); }
function persist(){
  if(!db.current) return;
  state.fields = formFields().map(f => f.value);
  state.backstory = $("backstory").value;
  state.countryChoice = (emblems("countries").find(b => b.classList.contains("selected")) || {dataset:{}}).dataset.choice || "";
  state.villageChoice = (emblems("villages").find(b => b.classList.contains("selected")) || {dataset:{}}).dataset.choice || "";
  db.sheets[db.current] = state;
  try{ localStorage.setItem(STORE, JSON.stringify(db)); setStatus("Salvo neste navegador"); }
  catch(e){ setStatus("Não foi possível salvar: armazenamento cheio ou bloqueado", true); }
  renderSheetSelect();
}
function renderSheetSelect(){
  $("currentSheetName").textContent = sheetName(state);
  if($("sheetPanel").open) renderSheetPanel();
}
function setPortrait(src){
  const img=$("portraitPreview");
  if(src){ img.src=src; img.style.display="block"; $("portraitButton").style.display="none"; }
  else { img.removeAttribute("src"); img.style.display="none"; $("portraitButton").style.display=""; }
}
function renderLists(){
  [["jutsus","jutsuList"],["equipment","equipmentList"]].forEach(([key, listId]) => {
    const ul=$(listId); ul.innerHTML="";
    state[key].forEach((text, i) => {
      const li=document.createElement("li"), span=document.createElement("span"), remove=document.createElement("button");
      span.textContent=text; remove.textContent="×"; remove.className="remove"; remove.setAttribute("aria-label","Remover item");
      remove.onclick=()=>{ state[key].splice(i,1); renderLists(); persist(); };
      li.append(span, remove); ul.append(li);
    });
  });
}
function applySheet(id){
  db.current=id;
  const base=newSheet(), saved=db.sheets[id] || {};
  state={...base, ...saved, attributes:{...base.attributes, ...saved.attributes}, extras:{...base.extras, ...saved.extras}};
  if(!Array.isArray(state.hidens)) state.hidens=[];
  if(!Array.isArray(state.kuchiyose)) state.kuchiyose=[];
  if(state.attributes.livre !== undefined){ state.attributes.chakra = state.attributes.livre; delete state.attributes.livre; }
  const typeIdx=formFields().indexOf($("ninjaType")), TYPE_MIGRATION={"Oinnin":"Oinin","Nukkenin":"Nukenin","Yogen no Ko":""};
  if(typeIdx>=0 && state.fields[typeIdx] in TYPE_MIGRATION) state.fields[typeIdx]=TYPE_MIGRATION[state.fields[typeIdx]];
  // Migra o Clã (lista antiga -> nova lista, ex.: "Uchiha" vira "Clã Uchiha").
  const clanSel=document.querySelector(".identity select"), clanIdx=formFields().indexOf(clanSel), oldClan=state.fields[clanIdx];
  if(clanIdx>=0 && oldClan && ![...clanSel.options].some(o => o.value===oldClan || o.text===oldClan)){
    const CLAN_MAP={"Hozuki":"Clã Hoozuki","B":"Família dos B","Kazekage":"Clã dos Kazekage","Raikage":"Clã dos Raikage"};
    const hit=CLAN_MAP[oldClan] || ([...clanSel.options].find(o => o.text.endsWith(" "+oldClan)) || {}).text || "";
    state.fields[clanIdx]=hit;
  }
  formFields().forEach((f,i) => f.value = state.fields[i] ?? "");
  if(!saved.skills && typeof state.fields[7]==="string" && state.fields[7].trim())
    state.skills=[{id:uid(), title:state.fields[7].trim(), subtitle:"", desc:"", image:"", editing:false}];
  renderElements();
  $("backstory").value = state.backstory || "";
  // Fichas antigas guardavam a posição do botão; converte para o nome usando a ordem antiga.
  const OLD_COUNTRIES=["País do Fogo","País do Vento","País do Raio","País da Terra","País da Água"], OLD_VILLAGES=["Konohagakure","Sunagakure","Kumogakure","Iwagakure","Kirigakure"];
  if(state.countryChoice===undefined) state.countryChoice = OLD_COUNTRIES[state.country] || "";
  if(state.villageChoice===undefined) state.villageChoice = OLD_VILLAGES[state.village] || "";
  emblems("countries").forEach(b => b.classList.toggle("selected", b.dataset.choice===state.countryChoice));
  emblems("villages").forEach(b => b.classList.toggle("selected", b.dataset.choice===state.villageChoice));
  setPortrait(state.portrait);
  renderNinjaType();
  renderShowcases();
  applyMode();
  renderLists();
  renderPoints();
}
function renderElements(){
  state.elements = [...new Set(state.elements.map(e => ELEMENT_MIGRATION[e] || e).filter(e => ELEMENT_IDS.has(e)))];
  const esc = t => String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
  $("elementGroups").innerHTML = ELEMENT_GROUPS.map(g =>
    `<h2>${g.title}</h2><div class="emblem-row emblem-multi" id="${g.id}">` +
    g.items.map(it => {
      const on = state.elements.includes(it.id);
      return `<button type="button" class="emblem${on ? " selected" : ""}" data-element="${esc(it.id)}" aria-pressed="${on}" title="${esc(it.sub ? it.name + " (" + it.sub + ")" : it.name)}">` +
        `<img src="icones/${g.dir}/${it.file}" alt="" loading="lazy"><span class="nm">${esc(it.name)}</span>` +
        (it.sub ? `<span class="sb">${esc(it.sub)}</span>` : "") + `</button>`;
    }).join("") + `</div>`).join("");
  $("elementGroups").querySelectorAll(".emblem").forEach(b => b.addEventListener("click", () => {
    const id=b.dataset.element, i=state.elements.indexOf(id);
    if(i>=0) state.elements.splice(i,1); else state.elements.push(id);
    const on = i<0;
    b.classList.toggle("selected", on); b.setAttribute("aria-pressed", on);
    persist();
  }));
}
const GIF_MAX_BYTES = 2.5*1024*1024; // limite para não estourar o localStorage
function shrinkImage(dataUrl, done, max=700){
  // GIF é mantido como está (redesenhar no canvas perderia a animação).
  if(/^data:image\/gif/i.test(dataUrl)){
    const bytes = Math.round((dataUrl.length - dataUrl.indexOf(",") - 1) * 3/4);
    if(bytes > GIF_MAX_BYTES){ alert("Este GIF é grande demais (" + (bytes/1048576).toFixed(1) + " MB). Use um GIF de até 2,5 MB."); return; }
    done(dataUrl); return;
  }
  const img=new Image();
  img.onload=()=>{
    const k=Math.min(1, max/Math.max(img.width,img.height)), c=document.createElement("canvas");
    c.width=Math.round(img.width*k); c.height=Math.round(img.height*k);
    c.getContext("2d").drawImage(img,0,0,c.width,c.height);
    done(c.toDataURL("image/jpeg",.85));
  };
  img.src=dataUrl;
}

// ---------- Interações ----------
function addListItem(inputId, key){
  const input=$(inputId), value=input.value.trim(); if(!value) return;
  state[key].push(value); input.value=""; renderLists(); persist();
}
$("grantButton").addEventListener("click",()=>{
  const amount=Math.floor(Number($("grantAmount").value));
  if(amount>0){state.available+=amount;renderPoints();}
});
$("ryoAdd").addEventListener("click",()=>{
  const amount=Math.floor(Number($("ryoAmount").value));
  if(amount>0){state.ryo+=amount;renderPoints();}
});
$("ryoSpend").addEventListener("click",()=>{
  const amount=Math.floor(Number($("ryoAmount").value));
  if(amount>0){state.ryo=Math.max(0,state.ryo-amount);renderPoints();}
});
$("portraitButton").onclick=()=>$("portraitInput").click();
$("portraitPreview").onclick=()=>{ if(!state.locked) $("portraitInput").click(); };
$("portraitInput").onchange=e=>{
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>shrinkImage(reader.result, small=>{ state.portrait=small; setPortrait(small); persist(); });
  reader.readAsDataURL(file); e.target.value="";
};
document.querySelectorAll(".emblem").forEach(btn=>btn.addEventListener("click",()=>{
  btn.parentElement.querySelectorAll(".emblem").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected"); persist();
}));
document.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>{
  if(btn.dataset.add==="jutsu") addListItem("jutsuInput","jutsus");
  else addListItem("equipmentInput","equipment");
}));
$("jutsuInput").addEventListener("keydown",e=>{ if(e.key==="Enter") addListItem("jutsuInput","jutsus"); });
$("equipmentInput").addEventListener("keydown",e=>{ if(e.key==="Enter") addListItem("equipmentInput","equipment"); });
formFields().forEach(f => { f.addEventListener("input", persist); f.addEventListener("change", persist); });


// ---------- Tipo de ninja ----------
$("ninjaType").innerHTML = '<option value="">Selecione</option>' + NINJA_TYPES.map(t => `<option value="${t.id}">${t.label}</option>`).join("");
const fmtType = d => String(d).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*(.+?)\*\*/g,'<b style="color:#fff">$1</b>');
function renderNinjaType(){
  const t=NINJA_TYPES.find(x => x.id===$("ninjaType").value), box=$("ninjaTypeBox");
  box.hidden=!t;
  if(t) box.innerHTML=`<strong>${t.title}</strong><small style="display:block;color:#8f949c;letter-spacing:2px;font-size:10px;margin-top:2px">${t.sub}</small><p style="white-space:pre-line">${fmtType(t.desc)}</p>`;
}
$("ninjaType").addEventListener("change", renderNinjaType);

// ---------- Habilidades únicas e Hidens (mostruário) ----------
const esc = v => String(v ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function setupShowcase({key, listId, addId, fileId, empty, untitled, removeLabel, removeAsk}){
  const byId = id => state[key].find(k => k.id===id);
  let pendingImage = null;
  function render(){
    const list=$(listId);
    if(!state[key].length){ list.innerHTML=`<p class="hint">${empty}</p>`; return; }
    list.innerHTML = state[key].map(k => {
      const img = `<div class="skill-img">${k.image ? `<img src="${k.image}" alt="">` : "忍"}</div>`;
      const remove = `<button type="button" class="skill-x" data-act="remove" aria-label="${removeLabel}">×</button>`;
      if(k.editing) return `<article class="skill-card editing" data-id="${k.id}">${remove}
        <div class="skill-body">
          <input data-field="title" placeholder="Título" value="${esc(k.title)}" aria-label="Título">
          <input data-field="subtitle" placeholder="Subtítulo" value="${esc(k.subtitle)}" aria-label="Subtítulo">
          <textarea data-field="desc" rows="4" placeholder="Descrição" aria-label="Descrição">${esc(k.desc)}</textarea>
          <button type="button" class="action" data-act="done">Pronto</button>
        </div>
        <div class="skill-side">${img}<button type="button" class="action" data-act="image">${k.image?"Trocar imagem":"Imagem"}</button>${k.image?'<button type="button" class="action" data-act="clearimg">Tirar imagem</button>':""}</div>
      </article>`;
      return `<article class="skill-card" data-id="${k.id}">${remove}
        <div class="skill-body">
          <h3>${esc(k.title) || untitled}</h3>
          ${k.subtitle ? `<span class="sub">${esc(k.subtitle)}</span>` : ""}
          ${k.desc ? `<p>${esc(k.desc)}</p>` : ""}
          <button type="button" class="action" data-act="edit">Editar</button>
        </div>
        <div class="skill-side">${img}</div>
      </article>`;
    }).join("");
  }
  $(addId).addEventListener("click",()=>{
    state[key].push({id:uid(), title:"", subtitle:"", desc:"", image:"", editing:true});
    render(); persist();
    const titles=document.querySelectorAll(`#${listId} [data-field="title"]`); titles[titles.length-1]?.focus();
  });
  $(listId).addEventListener("input",e=>{
    const field=e.target.dataset.field, card=e.target.closest(".skill-card"); if(!field||!card) return;
    byId(card.dataset.id)[field]=e.target.value; persist();
  });
  $(listId).addEventListener("click",e=>{
    const btn=e.target.closest("[data-act]"); if(!btn) return;
    const card=btn.closest(".skill-card"), k=byId(card.dataset.id), act=btn.dataset.act;
    if(act==="done") k.editing=false;
    else if(act==="edit") k.editing=true;
    else if(act==="clearimg") k.image="";
    else if(act==="image"){ pendingImage=k.id; $(fileId).click(); return; }
    else if(act==="remove"){
      if(!confirm(`${removeAsk} "${k.title || "sem título"}"?`)) return;
      state[key]=state[key].filter(x => x!==k);
    }
    render(); persist();
  });
  $(fileId).addEventListener("change",e=>{
    const file=e.target.files[0], k=byId(pendingImage); e.target.value="";
    if(!file||!k) return;
    const reader=new FileReader();
    reader.onload=()=>shrinkImage(reader.result, small=>{ k.image=small; render(); persist(); }, 240);
    reader.readAsDataURL(file);
  });
  return render;
}
const renderSkills = setupShowcase({key:"skills", listId:"skillList", addId:"addSkill", fileId:"skillImageInput",
  empty:'Nenhuma habilidade ainda. Use "+ Nova habilidade" para criar a primeira.',
  untitled:"Habilidade sem título", removeLabel:"Remover habilidade", removeAsk:"Remover a habilidade"});
const renderHidens = setupShowcase({key:"hidens", listId:"hidenList", addId:"addHiden", fileId:"hidenImageInput",
  empty:'Nenhum Hiden ainda. Use "+ Novo Hiden" para criar o primeiro.',
  untitled:"Hiden sem título", removeLabel:"Remover Hiden", removeAsk:"Remover o Hiden"});
const renderKuchiyose = setupShowcase({key:"kuchiyose", listId:"kuchiyoseList", addId:"addKuchiyose", fileId:"kuchiyoseImageInput",
  empty:'Nenhum Kuchiyose ainda. Use "+ Novo Kuchiyose" para criar o primeiro.',
  untitled:"Kuchiyose sem título", removeLabel:"Remover Kuchiyose", removeAsk:"Remover o Kuchiyose"});
const renderShowcases = () => { renderSkills(); renderHidens(); renderKuchiyose(); };

// ---------- Modo "ficha pronta" ----------
function syncEmptyRows(){
  document.querySelectorAll(".origin .emblem-row").forEach(row => {
    const empty = !row.querySelector(".selected"), h = row.previousElementSibling;
    row.classList.toggle("is-empty", empty);
    if(h && h.tagName==="H2") h.classList.toggle("is-empty", empty);
  });
}
function applyMode(){
  const locked=!!state.locked;
  syncEmptyRows();
  document.body.classList.toggle("viewing", locked);
  formFields().forEach(f => f.disabled=locked);
  $("backstory").disabled=locked;
  $("backstoryPanel").hidden = locked && !state.backstory.trim();
  $("finishButton").textContent = locked ? "Editar ficha" : "Pronto";
}
$("finishButton").addEventListener("click",()=>{
  if(!state.locked) [...state.skills, ...state.hidens, ...state.kuchiyose].forEach(k => k.editing=false);
  state.locked=!state.locked;
  renderShowcases(); applyMode(); persist();
  window.scrollTo({top:0, behavior:"smooth"});
});
$("backstory").addEventListener("input", persist);

// ---------- Painel de fichas ----------
const panel=$("sheetPanel");
let panelSel=null;
const sheetMeta = sh => [(sh.fields||[])[1], (sh.fields||[])[4]].filter(Boolean).join(" · ");
function renderSheetPanel(){
  if(!db.sheets[panelSel]) panelSel=db.current;
  $("sheetItems").innerHTML = Object.entries(db.sheets).map(([id, sh]) =>
    `<li class="${id===panelSel?"selected":""}">
      <button type="button" class="sheet-pick" data-pick="${id}"><strong>${esc(sheetName(sh))}</strong><small>${esc(sheetMeta(sh))}${id===db.current?(sheetMeta(sh)?" · ":"")+"aberta":""}</small></button>
      <button type="button" class="action" data-open="${id}">Abrir</button></li>`).join("");
}
function openSheet(id, edit){
  persist(); applySheet(id);
  if(edit){ state.locked=false; applyMode(); persist(); }
}
$("openPanel").addEventListener("click",()=>{ panelSel=db.current; renderSheetPanel(); panel.showModal(); });
$("closePanel").addEventListener("click",()=>panel.close());
$("sheetItems").addEventListener("click",e=>{
  const open=e.target.closest("[data-open]"), pick=e.target.closest("[data-pick]");
  if(open){ openSheet(open.dataset.open); panel.close(); }
  else if(pick){ panelSel=pick.dataset.pick; renderSheetPanel(); }
});
$("ctlNew").addEventListener("click",()=>{
  persist(); const id=uid(); db.sheets[id]=newSheet(); applySheet(id); panel.close(); formFields()[0].focus();
});
$("ctlEdit").addEventListener("click",()=>{ openSheet(panelSel, true); panel.close(); });
$("ctlDelete").addEventListener("click",()=>{
  const sh=db.sheets[panelSel];
  if(!sh || !confirm(`Excluir a ficha "${sheetName(sh)}"? Essa ação não pode ser desfeita.`)) return;
  const wasCurrent = panelSel===db.current;
  delete db.sheets[panelSel];
  if(wasCurrent){
    const ids=Object.keys(db.sheets);
    if(!ids.length){ const id=uid(); db.sheets[id]=newSheet(); ids.push(id); }
    applySheet(ids[0]);
  } else persist();
  panelSel=db.current; renderSheetPanel();
});
$("ctlExport").addEventListener("click",()=>{
  persist();
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([JSON.stringify(db,null,2)],{type:"application/json"}));
  a.download=`fichas-ninja-${new Date().toISOString().slice(0,10)}.json`;
  a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  setStatus("Backup exportado");
});
$("ctlImport").addEventListener("click",()=>$("importInput").click());
$("importInput").addEventListener("change",e=>{
  const file=e.target.files[0]; e.target.value=""; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const entries=Object.values(JSON.parse(reader.result).sheets || {});
      if(!entries.length) throw new Error("vazio");
      persist(); entries.forEach(sh => { db.sheets[uid()]=sh; }); persist(); renderSheetPanel();
      setStatus(`${entries.length} ficha(s) importada(s)`);
    }catch(err){ alert("Arquivo inválido: use um backup exportado por esta ficha (.json)."); }
  };
  reader.readAsText(file);
});

// ---------- Inicialização ----------
try{ const raw=localStorage.getItem(STORE); if(raw) db=JSON.parse(raw); }catch(e){ db={current:null, sheets:{}}; }
if(!db.sheets || !Object.keys(db.sheets).length){ const id=uid(); db={current:id, sheets:{[id]:newSheet()}}; }
else if(!db.sheets[db.current]) db.current=Object.keys(db.sheets)[0];
applySheet(db.current);
