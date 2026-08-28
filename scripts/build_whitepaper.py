"""
Builds the Ponspods whitepaper.

Deliberately plain: white page, black type, one logo on the cover, no icons,
no rules, no colour. Run with `python scripts/build_whitepaper.py`.
"""

from pathlib import Path

from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Image,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / ".fonts"
OUT = ROOT / "public" / "ponspods-whitepaper.pdf"
LOGO = ROOT / "docs" / "whitepaper-logo-black.png"

BLACK = "#000000"
GREY = "#555555"

# --- fonts ------------------------------------------------------------------

def register_fonts() -> tuple[str, str, str]:
    try:
        pdfmetrics.registerFont(TTFont("Poppins", FONTS / "Poppins-Regular.ttf"))
        pdfmetrics.registerFont(TTFont("Poppins-SemiBold", FONTS / "Poppins-SemiBold.ttf"))
        pdfmetrics.registerFont(TTFont("Poppins-Bold", FONTS / "Poppins-Bold.ttf"))
        pdfmetrics.registerFontFamily(
            "Poppins", normal="Poppins", bold="Poppins-SemiBold",
            italic="Poppins", boldItalic="Poppins-SemiBold",
        )
        return "Poppins", "Poppins-SemiBold", "Poppins-Bold"
    except Exception:
        return "Helvetica", "Helvetica-Bold", "Helvetica-Bold"


BODY_FONT, SEMI_FONT, BOLD_FONT = register_fonts()

# --- styles -----------------------------------------------------------------

title = ParagraphStyle(
    "title", fontName=BOLD_FONT, fontSize=30, leading=36,
    textColor=BLACK, spaceAfter=10, alignment=TA_LEFT,
)
subtitle = ParagraphStyle(
    "subtitle", fontName=BODY_FONT, fontSize=13.5, leading=21,
    textColor=GREY, spaceAfter=0,
)
meta = ParagraphStyle(
    "meta", fontName=BODY_FONT, fontSize=9.5, leading=15, textColor=GREY,
)
h1 = ParagraphStyle(
    "h1", fontName=SEMI_FONT, fontSize=17, leading=23,
    textColor=BLACK, spaceBefore=22, spaceAfter=9,
)
h2 = ParagraphStyle(
    "h2", fontName=SEMI_FONT, fontSize=12, leading=17,
    textColor=BLACK, spaceBefore=14, spaceAfter=5,
)
body = ParagraphStyle(
    "body", fontName=BODY_FONT, fontSize=10.5, leading=17.5,
    textColor=BLACK, spaceAfter=9,
)
lead = ParagraphStyle(
    "lead", fontName=BODY_FONT, fontSize=12, leading=20,
    textColor=BLACK, spaceAfter=11,
)
note = ParagraphStyle(
    "note", fontName=BODY_FONT, fontSize=9, leading=14.5, textColor=GREY,
)


def bullets(items: list[str]) -> ListFlowable:
    return ListFlowable(
        [ListItem(Paragraph(t, body), leftIndent=13) for t in items],
        bulletType="bullet", bulletFontName=BODY_FONT, bulletFontSize=8,
        leftIndent=13, spaceAfter=8,
    )


def page_number(canvas, doc):
    if doc.page == 1:
        return
    canvas.saveState()
    canvas.setFont(BODY_FONT, 8.5)
    canvas.setFillColor(GREY)
    canvas.drawRightString(A4[0] - 22 * mm, 15 * mm, str(doc.page))
    canvas.drawString(22 * mm, 15 * mm, "Ponspods")
    canvas.restoreState()


# --- content ----------------------------------------------------------------

story: list = []

# Cover
story.append(Spacer(1, 58 * mm))
logo_w = 62 * mm
_logo = Image(str(LOGO), width=logo_w, height=logo_w * (145 / 900))
_logo.hAlign = "LEFT"
story.append(_logo)
story.append(Spacer(1, 26 * mm))
story.append(Paragraph("Volatility farming<br/>for tokenized stocks", title))
story.append(Spacer(1, 4 * mm))
story.append(
    Paragraph(
        "Wall Street manufactures volatility on a published schedule, "
        "for free. Ponspods charges a toll on it.",
        subtitle,
    )
)
story.append(Spacer(1, 46 * mm))
story.append(Paragraph("Whitepaper &mdash; version 0.1<br/>Built on Robinhood Chain", meta))
story.append(PageBreak())

# 1
story.append(Paragraph("1. Summary", h1))
story.append(
    Paragraph(
        "Ponspods is a volatility farming protocol for tokenized real-world assets. "
        "A Pod wraps a tokenized stock into a synthetic token, charges a fee on every "
        "entry, exit and trade, and permanently burns part of the supply with those fees. "
        "Liquidity providers earn the fee flow. Holders earn a claim that grows against itself.",
        lead,
    )
)
story.append(
    Paragraph(
        "The mechanism is not new. Peapods Finance demonstrated that liquidity can be paid "
        "out of real fee flow instead of token emissions. What is new is the fuel. Tokenized "
        "equities are the only assets on-chain whose volatility is produced off-chain, by "
        "someone else, according to a calendar published months in advance.",
        body,
    )
)

