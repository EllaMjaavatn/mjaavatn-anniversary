import { useRef, useState } from "react";
import confetti from "canvas-confetti";

const images = [
  {
    src: "/mjaavatn-anniversary/ForsteTreff18.png",
    text: "Vår første treff, 2018 🍔",
  },
  {
    src: "/mjaavatn-anniversary/Oslo2019.jpg",
    text: "Vår første tur til Oslo sammen, tror jeg, 2019 ❤️",
  },
  {
    src: "/mjaavatn-anniversary/jul20.jpg",
    text: "Vår andre jul sammen, tror jeg, 2020 🎄",
  },
  {
    src: "/mjaavatn-anniversary/Nyttaar21.JPG",
    text: "Vårt nyttårsbilde sammen på Facetime, 2021 🎉",
  },
  {
    src: "/mjaavatn-anniversary/Kypros.png",
    text: "Vår tur til Kypros, 2022 🕶",
  },
  {
    src: "/mjaavatn-anniversary/ForsteThailandtur23.JPG",
    text: "Vår første ferie i Thailand sammen, 2023 🌴",
  },
  {
    src: "/mjaavatn-anniversary/mannogKone24.jpg",
    text: "Vårt første år som mann og kone, 2024 💍",
  },
  {
    src: "/mjaavatn-anniversary/thailandtur25.JPG",
    text: "Bryllupsreise og andre gang i Thailand, 2025 🌴",
  },
  {
    src: "/mjaavatn-anniversary/Rocky26.JPG",
    text: "Og selvfølgelig vårt 2026 .....🐺",
  },
];

const loveLetterText = `Hurra for vårt 8-årsjubileet og Happy Valentine på forkudd, kjære.
Tenk at vi nå har vært sammen i 8 år. Tiden flyr når jeg er sammen med deg.

På disse årene har vi delt så mange minner, opplevelser både oppturer og nedturer og vi har alltid stått sammen.

Jeg er så takknemlig for at jeg har deg i livet mitt.
Du er ikke bare min mann, men også min beste venn, min trygghet og mitt hjem.

Jeg er så utrolig glad i deg ❤️

Elsker deg alltid, jub jub 😘`;

export default function App() {
 const dialogRef = useRef(null);
  const intervalRef = useRef(null);

  const [pickedDate, setPickedDate] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [showAfterCloseText, setShowAfterCloseText] = useState(false);
  const [error, setError] = useState("");

  const CORRECT_DATE = "2018-02-13";
  const [typewriterText, setTypewriterText] = useState("");

 function startLoveTyping() {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  setTypewriterText("");
  let index = 0;

  intervalRef.current = window.setInterval(() => {
    index++;
    setTypewriterText(loveLetterText.slice(0, index));

    if (index >= loveLetterText.length) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, 50);
}

  function fireConfetti() {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  }

  function checkDate() {
    if (pickedDate === CORRECT_DATE) {
      setUnlocked(true);
      setShowAfterCloseText(false); //skjul tekst når åpner igjen
      fireConfetti();

      setTimeout(() => {
        dialogRef.current?.showModal();
        startLoveTyping();
      }, 1500);
    } else {
      setError("Feil dato 😢 Du har en sjanse til 😡");
    }
  }

  return (
    <main>
      {unlocked ? (
        <h1>💌 Kjærlighetsbrevet</h1>
      ) : (
        <h1>💌 Lås opp kjærlighetsbrevet</h1>
      )}

      {!unlocked && (
        <div className="card">
          <input
            type="date"
            value={pickedDate}
            onChange={(e) => setPickedDate(e.target.value)}
          />

          <button className="btn" onClick={checkDate}>
            Sjekk dato ❤️
          </button>
          <div className="errorText">
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}

      {/* Dialog brev */}
      <dialog
        ref={dialogRef}
        className="dialog"
        onClose={() => setShowAfterCloseText(true)}
      >
        <h2>Kjære Jørgen ❤️</h2>
        <p className="loveMessage">{typewriterText}</p>

        <div className="gallery">
          {images.map((img, i) => (
            <figure key={i} className="photoCard">
              <img className="photoImg" src={img.src} alt={img.text} />
              <figcaption className="imgTexts">{img.text}</figcaption>
            </figure>
          ))}
        </div>
        <button
          className="closeBtn"
          onClick={() => {
            dialogRef.current?.close();
          }}
        >
          ✕ Lukk brevet
        </button>
      </dialog>
      {showAfterCloseText && (
        <div className="summaryCloseText">
          <p>
            Jeg elsker deg så mye og jeg gleder meg til alle årene vi har foran
            oss 💖
          </p>

          <button
            className="reopenBtn"
            onClick={() => {
              setShowAfterCloseText(false);
              dialogRef.current?.showModal();
              startLoveTyping();
            }}
          >
            💌 Åpne brevet igjen
          </button>
        </div>
      )}
    </main>
  );
}