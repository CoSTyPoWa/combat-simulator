# Combat Simulator

Questo repository è stato preparato per iniziare la separazione del codice senza cambiare il gameplay.

## Obiettivo attuale

- mantenere il sito funzionante come oggi
- rimuovere segreti dal frontend
- introdurre una struttura iniziale in `src/`
- preparare il progetto per Netlify e per future separazioni del combat engine

## Struttura iniziale

```text
src/
├── config.js
├── main.js
├── core/
│   ├── combat/
│   └── rules/
├── data/
├── modes/
├── ui/
├── multiplayer/
└── ...
```

## Sicurezza

- nessuna API key deve essere lasciata nel frontend
- i valori Supabase vanno configurati in `src/config.js` o in un backend/Netlify Function
- il multiplayer resta disattivato finché la configurazione non è presente

## Avvio locale

```bash
npm install
npm run dev
```

Se `npx http-server` non è disponibile, il comando lo installa automaticamente al primo avvio.