# 2
story.append(Paragraph("2. The problem with crypto-native volatility farming", h1))
story.append(
    Paragraph(
        "A volatility farm only earns when its underlying asset moves. Crypto volatility "
        "has three properties that make it poor collateral for this:",
        body,
    )
)
story.append(
    bullets(
        [
            "<b>It is unscheduled.</b> A quiet market pays nothing, and nobody can say in "
            "advance when the quiet ends.",
            "<b>There is no reference price.</b> With no external market to arbitrage "
            "against, correcting a drifting pool is optional. An arbitrageur must carry "
            "inventory in a volatile asset to do it, so frequently they simply do not.",
            "<b>Volatility and drawdown are the same event.</b> The week a farm earns most "
            "is the week its collateral is worth least.",
        ]
    )
)

# 3
story.append(Paragraph("3. Pods", h1))
story.append(Paragraph("3.1 Wrap", h2))
story.append(
    Paragraph(
        "A Pod accepts a tokenized asset and mints a wrapped representation of it. The "
        "underlying is held in reserve. Entering and leaving the Pod each carry a fee, set "
        "at deployment and immutable thereafter.",
        body,
    )
)
story.append(Paragraph("3.2 Farm", h2))
story.append(
    Paragraph(
        "The wrapped token is paired against a stablecoin in a full-range pool. Every wrap, "
        "unwrap and trade pays the Pod. Liquidity providers receive that fee flow directly. "
        "No token is minted to pay them.",
        body,
    )
)
story.append(Paragraph("3.3 Grow", h2))
story.append(
    Paragraph(
        "Part of every fee burns wrapped supply while the reserve stays intact. The ratio of "
        "reserve to supply &mdash; the collateral backing ratio &mdash; therefore rises, and "
        "cannot fall. Each Pod mints one-for-one on its first day; from then on, wrapping "
        "later mints fewer tokens, each redeemable for more.",
        body,
    )
)

# 4
story.append(Paragraph("4. Why real-world assets", h1))
story.append(Paragraph("4.1 Volatility on a calendar", h2))
story.append(
    Paragraph(
        "Earnings dates, rate decisions, inflation prints, options expiries and index "
        "rebalances are all published in advance. Expected fee flow becomes forecastable "
        "rather than retrospective &mdash; a property no crypto-native farm can offer.",
        body,
    )
)
story.append(Paragraph("4.2 The session gap", h2))
story.append(
    Paragraph(
        "A tokenized stock trades continuously. The exchange behind it does not. Between "
        "Friday close and Monday open the reference price is frozen while the token keeps "
        "moving, and the accumulated divergence must be corrected at the open &mdash; a "
        "correction that routes through the Pod and pays its fee. This repeats every week, "
        "and again around every session boundary and every halt.",
        body,
    )
)
story.append(
    Paragraph(
        "Pods for assets that follow market hours may apply a wider fee while the underlying "
        "market is closed, so liquidity providers are compensated for holding a position "
        "against a stale reference price rather than being selected against.",
        body,
    )
)
story.append(Paragraph("4.3 Forced arbitrage", h2))
story.append(
    Paragraph(
        "A listed equity has a published price on a deep market. When the Pod's pool drifts "
        "from it, the correction is riskless: the arbitrageur closes the position immediately "
        "on the reference venue and carries no inventory. Because their required margin is "
        "near zero, they act on far smaller deviations than they would for a crypto asset.",
        body,
    )
)
story.append(
    Paragraph(
        "The consequence is the central economic point of this document. Arbitrage only "
        "fires once a deviation exceeds the round-trip fee. That threshold is the same for "
        "everyone; what differs is the risk premium an arbitrageur adds on top. For a "
        "volatile crypto asset that premium is large and corrections are rare. For a "
        "tokenized equity it is negligible, and corrections are constant. A Pod does not "
        "earn more per correction &mdash; it earns far more often.",
        body,
    )
)
story.append(Paragraph("4.4 Native yield", h2))
story.append(
    Paragraph(
        "Many tokenized real-world assets already produce a return of their own, such as "
        "coupon or dividend equivalents. That return accrues to the Pod reserve, stacking on "
        "top of fee income rather than replacing it.",
        body,
    )
)
story.append(Paragraph("4.5 A single paired asset", h2))
story.append(
    Paragraph(
        "Pairing every Pod against one stablecoin keeps lending unified instead of "
        "fragmenting it across dozens of shallow markets, so a newly deployed Pod is "
        "connected to existing depth from the start.",
        body,
    )
)
story.append(Paragraph("4.6 Baskets", h2))
story.append(
    Paragraph(
        "A Pod may wrap a basket rather than a single asset, producing an index instrument "
        "whose fees reduce supply instead of being charged as a management fee. The share "
        "grows against the basket over time. Rebalancing, ordinarily a cost, becomes a fee "
        "event.",
        body,
    )
)

