# PORTAL SHINOBI

## Como abrir
1. Extraia o ZIP para uma pasta.
2. Abra a pasta no VS Code.
3. Abra `index.html` no navegador (ou use a extensão Live Server).

## Onde alterar
- `index.html`: textos, campos, estrutura e seções.
- `styles.css`: cores, tamanhos, bordas, disposição e responsividade.
- `script.js`: atributos, ranks, pontos, gráfico, atributos extras e interações.

## Regras implementadas
- Ranks: E = 0, D = 10, C = 25, B = 50, A = 100, S = 150, SS = 200.
- O rank é calculado individualmente para cada atributo.
- O botão de conceder pontos adiciona pontos ao saldo disponível; os botões `+` dos atributos só aparecem quando houver saldo.
- Cada clique em `+` distribui 1 ponto ao atributo selecionado; o botão só aparece quando há saldo e o atributo ainda não chegou a 200.
- A lista de atributos extras mostra sete marcas, uma por rank; as marcas acendem conforme os pontos daquele atributo extra.

## Observações importantes
- A referência descreve seis atributos nomeados, mas pede um heptágono de sete lados. Por isso, o sétimo eixo é o `CHAKRA`, definido em `ATTRIBUTES` no `script.js`.
- A ordem coerente com os limites fornecidos foi usada: E, D, C, B, A, S, SS (10 pontos para D e 25 para C).
- Esta é uma demonstração front-end. O painel de concessão de pontos não é uma proteção real de administrador. Em produção, a concessão deve ser validada por autenticação e autorização no backend, e os pontos devem ser salvos no banco de dados.
- Os atributos extras também têm botão `+ Acréscimo` quando há saldo; cada clique consome 1 ponto e atualiza as sete marcas conforme os mesmos limites de rank.

## Fichas e persistência
- Tudo é salvo automaticamente no `localStorage` do navegador (chave `ninjaRpgSheets.v1`).
- Use o seletor "Ficha" no topo para alternar entre fichas, "Nova ficha" para criar e "Excluir ficha" para remover.
- O nome na lista vem do campo "Nome do Personagem / Apelido".
- Os dados ficam apenas neste navegador e neste computador; limpar os dados do site apaga as fichas.
- O retrato é reduzido para no máximo 700 px antes de ser salvo, para não estourar o limite do armazenamento.
- O saldo de Ryo usa o campo ao lado dos botões: "Adicionar" soma e "Gastar" subtrai (nunca fica abaixo de 0).

## Listas e bônus
- Clã: lista fixa de opções (`<select>` em `index.html`).
- Seleções com ícone (multi-seleção, estilo "País de origem"): Elementos do Chakra, Elementos Básicos, Natureza Avançada, Kekkei Genkai e Dojutsu. Tudo é definido em `ELEMENT_GROUPS` no `script.js`; os ícones ficam em `icones/<grupo>/`. Para incluir um item, coloque o PNG na pasta do grupo e adicione uma linha no grupo. Fichas antigas são migradas automaticamente (nomes como "Koton" viram "Kouton"; itens que não existem mais, como "Yin-Yang (Pseudo)", são descartados).
- Bônus automáticos (`BONUS_LINKS` no `script.js`): cada ponto em Kinjutsu, Bunshinjutsu, Senjutsu, Kekkaijutsu e Doujutsu soma 1 em CHAKRA; cada ponto em Bojutsu, Shurikenjutsu e Kenjutsu soma 1 em BUKIJUTSU. O bônus é calculado na hora (não gasta pontos disponíveis) e o total de cada atributo continua limitado a 200.

## Tipo de ninja e habilidades únicas
- Tipo de Ninja: lista `NINJA_TYPES` no `script.js`. Ao escolher um tipo, o título e a descrição aparecem em um campo logo abaixo. Para preencher as descrições, troque o texto `"A definir"` de cada tipo.
- Habilidades Únicas: cada habilidade é um cartão com título, subtítulo e descrição à esquerda e uma imagem pequena à direita. "Pronto" conclui a edição e salva, "Editar" reabre, e o `×` no canto superior direito remove (com confirmação). Não há limite de quantidade.
- As imagens das habilidades são reduzidas para no máximo 240 px antes de salvar.

