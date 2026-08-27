# Ponspods

**Peapods Finance × RWAs.** Des Pods pour actions tokenisées : on wrap un stock token, on farme la volatilité que Wall Street produit gratuitement, et on la lève avec du levier. Rendement réel, zéro émission.

Interface concept construite sur Robinhood Chain, avec les mécaniques de [Peapods Finance](https://peapods.finance) et le langage visuel de [Pons](https://ponsnft.xyz).

> 📄 **L'idée complète : [docs/CONCEPT.md](docs/CONCEPT.md)** — pourquoi les RWAs sont un bien meilleur carburant que la crypto pour le volatility farming, et ce que ça change concrètement dans le protocole.

---

## L'idée en 30 secondes

Peapods transforme la volatilité en rendement : un Pod wrappe un actif en `pTKN`, chaque wrap / unwrap / trade paie un fee, une partie burn du `pTKN`, donc le **CBR** monte pour toujours.

Le problème : la volatilité crypto est imprévisible et arrive en même temps que les liquidations.

Les actions tokenisées corrigent ça sur six points :

1. **La volatilité est calendaire** — earnings, CPI, FOMC, opex, rebalancements. ~252 événements/an programmés.
2. **Le NAV force l'arbitrage à se refermer** — chaque mouvement du sous-jacent oblige à repasser par le pod.
3. **Le gap de session** — le marché ferme, le token non. 65 heures de dérive libre chaque week-end, corrigées à l'ouverture. Ponspods facture un **gap premium** pendant ces fenêtres.
4. **Le sous-jacent rend déjà** — coupons et équivalents dividendes s'accumulent dans la réserve du pod.
5. **USDG comme paired asset universel** — un seul marché de prêt profond au lieu de dizaines de marchés fragmentés.
6. **Les pods d'indice sont des ETF à frais négatifs** — les fees burnent la supply au lieu de prélever une commission.

---

## Le site

| Route | Contenu |
|---|---|
| `/` | Landing : hero, thèse RWA, how it works en scroll pinné, mécanique du gap, pods, volatility calendar, flywheel, FAQ |
| `/app` | Explorateur de pods — recherche, filtres chaîne / catégorie, tri, vues grille et table |
| `/app/pod/[slug]` | Fiche pod : CBR chart, fee schedule, composition, marché de prêt isolé, panneau Wrap / Unwrap / Leverage |
| `/app/lending` | Métavaults et marchés isolés, panneau de supply |
| `/app/swap` | Zap : de n'importe quel actif vers wrapped / LP / position levée |
| `/app/portfolio` | Positions, santé, PnL, rewards |
| `/app/create` | Déploiement d'un pod avec preview live des paramètres |

## Design system

Repris du langage visuel de Pons :

- **Fonts** — Bricolage Grotesque (display) + Inter (UI) + JetBrains Mono (chiffres tabulaires)
- **Palette** — alice blue `#f0f8ff`, texte `#0f2036`, bordures `#bdd5ee`, accent `#3b76e0`, plus un vert « pod » `#12b981` pour le rendement
- **Motion** — `word-reveal` (blur + lift sur les titres), `card-float`, `pulse-glow`, `glow-breathe`, `shine`, marquees, entrées au scroll via IntersectionObserver
- **Interactions** — tout en `rounded-full`, hover `scale-[1.03]`, bouton primaire à halo dégradé qui inverse ses couleurs, CTA à cercle qui pivote de 45°

Tous les tokens sont dans [`app/globals.css`](app/globals.css) (Tailwind v4, bloc `@theme`).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4. Aucune dépendance externe : animations en CSS pur, charts en SVG écrit à la main.

## Démarrer

```bash
npm install
npm run dev
```

Puis http://localhost:3000

```bash
npm run build
```

## Structure

```
app/
  page.tsx              landing
  globals.css           design system (tokens + keyframes)
  app/                  interface protocole
components/
  ui.tsx                boutons, badges, cards, sparklines, meters
  site/                 header, footer, marquee, reveal
  landing/              sections de la landing
  app/                  composants du protocole
lib/
  data.ts               état protocole mocké (pods, marchés, calendrier)
  format.ts             formatage + générateurs de séries déterministes
docs/
  CONCEPT.md            la thèse RWA × Peapods en détail
```

## Avertissement

Projet concept. Ce n'est pas un protocole déployé, les chiffres sont illustratifs, et rien ici n'est un conseil en investissement. Les mécaniques sont adaptées de la documentation publique de Peapods Finance.
