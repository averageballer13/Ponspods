# Ponspods — Peapods × RWAs

**La thèse en une phrase :** Peapods a construit une machine qui transforme la volatilité en rendement réel. Les actions tokenisées sont le seul carburant on-chain dont la volatilité est fabriquée ailleurs, gratuitement, et **selon un calendrier publié à l'avance**.

---

## 1. Le problème avec le Volatility Farming crypto-natif

Peapods fonctionne. Le mécanisme est propre : on wrap un token dans un Pod, on reçoit un pTKN, chaque wrap / unwrap / trade paie des frais, une partie de ces frais burn du pTKN, donc le **CBR** (Collateral Backing Ratio) monte de façon irréversible. Pas d'émissions, pas de dilution.

Mais le carburant est mauvais :

| Faiblesse | Conséquence |
|---|---|
| La volatilité crypto arrive quand elle veut | L'APY affiché est rétrospectif, jamais projetable |
| Pas de prix de référence externe | L'arbitrage est discrétionnaire : il peut simplement ne pas avoir lieu |
| L'actif sous-jacent ne produit rien | Les frais sont la seule source de rendement |
| Chaque pod long-tail a son propre paired asset | Marchés de prêt fragmentés, cold-start permanent |
| Volatilité = drawdown | La semaine où on gagne le plus est celle où le collatéral vaut le moins |

## 2. Ce que les RWAs changent — 6 propriétés structurelles

### 2.1 La volatilité devient un calendrier

Earnings, CPI, FOMC, options expiry, rebalancements d'indices, résultats trimestriels. Ce sont ~252 événements de volatilité programmés par an, plus 104 gaps de week-end. Un pod adossé à NVDAx a une courbe de rendement **lisible trois semaines à l'avance**.

→ **Produit : le Volatility Calendar.** Aucun protocole DeFi ne peut publier ça. Ponspods, oui. C'est simultanément l'outil de trading, le hook marketing et la raison pour laquelle un LP institutionnel peut modéliser le rendement.

### 2.2 Le NAV force l'arbitrage à se refermer

Un token NVDAx a un prix de référence publié. Quand le pool dévie, l'arbitrage n'est pas une opportunité : c'est une **certitude mécanique**. Chaque mouvement de Nvidia au Nasdaq oblige quelqu'un à repasser par le pod et à payer le fee. Le volume d'arbitrage devient une fonction déterministe de la volatilité réalisée du sous-jacent.

### 2.3 Le gap de session — le mécanisme signature

C'est l'idée centrale, et elle n'a **aucun équivalent crypto** :

- Vendredi 16h00 : le Nasdaq ferme. Le prix de référence est gelé pendant 65 heures.
- Le token, lui, continue de se trader 24/7 sur la Robinhood Chain.
- Le pool dérive librement pendant tout le week-end.
- Lundi 9h30 : réouverture, et **toute la dérive doit être corrigée en passant par le pod**.

Ponspods encode ça directement dans le contrat : **gap premium** = un fee AMM supplémentaire (+0,05 % à +0,45 %) appliqué automatiquement quand le marché sous-jacent est fermé. Les LPs sont *payés* pour porter le risque de prix périmé au lieu d'être arbitrés dessus. Peapods a des fees statiques ; Ponspods a des **fees conscients de la session**.

> C'est le vrai edge produit. « Farm the gap » est une phrase que seul un protocole RWA peut dire.

### 2.4 Le sous-jacent rend déjà quelque chose

Un T-Bill tokenisé paie un coupon. Une action tokenisée porte l'équivalent dividende. Ce rendement s'accumule dans **la réserve du pod**, donc il pousse le CBR vers le haut *en plus* des burns.

Rendement empilé sur trois couches, là où Peapods n'en a qu'une :
1. Fees de trading / wrap (Volatility Farming)
2. Croissance du CBR par burn
3. **Yield natif du RWA** ← nouveau

Et une quatrième avec le levier : les intérêts payés par les emprunteurs LVF.

### 2.5 USDG comme paired asset universel

Peapods fragmente : chaque pod se paire contre DAI, ETH, PEAS… donc chaque pod doit bootstrapper son propre marché de prêt. Sur Robinhood Chain, **tout se paire contre USDG**. Conséquence architecturale majeure :

- Un seul métavault USDG alimente **tous** les pods.
- Le prêteur ne choisit pas un pod, il choisit un profil de risque (Prime / High-beta / Conservative).
- Le cold-start disparaît : un nouveau pod naît déjà connecté à un pool de liquidité profond.

Le Self-Lending et le Proof of Demand de Peapods restent, mais deviennent un **signal d'allocation** plutôt qu'une nécessité de survie.

### 2.6 Les pods d'indice = des ETF à frais négatifs

Un pod peut wrapper un panier : pMAG7, pSEMI, pMEME. C'est un ETF on-chain — mais au lieu de prélever 0,3 %/an de frais de gestion, le pod **burn sa propre supply** avec les frais générés.

> **Un ETF dont le ratio de frais est négatif.** La part détient mécaniquement de plus en plus de panier chaque jour. C'est le meilleur argument de vente du projet auprès d'un public non-DeFi.

Et le rebalancement trimestriel est lui-même un événement de fees : le pod se paie sur son propre rebalancement.

---

## 3. Ce qui change concrètement par rapport à Peapods