# 5
story.append(Paragraph("5. Leverage", h1))
story.append(
    Paragraph(
        "A participant may deposit only the wrapped side of the pair. The protocol borrows "
        "the stablecoin side on their behalf, mints the full-range liquidity position, and "
        "locks it as its own collateral. Because the position contains equal value of the "
        "collateral asset and the debt asset, it is self-collateralising.",
        body,
    )
)
story.append(
    Paragraph(
        "This is leveraged exposure to fee flow, not a directional bet. The liquidation "
        "threshold is 83.33% loan-to-value, the point at which the borrowed component can no "
        "longer cover its own repayment, which implies a leverage ceiling of six times. "
        "Because a full-range liquidity position is worth a multiple of the square root of "
        "price, collateral falls more slowly than the underlying &mdash; a cushion, not an "
        "exemption.",
        body,
    )
)
story.append(
    Paragraph(
        "Session gaps cut both ways. A position that is healthy at the close cannot be "
        "managed until the market reopens, so leverage should be sized against the possible "
        "gap rather than against intraday movement.",
        body,
    )
)

# 6
story.append(Paragraph("6. Lending", h1))
story.append(
    Paragraph(
        "Borrowers are liquidity providers who need the second side of a pair, not "
        "speculators taking a view. Suppliers of the paired stablecoin fund that leverage "
        "and receive the interest paid on it. Capital may be supplied to a curated vault "
        "spread across whitelisted Pods, or directly to a single isolated Pod market.",
        body,
    )
)
story.append(
    Paragraph(
        "A new Pod bootstraps its own market in a single transaction: the first borrower "
        "flash-borrows the paired asset, supplies it, then borrows it back against their own "
        "position. The market opens at full utilisation, which serves as a public signal "
        "that borrowing demand exists before any outside capital has arrived.",
        body,
    )
)

# 7
story.append(Paragraph("7. PODS", h1))
story.append(
    Paragraph(
        "The protocol token is <b>PODS</b>. Supply is fixed and there are no emissions; "
        "protocol revenue purchases PODS on the open market.",
        body,
    )
)
story.append(
    bullets(
        [
            "<b>PODS</b> &mdash; the fee and governance asset.",
            "<b>vlPODS</b> &mdash; PODS locked for voting. Holders whitelist Pods, direct "
            "how lending liquidity is allocated between them, and receive a share of "
            "protocol revenue in stablecoins.",
            "<b>pPODS</b> &mdash; PODS wrapped in its own Pod, so protocol revenue burns "
            "supply and the backing ratio rises for everyone who stays wrapped.",
        ]
    )
)
story.append(
    Paragraph(
        "The loop closes on itself: market movement forces arbitrage, arbitrage pays the "
        "Pod, fees pay liquidity providers and burn supply, deeper Pods make arbitrage "
        "cheaper and therefore more frequent, and revenue buys PODS. At no point is a new "
        "token printed to sustain it.",
        body,
    )
)

# 8
story.append(Paragraph("8. Risks", h1))
story.append(
    bullets(
        [
            "<b>Transfer restrictions.</b> Tokenized equities are issued instruments. If an "
            "issuer imposes whitelisting or transfer restrictions, a permissionless Pod "
            "cannot hold the asset. Free transferability is a precondition for everything "
            "described here.",
            "<b>Issuer risk.</b> A Pod cannot redeem what its issuer will not honour. The "
            "backing ratio offers no protection against a failed obligation.",
            "<b>Gap risk on leveraged positions.</b> A position that is solvent at the close "
            "may not be at the open, with no opportunity to intervene in between.",
            "<b>Liquidation outside market hours.</b> Liquidating a position while the "
            "reference market is shut requires liquidators willing to carry the asset until "
            "it reopens.",
            "<b>Regulatory exposure.</b> Leverage on tokenized securities touches existing "
            "rules. The protocol is non-custodial and neutral; interfaces are not.",
            "<b>Immutability.</b> Pod parameters cannot be altered after deployment. A "
            "poorly chosen fee schedule cannot be repaired.",
        ]
    )
)

# 9
story.append(Paragraph("9. Status", h1))
story.append(
    Paragraph(
        "Ponspods is pre-launch. No Pod is deployed, no contract is live, and every "
        "protocol figure is therefore unpublished rather than estimated. Nothing in this "
        "document is an offer, a solicitation, or investment advice.",
        body,
    )
)
story.append(Spacer(1, 8 * mm))
story.append(Paragraph("ponspods.com &nbsp;&middot;&nbsp; x.com/ponspods", note))


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=22 * mm,
        rightMargin=22 * mm,
        topMargin=22 * mm,
        bottomMargin=22 * mm,
        title="Ponspods Whitepaper",
        author="Ponspods",
        subject="Volatility farming for tokenized stocks",
    )
    doc.build(story, onFirstPage=page_number, onLaterPages=page_number)
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
