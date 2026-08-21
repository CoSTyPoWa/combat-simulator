(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.data = ns.data || {};

  ns.data.typeChart = {
    physical: { physical: 1, speed: 1.05, dark: 1.08, tech: 1.04, magic: 0.96, nature: 1.02, cosmic: 1.06, fire: 1.06, water: 0.9, earth: 1.04 },
    speed: { physical: 1.04, speed: 1, dark: 1.02, tech: 1.06, magic: 1.03, nature: 1.02, cosmic: 0.96, fire: 1.04, water: 1.04, earth: 0.94 },
    dark: { physical: 1.04, speed: 1.03, dark: 0.94, tech: 1.02, magic: 1.08, nature: 0.98, cosmic: 1.02, fire: 1.04, water: 0.96, earth: 1.02 },
    tech: { physical: 1.02, speed: 0.96, dark: 1.04, tech: 1, magic: 1.08, nature: 1.04, cosmic: 1.08, fire: 1.02, water: 1.18, earth: 1.1 },
    magic: { physical: 1.02, speed: 1.02, dark: 0.96, tech: 0.97, magic: 1, nature: 1.08, cosmic: 1.14, fire: 1.12, water: 1.02, earth: 0.94 },
    nature: { physical: 0.98, speed: 1.02, dark: 1.08, tech: 0.98, magic: 1.06, nature: 1, cosmic: 0.96, fire: 0.9, water: 1.12, earth: 1.12 },
    cosmic: { physical: 1.04, speed: 1.06, dark: 1.04, tech: 0.94, magic: 0.9, nature: 1.08, cosmic: 1, fire: 1.05, water: 1.05, earth: 0.92 },
    fire: { physical: 0.98, speed: 1.04, dark: 1.08, tech: 1.02, magic: 1.08, nature: 1.1, cosmic: 1.04, fire: 0.94, water: 0.86, earth: 1.06 },
    water: { physical: 1.1, speed: 1.04, dark: 1.02, tech: 0.94, magic: 1.02, nature: 0.94, cosmic: 1.04, fire: 1.18, water: 0.96, earth: 0.88 },
    earth: { physical: 1.08, speed: 0.94, dark: 1.05, tech: 0.96, magic: 1.1, nature: 1.08, cosmic: 1.12, fire: 1.08, water: 1.08, earth: 1 }
  };

  ns.data.charTags = {
    hulk:['physical','earth'], thor:['physical','magic'], ironman:['tech','physical'], cap:['physical','tech'],
    spidey:['speed','physical'], widow:['physical','speed'], hawkeye:['speed','physical'], strange:['magic','cosmic'],
    panther:['physical','tech'], witch:['magic'], vision:['tech','cosmic'], wolverine:['physical'], storm:['magic','nature'],
    cyclops:['tech','physical'], jean:['magic'], groot:['nature'], rocket:['tech'], starlord:['tech','physical'],
    marvel:['cosmic'], antman:['tech','physical'], falcon:['speed','tech'], bucky:['physical','tech'], shangchi:['physical','magic'],
    thanos:['cosmic','physical'], loki:['magic'], venom:['dark','physical'], magneto:['tech','magic'], doom:['magic','tech'], ultron:['tech'],
    goblin:['tech','physical'], hela:['magic','dark'], redskull:['physical'], killmonger:['physical'], kang:['tech','cosmic'],
    mysterio:['tech','magic'], vulture:['tech','speed'], kingpin:['physical'], charizard:['nature','physical'], pikachu:['speed','nature'],
    blastoise:['nature'], venusaur:['nature'], lucario:['physical','magic'], gengar:['dark','magic'], mewtwo:['cosmic','magic'], snorlax:['physical'],
    garchomp:['physical','nature'], greninja:['speed','nature'], rayquaza:['cosmic','nature'], umbreon:['dark'], darkrai:['dark','magic'],
    giratina:['dark','cosmic'], hydreigon:['dark','physical'], tyranitar:['physical','dark'], dragonite:['nature','physical'], metagross:['tech','physical'],
    gyarados:['nature','physical'], zoroark:['dark','speed'], yveltal:['dark','cosmic'], weavile:['dark','speed'], mew:['cosmic','magic'],
    gardevoir:['magic'], blaziken:['nature','physical'], scizor:['tech','physical'], palkia:['cosmic'], dialga:['cosmic','tech'], absol:['dark','speed'],
    salamence:['nature','physical'], mario:['physical'], luigi:['physical'], peach:['magic'], bowser:['physical','dark'], link:['physical','nature'],
    zelda:['magic'], ganondorf:['dark','magic'], samus:['tech','physical'], kirby:['physical','magic'], dk:['physical'], fox:['tech','speed'],
    ridley:['dark','physical'], wario:['physical'], dedede:['physical'], andross:['tech','cosmic'], krool:['physical'], yoshi:['nature','physical'],
    captainfalcon:['speed','physical'], metaknight:['speed','physical'], bowserjr:['physical'], darksamus:['tech','dark'], wolf:['speed','physical'],
    daredevil:['physical','speed'], moonknight:['physical','dark'], ghostrider:['magic','dark'], msmarvel:['physical','cosmic'], docock:['tech','physical'],
    carnage:['dark','physical'], electro:['tech','speed'], dormammu:['magic','dark'], taskmaster:['physical','speed'], rosalina:['cosmic','magic'],
    pit:['physical','magic'], inkling:['speed','nature'], sheik:['speed','physical'], kingboo:['dark','magic'], motherbrain:['tech','cosmic'],
    zant:['dark','magic'], galleom:['tech','physical']
  };

  ns.data.synergies = [
    { id:'avengers', name:'Avengers Assemble', members:['ironman','cap','thor','hulk','widow','spidey','marvel','falcon','bucky','antman'], min:3, partial:{combattimento:2,forza:1}, full:{combattimento:3,forza:2,durabilita:1} },
    { id:'asgard', name:'Sangue di Asgard', members:['thor','loki','hela'], min:2, partial:{energia:2}, full:{energia:3,combattimento:1} },
    { id:'xmen', name:'X-Men', members:['wolverine','jean','magneto','storm','cyclops'], min:2, partial:{intelligenza:1,energia:1}, full:{intelligenza:2,energia:2,combattimento:1} },
    { id:'mystic', name:'Potere Mistico', members:['strange','witch'], min:2, partial:{energia:2}, full:{energia:2} },
    { id:'guardians', name:'Guardiani', members:['starlord','groot','rocket'], min:2, partial:{combattimento:1,velocita:1}, full:{combattimento:2,velocita:2,intelligenza:1} },
    { id:'wakanda', name:'Trono di Wakanda', members:['panther','killmonger'], min:2, partial:{combattimento:2}, full:{combattimento:2} },
    { id:'tech_war', name:'Guerra delle Macchine', members:['ironman','ultron'], min:2, partial:{intelligenza:2,energia:1}, full:{intelligenza:2,energia:1} },
    { id:'web', name:'Guerra della Ragnatela', members:['spidey','goblin','venom'], min:2, partial:{velocita:1,combattimento:1}, full:{velocita:2,combattimento:2} },
    { id:'doom_reign', name:'Regno di Doom', members:['doom','redskull'], min:2, partial:{intelligenza:1,energia:1}, full:{intelligenza:1,energia:1} },
    { id:'bros', name:'Fratelli Mario', members:['mario','luigi'], min:2, partial:{combattimento:2,velocita:1}, full:{combattimento:2,velocita:1} },
    { id:'hyrule', name:'Destino di Hyrule', members:['link','zelda'], min:2, partial:{combattimento:2,energia:1}, full:{combattimento:2,energia:1} },
    { id:'hyrule_dark', name:'Ombra di Hyrule', members:['ganondorf','link'], min:2, partial:{forza:2}, full:{forza:2} },
    { id:'metroid', name:'Cacciatori', members:['samus','ridley'], min:2, partial:{energia:2,velocita:1}, full:{energia:2,velocita:1} },
    { id:'kong', name:'Giungla in Guerra', members:['dk','krool'], min:2, partial:{forza:2}, full:{forza:2,combattimento:1} },
    { id:'starfox_pack', name:'Squadriglia Lylat', members:['fox','wolf','andross'], min:2, partial:{velocita:1,combattimento:1}, full:{velocita:2,combattimento:1} },
    { id:'mario_party', name:'Trio del Regno', members:['mario','luigi','yoshi'], min:2, partial:{combattimento:1,velocita:1}, full:{combattimento:2,velocita:1} },
    { id:'kirby_crew', name:'Guerrieri di Dream Land', members:['kirby','metaknight','dedede'], min:2, partial:{combattimento:1,forza:1}, full:{combattimento:2,forza:1} },
    { id:'creation', name:'Origine Pokémon', members:['mew','mewtwo'], min:2, partial:{energia:2}, full:{energia:3,intelligenza:1} },
    { id:'time_space', name:'Tempo e spazio', members:['dialga','palkia'], min:2, partial:{energia:2}, full:{energia:3,forza:1} },
    { id:'destruction', name:'Distruzione', members:['yveltal','giratina','darkrai'], min:2, partial:{energia:2}, full:{energia:3,forza:1} },
    { id:'steel_minds', name:'Menti d\'acciaio', members:['metagross','mewtwo'], min:2, partial:{intelligenza:2}, full:{intelligenza:2,energia:1} },
    { id:'multiverse_chaos', name:'Caos Multiversale', members:['thanos','mewtwo','ganondorf','bowser','doom','giratina'], min:2, partial:{forza:1,energia:1}, full:{forza:2,energia:2,combattimento:1} },
    { id:'street_def', name:'Difensori della strada', members:['daredevil','spidey','moonknight','ghostrider'], min:2, partial:{combattimento:2}, full:{combattimento:3,velocita:1} },
    { id:'sybiote_war', name:'Guerra dei simbionti', members:['venom','carnage'], min:2, partial:{forza:2}, full:{forza:3,durabilita:1} },
    { id:'zebes', name:'Fantasmi di Zebes', members:['samus','ridley','motherbrain','darksamus'], min:2, partial:{combattimento:1,energia:1}, full:{combattimento:2,energia:2} },
    { id:'smash_stars', name:'Stelle Smash', members:['mario','link','samus','pit','rosalina','sheik'], min:3, partial:{combattimento:1,velocita:1}, full:{combattimento:2,velocita:2,forza:1} }
  ];

  ns.data.rivalries = [
    { a:'spidey', b:'goblin', name:'Guerra della Ragnatela', line:(x,y)=>`Tra ${x} e ${y} c'è un conto aperto: ogni colpo sa di rancore personale.` },
    { a:'spidey', b:'venom', name:'Simbionte e ospite', line:(x,y)=>`${x} e ${y}: un legame che è diventato odio puro.` },
    { a:'cap', b:'redskull', name:'Ideali vs terrore', line:(x,y)=>`${x} e ${y} incarnano due mondi che non possono coesistere.` },
    { a:'panther', b:'killmonger', name:'Trono di Wakanda', line:(x,y)=>`Il trono di Wakanda brucia tra ${x} e ${y}.` },
    { a:'ironman', b:'ultron', name:'Creatore e creatura', line:(x,y)=>`${y} è il riflesso oscuro di ciò che ${x} ha costruito.` },
    { a:'thor', b:'loki', name:'Fratelli di Asgard', line:(x,y)=>`Fratelli di Asgard: ${x} e ${y} si conoscono troppo bene.` },
    { a:'thor', b:'hela', name:'Sangue di Odino', line:(x,y)=>`${x} affronta ${y}: il passato di Asgard torna a reclamare il presente.` },
    { a:'link', b:'ganondorf', name:'Destino di Hyrule', line:(x,y)=>`Hyrule ha già scritto questo scontro: ${x} e ${y}.` },
    { a:'samus', b:'ridley', name:'Cacciatrice e preda', line:(x,y)=>`${x} e ${y}: una caccia che non è mai finita.` },
    { a:'mario', b:'bowser', name:'Regno dei Funghi', line:(x,y)=>`Ancora una volta ${x} e ${y} si disputano il Regno.` },
    { a:'pikachu', b:'mewtwo', name:'Fulmine e laboratorio', line:(x,y)=>`${x} di fronte a ${y}: natura contro creazione.` },
    { a:'charizard', b:'mewtwo', name:'Drago e clone', line:(x,y)=>`Potenza primordiale contro potere artificiale: ${x} vs ${y}.` },
    { a:'fox', b:'andross', name:'Guerra di Lylat', line:(x,y)=>`Il sistema Lylat brucia alle spalle di ${x} e ${y}.` },
    { a:'dk', b:'krool', name:'Giungla in guerra', line:(x,y)=>`La giungla ha un solo re: ${x} o ${y}.` }
  ];
})();
