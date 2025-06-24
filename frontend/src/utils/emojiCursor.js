// frontend/src/utils/emojiCursor.js
export function emojiCursor(options) {
  const possibleEmoji = (options && options.emoji) || ["😀", "😂", "😆", "😊"];
  const delay = (options && options.delay) || 16;
  let hasWrapperEl = options && options.element;
  let element = hasWrapperEl || document.body;

  let width = window.innerWidth;
  let height = window.innerHeight;
  const cursor = { x: width / 2, y: width / 2 };
  const lastPos = { x: width / 2, y: width / 2 };
  let lastTimestamp = 0;
  const particles = [];
  const canvImages = [];
  let canvasRef, contextRef, animationFrameRef; // Gunakan Ref untuk menghindari closure issues

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Fungsi yang mengembalikan objek dengan metode init dan destroy
  const cursorController = {
    init: function() {
      if (prefersReducedMotion.matches) {
        console.log("This browser has prefers reduced motion turned on, so the cursor did not init");
        return false;
      }

      // Pastikan tidak ada canvas duplikat
      if (canvasRef) {
          this.destroy();
      }

      const newCanvas = document.createElement("canvas");
      const newContext = newCanvas.getContext("2d");

      newCanvas.style.top = "0px";
      newCanvas.style.left = "0px";
      newCanvas.style.pointerEvents = "none";
      newCanvas.style.position = hasWrapperEl ? "absolute" : "fixed"; // absolute if wrapper, fixed if body
      newCanvas.style.zIndex = "9999";

      if (hasWrapperEl) {
        element.appendChild(newCanvas);
        newCanvas.width = element.clientWidth;
        newCanvas.height = element.clientHeight;
      } else {
        document.body.appendChild(newCanvas);
        newCanvas.width = width;
        newCanvas.height = height;
      }

      canvasRef = newCanvas; // Simpan referensi canvas yang baru
      contextRef = newContext; // Simpan referensi context yang baru

      contextRef.font = "21px serif";
      contextRef.textBaseline = "middle";
      contextRef.textAlign = "center";

      // Hapus canvImages sebelumnya dan buat yang baru
      canvImages.length = 0; // Clear array
      possibleEmoji.forEach((emoji) => {
        let measurements = contextRef.measureText(emoji);
        let bgCanvas = document.createElement("canvas");
        let bgContext = bgCanvas.getContext("2d");

        bgCanvas.width = measurements.width;
        bgCanvas.height = measurements.actualBoundingBoxAscent * 2;

        bgContext.textAlign = "center";
        bgContext.font = "21px serif";
        bgContext.textBaseline = "middle";
        bgContext.fillText(
          emoji,
          bgCanvas.width / 2,
          measurements.actualBoundingBoxAscent
        );
        canvImages.push(bgCanvas);
      });

      this.bindEvents();
      this.loop();
      return true;
    },

    destroy: function() {
      if (canvasRef && canvasRef.parentNode) {
        canvasRef.parentNode.removeChild(canvasRef);
        canvasRef = null; // Reset referensi
        contextRef = null;
      }
      if (animationFrameRef) {
        cancelAnimationFrame(animationFrameRef);
        animationFrameRef = null;
      }
      this.removeEvents(); // Pastikan event listener dihapus
    },

    bindEvents: function() {
      element.addEventListener("mousemove", onMouseMove, { passive: true });
      element.addEventListener("touchmove", onTouchMove, { passive: true });
      element.addEventListener("touchstart", onTouchMove, { passive: true });
      window.addEventListener("resize", onWindowResize);
      // preferences
      prefersReducedMotion.onchange = this.init; // Re-init on change
    },

    removeEvents: function() {
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("touchmove", onTouchMove);
        element.removeEventListener("touchstart", onTouchMove);
        window.removeEventListener("resize", onWindowResize);
        prefersReducedMotion.onchange = null; // Hapus listener preferensi
    },

    loop: function() {
        if (contextRef) { // Hanya update jika context masih ada
            this.updateParticles();
            animationFrameRef = requestAnimationFrame(this.loop.bind(this)); // Bind this
        }
    },

    updateParticles: function() {
        if (!contextRef || particles.length === 0) {
            if(contextRef) contextRef.clearRect(0, 0, width, height);
            return;
        }

        contextRef.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update(contextRef);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles.splice(i, 1);
            }
        }
    }
  }; // End cursorController

  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;

    if (canvasRef) { // Cek canvasRef sebelum menggunakan
      if (hasWrapperEl) {
        canvasRef.width = element.clientWidth;
        canvasRef.height = element.clientHeight;
      } else {
        canvasRef.width = width;
        canvasRef.height = height;
      }
    }
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        addParticle(
          e.touches[i].clientX,
          e.touches[i].clientY,
          canvImages[Math.floor(Math.random() * canvImages.length)]
        );
      }
    }
  }

  function onMouseMove(e) {
    if (e.timeStamp - lastTimestamp < delay) {
      return;
    }

    window.requestAnimationFrame(() => {
      if (!canvasRef) return; // Cek canvasRef sebelum menggunakan

      if (hasWrapperEl) {
        const boundingRect = element.getBoundingClientRect();
        cursor.x = e.clientX - boundingRect.left;
        cursor.y = e.clientY - boundingRect.top;
      } else {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }

      const distBetweenPoints = Math.hypot(
        cursor.x - lastPos.x,
        cursor.y - lastPos.y
      );

      if (distBetweenPoints > 1) {
        addParticle(
          cursor.x,
          cursor.y,
          canvImages[Math.floor(Math.random() * possibleEmoji.length)]
        );

        lastPos.x = cursor.x;
        lastPos.y = cursor.y;
        lastTimestamp = e.timeStamp;
      }
    });
  }

  function addParticle(x, y, img) {
    particles.push(new Particle(x, y, img));
  }

  function Particle(x, y, canvasItem) {
    const lifeSpan = Math.floor(Math.random() * 60 + 80);
    this.initialLifeSpan = lifeSpan;
    this.lifeSpan = lifeSpan;
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: Math.random() * 0.4 + 0.8,
    };
    this.position = { x: x, y: y };
    this.canv = canvasItem;

    this.update = function (context) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;

      this.velocity.y += 0.05;

      const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

      context.drawImage(
        this.canv,
        this.position.x - (this.canv.width / 2) * scale,
        this.position.y - this.canv.height / 2,
        this.canv.width * scale,
        this.canv.height * scale
      );
    };
  }

  return cursorController; // Kembalikan controller
}
