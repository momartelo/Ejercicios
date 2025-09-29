import confetti from "canvas-confetti";

export const lanzarConfeti = () => {
  const duration = 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      colors: ["#ff0000", "#ffffff", "#ff0000", "#ffffff"],
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      colors: ["#75aadb", "#ffffff", "#75aadb", "#ffffff"],
      spread: 55,
      origin: { x: 1 },
    });
    confetti({
      particleCount: 5,
      spread: 70,
      colors: ["#009A49", "#ffd200", "#009A49", "#ffd200"],
      origin: { x: 0.5, y: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
