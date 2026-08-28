"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TxRequest = {
  /** Button label, e.g. "Open 3.0x position". */
  title: string;
  /** What the user would actually be signing. */
  rows?: [string, string][];
  /** Optional extra warning shown above the summary. */
  note?: string;
};

type WalletCtx = {
  connected: boolean;
  address: string | null;
  walletName: string | null;
  connect: () => void;
  disconnect: () => void;
  /** Connect first if needed, then walk through the signature flow. */
  request: (tx: TxRequest) => void;
};

const Ctx = createContext<WalletCtx | null>(null);

export function useWallet() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Wallets                                                             */
/* ------------------------------------------------------------------ */

const WALLETS = [
  { id: "robinhood", name: "Robinhood Wallet", hint: "Native to the chain" },
  { id: "metamask", name: "MetaMask", hint: "Browser extension" },
  { id: "rabby", name: "Rabby", hint: "Browser extension" },
  { id: "wc", name: "WalletConnect", hint: "Scan with a mobile wallet" },
];

const DEMO_ADDRESS = "0x7a4f9c2E13bb04A6d5F8Ce71a0937B5c1fD2c19b";

function short(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

/* ------------------------------------------------------------------ */
/* Modal chrome                                                        */
/* ------------------------------------------------------------------ */

function Modal({
  children,
  onClose,
  labelledBy,
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="card-shell relative w-full max-w-md">
        <div className="card-inner p-6 sm:p-7">{children}</div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span
      className="border-lime/25 border-t-lime inline-block h-5 w-5 animate-spin rounded-full border-2"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

type Stage = "idle" | "picking" | "connecting" | "signing" | "broadcasting" | "done";

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [tx, setTx] = useState<TxRequest | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const after = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const close = useCallback(() => {
    clearTimers();
    setStage("idle");
    setTx(null);
  }, []);

  const runSignature = useCallback(() => {
    setStage("signing");
    after(1700, () => {
      setStage("broadcasting");
      after(1200, () => setStage("done"));
    });
  }, []);

  const pickWallet = (w: (typeof WALLETS)[number]) => {
    setWalletName(w.name);
    setStage("connecting");
    after(1100, () => {
      setAddress(DEMO_ADDRESS);
      // If this connection was triggered by an action, carry straight on to it.
      if (tx) runSignature();
      else setStage("idle");
    });
  };

  const connect = useCallback(() => {
    setTx(null);
    setStage("picking");
  }, []);

  const disconnect = useCallback(() => {
    clearTimers();
    setAddress(null);
    setWalletName(null);
    setStage("idle");
  }, []);

  const request = useCallback(
    (next: TxRequest) => {
      setTx(next);
      if (address) runSignature();
      else setStage("picking");
    },
    [address, runSignature],
  );

  const value = useMemo(
    () => ({
      connected: Boolean(address),
      address,
      walletName,
      connect,
      disconnect,
      request,
    }),
    [address, walletName, connect, disconnect, request],
  );

  return (
    <Ctx.Provider value={value}>
      {children}

      {stage === "picking" ? (
        <Modal onClose={close} labelledBy="wallet-title">
          <h2 id="wallet-title" className="text-xl font-extrabold">
            Connect a wallet
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/45">
            {tx
              ? "Connect to continue. You will be asked to sign after."
              : "Ponspods never holds your keys. You sign everything yourself."}
          </p>
          <div className="mt-6 space-y-2.5">
            {WALLETS.map((w) => (
              <button
                key={w.id}
                onClick={() => pickWallet(w)}
                className="border-line hover:border-lime/50 flex w-full items-center justify-between rounded-xl border bg-[#070f05] px-4 py-3.5 text-left transition-colors"
              >
                <span>
                  <span className="block text-sm font-bold text-white">{w.name}</span>
                  <span className="block text-[11px] text-white/40">{w.hint}</span>
                </span>
                <span className="text-lime text-lg leading-none">›</span>
              </button>
            ))}
          </div>
          <button
            onClick={close}
            className="mt-5 w-full text-center text-xs font-semibold text-white/35 hover:text-white/60"
          >
            Cancel
          </button>
        </Modal>
      ) : null}

      {stage === "connecting" ? (
        <Modal onClose={close} labelledBy="connecting-title">
          <div className="py-6 text-center">
            <div className="flex justify-center">
              <Spinner />
            </div>
            <h2 id="connecting-title" className="mt-5 text-lg font-extrabold">
              Opening {walletName}
            </h2>
            <p className="mt-2 text-sm text-white/45">Approve the connection in your wallet.</p>
          </div>
        </Modal>
      ) : null}

      {stage === "signing" || stage === "broadcasting" ? (
        <Modal onClose={close} labelledBy="sign-title">
          <div className="flex items-start gap-4">
            <Spinner />
            <div className="min-w-0">
              <h2 id="sign-title" className="text-lg font-extrabold">
                {stage === "signing" ? "Waiting for signature" : "Broadcasting"}
              </h2>
              <p className="mt-1.5 text-sm text-white/45">
                {stage === "signing"
                  ? `Confirm in ${walletName ?? "your wallet"}.`
                  : "Sending the signed transaction."}
              </p>
            </div>
          </div>

          {tx ? (
            <div className="border-line mt-6 rounded-xl border bg-[#070f05] p-4">
              <p className="text-mint text-sm font-bold">{tx.title}</p>
              {tx.rows?.length ? (
                <div className="border-line/60 mt-3 space-y-2 border-t pt-3">
                  {tx.rows.map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-3 text-xs">
                      <span className="shrink-0 text-white/40">{k}</span>
                      <span className="tnum truncate font-bold text-white/85">{v}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {tx.note ? (
                <p className="mt-3 text-[11px] leading-relaxed text-[#e0a23b]">{tx.note}</p>
              ) : null}
            </div>
          ) : null}

          <button
            onClick={close}
            className="mt-5 w-full text-center text-xs font-semibold text-white/35 hover:text-white/60"
          >
            Reject
          </button>
        </Modal>
      ) : null}

      {stage === "done" ? (
        <Modal onClose={close} labelledBy="done-title">
          <div className="text-center">
            <span className="border-lime/40 bg-lime/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#7fe339"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 id="done-title" className="mt-5 text-lg font-extrabold">
              Signed
            </h2>
            <p className="mx-auto mt-2.5 max-w-sm text-sm leading-relaxed text-white/45">
              And that is as far as it goes. No Pod is deployed yet, so there was no contract to
              send this to. Nothing left your wallet and nothing was charged.
            </p>
            <button onClick={close} className="btn-light mt-6 w-full px-4 py-3 text-sm">
              Close
            </button>
          </div>
        </Modal>
      ) : null}
    </Ctx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

/** Primary action that runs the connect-then-sign flow. */
export function ActionButton({
  tx,
  children,
  className = "",
  disabled = false,
}: {
  tx: TxRequest;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const { request, connected } = useWallet();
  return (
    <button
      onClick={() => request(tx)}
      disabled={disabled}
      className={`btn-light w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {connected ? children : "Connect wallet"}
    </button>
  );
}

export function ConnectButton() {
  const { connected, address, connect, disconnect } = useWallet();
  return (
    <button
      onClick={connected ? disconnect : connect}
      className={
        connected
          ? "border-line hover:border-lime/50 tnum rounded-full border px-4 py-2 text-sm font-bold text-white/80 transition-colors"
          : "btn-light px-4 py-2 text-sm"
      }
      title={connected ? "Disconnect" : "Connect a wallet"}
    >
      {connected && address ? short(address) : "Connect"}
    </button>
  );
}