## Painel de fichas, backup e modo "Pronto"
- O botão "Painel de fichas" abre um painel: escolha uma ficha na lista (Abrir), crie, edite, exclua, exporte ou importe backup (.json com todas as fichas).
- Graduação: lista fixa (N/A, GENIN, CHUNNIN, JOUNIN, JOUNIN DE ELITE) em `index.html`.
- Backstory: área de texto no fim da ficha, salva junto com ela.
- "Pronto" (fim da ficha) trava a ficha em modo leitura: some tudo que é de edição, só aparecem elementos, país e afiliação escolhidos, e as descrições auxiliares (classe `.type-box`) ficam ocultas. "Editar ficha" volta ao modo de edição. O modo fica salvo em cada ficha.

## Visual
- Imagem de fundo: `fundo.gif` (mantenha na mesma pasta do `index.html`). Para trocar, substitua o arquivo ou altere `url(fundo.gif)` no fim do `styles.css`.
- Janela preta translúcida com desfoque: `.sheet` (ajuste `rgba(0,0,0,.62)` e `blur(14px)`).
- Fontes: Roboto no texto e M PLUS Rounded 1c nos kanji (carregadas do Google Fonts, precisa de internet).
- Cores dos números: `--blue` (pontos disponíveis e valores dos atributos) e `--green` (Ryo), definidas no fim do `styles.css`.

## País de origem e Afiliação (cores)
- Ordem e opções ficam em `index.html` (`#countries` e `#villages`). Cada botão tem `style="--c1:cor;--c2:cor2;--bd:borda"`: `--c1` é a cor ao selecionar, `--c2` (opcional) cria o gradiente e `--bd` (opcional) muda a borda.
- Os kanji ficam em octógonos (`clip-path`). O tamanho é `--oct` (padrão 44px) em `#countries .emblem, #villages .emblem` no fim do `styles.css`; a quantidade de colunas é o `minmax(62px,1fr)` logo acima.
- A ficha agora guarda o país/afiliação pelo nome (não pela posição), então reordenar os botões não troca a escolha de fichas. Fichas antigas são convertidas automaticamente.

- No modo "Pronto", os ícones de Elementos, Natureza Avançada, Kekkei Genkai e Dojutsu aparecem sem moldura, apenas com um brilho branco (regra `.viewing .emblem-multi .emblem.selected img` no fim do `styles.css`; ajuste os `drop-shadow` para mais ou menos brilho).

## Atualizações recentes
- Campo "Clã" renomeado para "一族, Ichizoku", com a nova lista de 76 opções (em ordem: Casas, Clãs, Famílias e Linhagem). Fichas antigas são migradas automaticamente (ex.: "Uchiha" vira "Clã Uchiha"; valores sem correspondência, como "Chikamatsu", ficam em branco).
- "Habilidades Únicas" agora tem o mesmo destaque de título de "Informações do personagem" (maiúsculas).
- Novo campo "Hidens", logo abaixo de Habilidades Únicas, com o mesmo funcionamento (título, subtítulo, descrição e imagem). Salvo em `hidens` em cada ficha; ambos compartilham o código `setupShowcase` no `script.js`.
- Novo campo "Kuchiyose" abaixo de Hidens (mesmo funcionamento; salvo em `kuchiyose`).
- As caixas (`.skill-card`) de Habilidades Únicas, Hidens e Kuchiyose têm fundo preto (`background:#000` no fim do `styles.css`).
- Todos os envios de imagem (retrato, habilidades, Hidens e Kuchiyose) aceitam GIF. GIFs são salvos sem alteração para manter a animação, com limite de 2,5 MB (`GIF_MAX_BYTES` no `script.js`) por causa do armazenamento do navegador. Outros formatos continuam sendo reduzidos e salvos como JPEG.
