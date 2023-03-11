const text = document.querySelector(".text p");

text.innerHTML = text.innerText
  .split("")
  .map(
    (char, i) => `<span style="transform:rotate(${i * 4.2}deg)">${char}</span>`
  )
  .join("");

const heroTl = gsap.timeline({
  defaults: { duration: 1 },
  repeat: -1,
  yoyo: true,
  delay: 0.5,
});

const rotateTl = gsap.timeline({ repeat: -1, delay: 1 }).pause();

rotateTl.from(".text", {
  ease: "none",
  duration: 7,
  rotation: 360,
  delay: -1,

  onComplete: () => {
    rotateTl.pause();

    heroTl.play();
  },
});
rotateTl.to(".text", {
  display: "none",
});

heroTl
  .from(".top__right", {
    y: "-100%",
  })
  .from(".hero", {
    opacity: "0",
    x: "10%",
    ease: "power4.inOut",
    onComplete: () => rotateTl.play(),
  })
  .from(".animate", {
    opacity: 0,
    y: 70,
    stagger: 0.5,
    onComplete: () => heroTl.pause(),
  });
