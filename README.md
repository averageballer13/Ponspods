# Ponspods

**Peapods Finance × RWAs.** Volatility farming, mais sur des actions tokenisées. On wrap un stock token dans un Pod, et chaque trade qui remet son prix en ligne paie un fee. Rendement réel, zéro émission. Sur Robinhood Chain.

> 📄 **L'idée complète : [docs/CONCEPT.md](docs/CONCEPT.md)** — pourquoi les RWAs sont un bien meilleur carburant que la crypto pour le volatility farming.

---

## L'idée en 30 secondes

**Le Pod, en 3 étapes :**

1. **Wrap** — tu mets ton action tokenisée dans un Pod, tu récupères une version emballée. Tu détiens toujours l'action.
2. **Farm** — tous ceux qui entrent, sortent ou tradent ce token emballé paient un fee au Pod. Ces fees te reviennent.
3. **Grow** — une partie de chaque fee détruit des tokens emballés alors que les actions derrière restent. Moins de tokens, même tas. Ta part grossit, et ça ne redescend jamais.

**Pourquoi les actions et pas les memecoins :**

- 📅 **Le calendrier est public** — earnings, décisions de taux, jours d'expiration. Tu sais quand ça va bouger avant que ça bouge.
- 🌙 **Le week-end** — vendredi la bourse ferme, le token continue de se trader et dérive. Lundi tout doit être remis en ligne, et la correction passe par ton Pod. Toutes les semaines.
- 🔒 **L'arbitrage est forcé** — une vraie action a un vrai prix sur une vraie bourse. Si le Pod dérive, il y a de l'argent gratuit sur la table et quelqu'un le prend toujours. Pour le prendre, il paie ton fee. Avec un memecoin, personne n'est obligé de venir.

---

## Le site

Landing unique, pré-lancement. **Aucun chiffre** — rien n'est live, donc rien n'est affiché.

| Section | Contenu |
|---|---|
| Hero | La proposition, plus les vrais logos des sociétés du lancement |
| How it works | Wrap → Farm → Grow, trois grandes cartes |
| Why stocks | Le gap du week-end en grand, plus le calendrier et l'arbitrage forcé |
| Pods | La line-up : pNVDA, pTSLA, pMSTR, pHOOD, pSPACEX, pMAG7 |
| CTA | Waitlist |

### Design system

Repris directement de l'interface [Peapods Finance](https://peapods.finance) :

- **Font** — Inter uniquement, headings en `font-extrabold`
- **Fond** — `linear-gradient(to right, #1a1a1a, #000)`
- **Cartes** — coque `#214214` en 16px de radius avec 2px de padding, intérieur en `linear-gradient(118.91deg, #132410, #214214)` à 12px
- **Bouton** — `linear-gradient(162.53deg, #7fe339, #c5ef40)`, texte noir, radius 40px, weight 800
- **Accents** — lime `#7fe339`, mint `#cef2cb`, lignes `#4a7a3b`

Tous les tokens sont dans [`app/globals.css`](app/globals.css) (Tailwind v4, bloc `@theme`).

### Logos

Vrais marques, en SVG inline (viewBox 24×24, un seul path), générés dans [`lib/brands.ts`](lib/brands.ts) depuis [Simple Icons](https://simpleicons.org) (CC0). Les marques appartiennent à leurs propriétaires respectifs et servent uniquement à identifier la société derrière une action tokenisée.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4. Zéro dépendance externe : animations en CSS pur, diagrammes en SVG écrit à la main.

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
  page.tsx              la landing
  globals.css           design system (palette Peapods + keyframes)
components/
  ui.tsx                boutons, cartes, logos de marque, atomes de layout
  site/                 header, footer
  sections/             hero, how, why, pods, marquee, cta
lib/
  brands.ts             paths SVG des vraies marques
  pods.ts               la line-up de lancement
docs/
  CONCEPT.md            la thèse RWA × Peapods en détail
```

## Avertissement

Projet concept. Ce n'est pas un protocole déployé et rien ici n'est un conseil en investissement. Les mécaniques sont adaptées de la documentation publique de Peapods Finance.
