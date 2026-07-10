import { useCallback, useEffect, useState } from "react";
import { AboutModal } from "./components/AboutModal/AboutModal";
import { DiceRoller } from "./components/DiceRoller/DiceRoller";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { HistoryDrawer } from "./components/HistoryDrawer/HistoryDrawer";
import { QuestionInput } from "./components/QuestionInput/QuestionInput";
import { ResultScene } from "./components/ResultScene/ResultScene";
import { RollStatus } from "./components/RollStatus/RollStatus";
import { SceneBackground } from "./components/SceneBackground/SceneBackground";
import { ShareModal } from "./components/ShareModal/ShareModal";
import { WhisperLayer } from "./components/WhisperLayer/WhisperLayer";
import { loadingTexts } from "./data";
import { useHistory } from "./hooks/useHistory";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useAssetCssVariables } from "./hooks/useAssetCssVariables";
import type { AppState, CheckHistoryItem, CheckResult } from "./types";
import {
  generateCheck,
  reshuffleCheck,
  restoreHistoryItem,
} from "./utils/checkEngine";
import { pickOne } from "./utils/random";

const PRIMARY_LOADING_TEXT = "你的脑内正在请求一次检定……";

function App() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [revealStep, setRevealStep] = useState(0);
  const [loadingDetail, setLoadingDetail] = useState("当前状态尚未决定。");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const assetCssVariables = useAssetCssVariables();
  const { history, saveResult, clearHistory } = useHistory();

  const startRoll = useCallback(
    (nextQuestion: string) => {
      const trimmed = nextQuestion.trim();
      if (!trimmed) {
        setError("先放进一点精神噪声。");
        return;
      }

      const nextResult = generateCheck(trimmed, history);
      const details = loadingTexts.filter(
        (item) =>
          item.text !== PRIMARY_LOADING_TEXT &&
          (item.category === "all" || item.category === nextResult.category),
      );
      setError("");
      setQuestion(trimmed);
      setResult(nextResult);
      setLoadingDetail(pickOne(details).text);
      setRevealStep(0);
      setAppState("rolling");
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    },
    [history],
  );

  useEffect(() => {
    if (appState !== "rolling" || !result) return;
    const timeout = window.setTimeout(
      () => {
        setRevealStep(0);
        setAppState("revealing");
      },
      reducedMotion ? 80 : 850,
    );
    return () => window.clearTimeout(timeout);
  }, [appState, reducedMotion, result]);

  useEffect(() => {
    if (appState !== "revealing" || !result) return;
    const finalStep = result.skillLines.length + 3;
    const timeout = window.setTimeout(
      () => {
        if (revealStep >= finalStep) {
          setAppState("result");
          saveResult(result);
        } else {
          setRevealStep((current) => current + 1);
        }
      },
      reducedMotion ? 40 : revealStep < 3 ? 180 : 220,
    );
    return () => window.clearTimeout(timeout);
  }, [appState, reducedMotion, result, revealStep, saveResult]);

  const handleShuffle = () => {
    if (!result) return;
    const next = reshuffleCheck(result, history);
    setResult(next);
    saveResult(next);
  };

  const handleEdit = () => {
    setShareOpen(false);
    setResult(null);
    setRevealStep(0);
    setAppState("idle");
  };

  const handleRestore = (item: CheckHistoryItem) => {
    const restored = restoreHistoryItem(item);
    if (!restored) return;
    setQuestion(restored.question);
    setResult(restored);
    setRevealStep(restored.skillLines.length + 3);
    setAppState("result");
    setHistoryOpen(false);
  };

  const isHomeState = appState === "idle" || appState === "rolling";

  return (
    <div className={`app app--${appState}`} style={assetCssVariables}>
      <SceneBackground state={appState} />
      <div className="texture-layer" aria-hidden="true" />

      <div className="app__content">
        <Header onAbout={() => setAboutOpen(true)} onHistory={() => setHistoryOpen(true)} />

        {isHomeState && (
          <main className="home-scene">
            <div className="home-scene__content">
              <Hero />
              <QuestionInput
                value={question}
                onChange={(value) => {
                  setQuestion(value);
                  setError("");
                }}
                onSubmit={() => startRoll(question)}
                disabled={appState === "rolling"}
                error={error}
              />
              <WhisperLayer active={appState === "idle"} />
            </div>

            <aside className="home-scene__dice" aria-label="两枚未认证测量工具">
              <p>2D6 / TWO UNCERTIFIED MEASUREMENT TOOLS</p>
              <DiceRoller />
            </aside>

            {appState === "rolling" && result && (
              <RollStatus
                text={PRIMARY_LOADING_TEXT}
                detail={loadingDetail}
                dice={result.dice}
              />
            )}
          </main>
        )}

        {(appState === "revealing" || appState === "result") && result && (
          <ResultScene
            result={result}
            state={appState}
            revealStep={revealStep}
            onRetry={() => startRoll(result.question)}
            onShuffle={handleShuffle}
            onShare={() => setShareOpen(true)}
            onEdit={handleEdit}
          />
        )}

        <footer className="site-footer">
          <span>本工具仅供娱乐。骰子不会承担现实责任。</span>
          <span>非官方粉丝致敬项目。原作相关资产归其权利人所有。</span>
        </footer>
      </div>

      <HistoryDrawer
        open={historyOpen}
        items={history}
        onClose={() => setHistoryOpen(false)}
        onRestore={handleRestore}
        onClear={clearHistory}
      />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      {result && (
        <ShareModal open={shareOpen} result={result} onClose={() => setShareOpen(false)} />
      )}
    </div>
  );
}

export default App;