| Peapods | Ponspods | Pourquoi |
|---|---|---|
| Fees AMM fixes | **Fees session-aware** (gap premium) | Compenser le risque de prix gelé, capturer la prime de week-end |
| APY historique | **Volatility Calendar** projeté | La vol du sous-jacent est publiée à l'avance |
| Paired asset par pod | **USDG universel** | Un seul marché de prêt profond, pas de cold-start |
| Liquidation LTV statique 83,33 % | **Buffer dynamique avant catalyseur** : le seuil se resserre 24 h avant earnings / réouverture | Le risque de gap est concentré et prévisible, donc gérable |
| Pods sur tokens crypto | **Pods equity / index / commodity / treasury** | Rendement de base + vol programmée |
| Index pods | **ETF à frais négatifs** avec rebalancement rémunéré | Positionnement grand public |
| PEAS | **PODS / vlPODS / pPODS** | Le token de gouvernance wrappé dans son propre pod |

### Le buffer dynamique de liquidation

C'est le point de risk management critique. Une position LVF ouverte vendredi à 16h00 traverse 65 heures pendant lesquelles elle ne peut pas être gérée si un gap arrive. Ponspods durcit donc le seuil de liquidation à l'approche des fenêtres à risque :

```
LTV_max = 83,33 %  en séance normale
LTV_max = 78 %     à partir de vendredi 15h00 (fenêtre week-end)
LTV_max = 72 %     24 h avant un earnings sur le sous-jacent
```

Les positions au-dessus du seuil resserré ne sont pas liquidées : elles sont **bloquées en augmentation** et incitées à se dé-lever (le protocole propose un deleverage en un clic). C'est l'équivalent d'un appel de marge de fin de semaine, ce que fait n'importe quel prime broker traditionnel.

---

## 4. Économie du token

- **PODS** — supply fixe, zéro émission. Les revenus du protocole rachètent PODS sur le marché.
- **vlPODS** — PODS lockés. Votent le whitelisting des pods et **l'allocation des métavaults** entre pods (le mécanisme de vote-bribe le plus naturel qui soit : les créateurs de pods veulent la liquidité USDG). Perçoivent le revenue share en USDG.
- **pPODS** — le token de gouvernance wrappé dans son propre pod. Les revenus burnent du pPODS, donc le CBR monte pour ceux qui n'ont jamais unwrappé. Réflexivité complète.

Flywheel : Wall Street bouge → l'arbitrage paie le pod → LPs payés + supply burnée (CBR ↑) → pods plus profonds → arbitrage moins cher donc plus fréquent → revenus rachètent PODS → vlPODS dirige la liquidité vers les meilleurs pods → retour au début. **Rien dans cette boucle n'imprime un seul token.**

---

## 5. Les risques réels (à ne pas cacher)

1. **Restrictions de transfert.** C'est le risque n°1. Les stock tokens sont des titres de dette tokenisés émis par une entité régulée. S'ils portent une whitelist KYC ou des restrictions de transfert, un pod permissionless **ne peut pas les détenir**. Toute la thèse dépend de la transférabilité libre de l'actif sous-jacent sur la chaîne. À valider avant la première ligne de Solidity.
2. **Risque émetteur.** Le pod ne peut pas rembourser ce que l'émetteur n'honore pas. Le CBR ne protège de rien si le sous-jacent est un IOU défaillant.
3. **Risque de gap sur position levée.** Une position saine vendredi peut être insolvable lundi à l'ouverture, sans possibilité d'intervention. D'où le buffer dynamique (§3), qui atténue sans supprimer.
4. **Liquidité des liquidateurs pendant la fermeture.** Liquider un pNVDA à 3 h du matin un dimanche suppose des liquidateurs prêts à porter du NVDAx jusqu'à l'ouverture. Il faut un fonds d'assurance et une prime de liquidation majorée hors séance.
5. **Cadre réglementaire.** Empiler du levier sur des titres tokenisés touche des règles qui existent déjà (marge, PDT, suitability). Le protocole est neutre et non-custodial, mais l'interface, elle, est attaquable.

---

## 6. Séquence de lancement suggérée

1. **pTBILL d'abord.** Vol quasi nulle, mais yield de base réel : ça prouve l'empilement CBR + coupon sans risque de liquidation. C'est le pod qui rassure.
2. **pNVDA + pHOOD.** Profondeur maximale, narratif évident, HOOD est l'action de la chaîne elle-même.
3. **pGME / pMEME.** Le produit d'appel. Vol la plus élevée du marché, APY spectaculaire, et le positionnement « home of memestocks » déjà revendiqué par Pons.
4. **pMAG7 / pSEMI.** L'ETF à frais négatifs, pour sortir du public purement DeFi.
5. **Gap premium activé en v2**, une fois qu'on a assez de données de volatilité hors séance pour calibrer la courbe.

---

## 7. Le pitch, en trois phrases

> Peapods a prouvé qu'on peut payer les LPs avec de la volatilité au lieu de les payer avec de l'inflation.
> Les actions tokenisées sont la seule classe d'actifs on-chain dont la volatilité est produite gratuitement par quelqu'un d'autre, selon un calendrier public, avec un prix de référence qui force l'arbitrage à se refermer.
> Ponspods, c'est le moteur de Peapods branché sur ce carburant-là.
