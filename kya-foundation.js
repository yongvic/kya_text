// KYA Foundation - Script JavaScript Complet
document.addEventListener("DOMContentLoaded", () => {
  // ===== LOADING SCREEN =====
  const loadingScreen = document.getElementById("loadingScreen")

  // Simuler le chargement et cacher l'écran
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    document.body.style.overflow = "auto"

    // Supprimer complètement l'élément après l'animation
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.remove()
      }
    }, 600)
  }, 2000) // 2 secondes de chargement

  // ===== NAVIGATION =====
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Effet scroll navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Menu mobile
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })

    // Fermer le menu mobile au clic sur un lien
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      })
    })
  }

  // ===== HERO PARTICLES =====
  function createHeroParticles() {
    const heroParticles = document.getElementById("heroParticles")
    if (!heroParticles) return

    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.style.position = "absolute"
      particle.style.width = Math.random() * 4 + 2 + "px"
      particle.style.height = particle.style.width
      particle.style.background = `rgba(${Math.random() > 0.5 ? "245, 158, 11" : "16, 185, 129"}, ${Math.random() * 0.5 + 0.3})`
      particle.style.borderRadius = "50%"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`
      particle.style.animationDelay = Math.random() * 5 + "s"

      heroParticles.appendChild(particle)
    }
  }

  // ===== BOUTONS AVEC EFFETS =====
  const downloadBtn = document.getElementById("downloadBtn")
  const supportBtn = document.getElementById("supportBtn")

  function addRippleEffect(button) {
    if (!button) return

    button.addEventListener("click", function (e) {
      const ripple = this.querySelector(".btn-ripple")
      if (ripple) {
        ripple.style.width = "300px"
        ripple.style.height = "300px"

        setTimeout(() => {
          ripple.style.width = "0"
          ripple.style.height = "0"
        }, 600)
      }

      // Simuler le téléchargement
      if (this.id === "downloadBtn") {
        console.log("Téléchargement de la lettre d'engagement...")
        // Ici vous pouvez ajouter la logique de téléchargement réel
      }

      if (this.id === "supportBtn") {
        console.log("Redirection vers la page de soutien...")
        // Ici vous pouvez ajouter la logique de redirection
      }
    })
  }

  addRippleEffect(downloadBtn)
  addRippleEffect(supportBtn)

  // ===== VIDÉO DIRECTEUR =====
  const playDirectorVideo = document.getElementById("playDirectorVideo")
  const directorVideo = document.querySelector(".director-video")

  if (playDirectorVideo && directorVideo) {
    playDirectorVideo.addEventListener("click", () => {
      if (directorVideo.paused) {
        directorVideo.play()
        playDirectorVideo.innerHTML = '<i class="fas fa-pause"></i>'
      } else {
        directorVideo.pause()
        playDirectorVideo.innerHTML = '<i class="fas fa-play"></i>'
      }
    })
  }

  // ===== LECTEUR VIDÉO INTERACTIF =====
  const kyaVideo = document.getElementById("kyaVideo")
  const videoControls = document.getElementById("videoControls")
  const videoOverlay = document.getElementById("videoOverlay")
  const videoLoading = document.getElementById("videoLoading")
  const playPauseBtn = document.getElementById("playPauseBtn")
  const playPauseIcon = document.getElementById("playPauseIcon")
  const playButtonLarge = document.getElementById("playButtonLarge")
  const progressBar = document.getElementById("progressBar")
  const progressFilled = document.getElementById("progressFilled")
  const progressHandle = document.getElementById("progressHandle")
  const currentTimeSpan = document.getElementById("currentTime")
  const durationSpan = document.getElementById("duration")
  const volumeBtn = document.getElementById("volumeBtn")
  const volumeIcon = document.getElementById("volumeIcon")
  const volumeBar = document.querySelector(".volume-bar")
  const volumeFilled = document.getElementById("volumeFilled")
  const volumeHandle = document.getElementById("volumeHandle")
  const speedBtn = document.getElementById("speedBtn")
  const speedMenu = document.getElementById("speedMenu")
  const speedOptions = document.querySelectorAll(".speed-option")
  const fullscreenBtn = document.getElementById("fullscreenBtn")
  const fullscreenIcon = document.getElementById("fullscreenIcon")

  if (kyaVideo) {
    let isPlaying = false
    let isDragging = false
    let isVolumeDragging = false
    let currentVolume = 1

    // Format time helper
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    // Show loading
    function showLoading() {
      if (videoLoading) videoLoading.classList.add("show")
    }

    // Hide loading
    function hideLoading() {
      if (videoLoading) videoLoading.classList.remove("show")
    }

    // Update progress bar
    function updateProgress() {
      if (!kyaVideo || isDragging) return

      const progress = (kyaVideo.currentTime / kyaVideo.duration) * 100
      if (progressFilled) progressFilled.style.width = progress + "%"
      if (progressHandle) progressHandle.style.left = progress + "%"
      if (currentTimeSpan) currentTimeSpan.textContent = formatTime(kyaVideo.currentTime)
    }

    // Update volume display
    function updateVolumeDisplay() {
      const volumePercent = kyaVideo.volume * 100
      if (volumeFilled) volumeFilled.style.width = volumePercent + "%"
      if (volumeHandle) volumeHandle.style.right = 100 - volumePercent + "%"

      // Update volume icon
      if (volumeIcon) {
        if (kyaVideo.volume === 0) {
          volumeIcon.className = "fas fa-volume-mute"
        } else if (kyaVideo.volume < 0.5) {
          volumeIcon.className = "fas fa-volume-down"
        } else {
          volumeIcon.className = "fas fa-volume-up"
        }
      }
    }

    // Play/Pause functionality
    function togglePlayPause() {
      if (isPlaying) {
        kyaVideo.pause()
      } else {
        kyaVideo.play()
      }
    }

    // Event Listeners
    kyaVideo.addEventListener("loadstart", showLoading)
    kyaVideo.addEventListener("canplay", hideLoading)
    kyaVideo.addEventListener("waiting", showLoading)
    kyaVideo.addEventListener("playing", hideLoading)

    kyaVideo.addEventListener("loadedmetadata", () => {
      if (durationSpan) durationSpan.textContent = formatTime(kyaVideo.duration)
      updateVolumeDisplay()
    })

    kyaVideo.addEventListener("timeupdate", updateProgress)

    kyaVideo.addEventListener("play", () => {
      isPlaying = true
      if (playPauseIcon) playPauseIcon.className = "fas fa-pause"
      if (videoOverlay) videoOverlay.classList.add("hidden")
    })

    kyaVideo.addEventListener("pause", () => {
      isPlaying = false
      if (playPauseIcon) playPauseIcon.className = "fas fa-play"
    })

    kyaVideo.addEventListener("ended", () => {
      isPlaying = false
      if (playPauseIcon) playPauseIcon.className = "fas fa-replay"
      if (videoOverlay) videoOverlay.classList.remove("hidden")
    })

    // Play/Pause button clicks
    if (playPauseBtn) {
      playPauseBtn.addEventListener("click", togglePlayPause)
    }

    if (playButtonLarge) {
      playButtonLarge.addEventListener("click", togglePlayPause)
    }

    if (videoOverlay) {
      videoOverlay.addEventListener("click", togglePlayPause)
    }

    // Progress bar interaction
    if (progressBar) {
      progressBar.addEventListener("mousedown", (e) => {
        isDragging = true
        const rect = progressBar.getBoundingClientRect()
        const percent = (e.clientX - rect.left) / rect.width
        kyaVideo.currentTime = percent * kyaVideo.duration
      })

      progressBar.addEventListener("mousemove", (e) => {
        if (!isDragging) return
        const rect = progressBar.getBoundingClientRect()
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        kyaVideo.currentTime = percent * kyaVideo.duration
      })
    }

    document.addEventListener("mouseup", () => {
      isDragging = false
      isVolumeDragging = false
    })

    // Volume control
    if (volumeBtn) {
      volumeBtn.addEventListener("click", () => {
        if (kyaVideo.volume === 0) {
          kyaVideo.volume = currentVolume
        } else {
          currentVolume = kyaVideo.volume
          kyaVideo.volume = 0
        }
        updateVolumeDisplay()
      })
    }

    if (volumeBar) {
      volumeBar.addEventListener("mousedown", (e) => {
        isVolumeDragging = true
        const rect = volumeBar.getBoundingClientRect()
        const percent = (e.clientX - rect.left) / rect.width
        kyaVideo.volume = Math.max(0, Math.min(1, percent))
        updateVolumeDisplay()
      })

      volumeBar.addEventListener("mousemove", (e) => {
        if (!isVolumeDragging) return
        const rect = volumeBar.getBoundingClientRect()
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        kyaVideo.volume = percent
        updateVolumeDisplay()
      })
    }

    // Speed control
    speedOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const speed = Number.parseFloat(option.dataset.speed)
        kyaVideo.playbackRate = speed

        // Update active state
        speedOptions.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")

        // Update button text
        if (speedBtn) {
          speedBtn.querySelector(".speed-text").textContent = speed + "x"
        }
      })
    })

    // Fullscreen
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          kyaVideo.requestFullscreen().then(() => {
            if (fullscreenIcon) fullscreenIcon.className = "fas fa-compress"
          })
        } else {
          document.exitFullscreen().then(() => {
            if (fullscreenIcon) fullscreenIcon.className = "fas fa-expand"
          })
        }
      })
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (!kyaVideo) return

      // Only work when video is focused or visible
      const videoRect = kyaVideo.getBoundingClientRect()
      const isVideoVisible = videoRect.top < window.innerHeight && videoRect.bottom > 0

      if (!isVideoVisible) return

      switch (e.code) {
        case "Space":
          e.preventDefault()
          togglePlayPause()
          break
        case "ArrowLeft":
          e.preventDefault()
          kyaVideo.currentTime = Math.max(0, kyaVideo.currentTime - 10)
          break
        case "ArrowRight":
          e.preventDefault()
          kyaVideo.currentTime = Math.min(kyaVideo.duration, kyaVideo.currentTime + 10)
          break
        case "ArrowUp":
          e.preventDefault()
          kyaVideo.volume = Math.min(1, kyaVideo.volume + 0.1)
          updateVolumeDisplay()
          break
        case "ArrowDown":
          e.preventDefault()
          kyaVideo.volume = Math.max(0, kyaVideo.volume - 0.1)
          updateVolumeDisplay()
          break
        case "KeyM":
          e.preventDefault()
          if (kyaVideo.volume === 0) {
            kyaVideo.volume = currentVolume
          } else {
            currentVolume = kyaVideo.volume
            kyaVideo.volume = 0
          }
          updateVolumeDisplay()
          break
        case "KeyF":
          e.preventDefault()
          fullscreenBtn.click()
          break
      }
    })

    // Show/hide controls on hover
    const videoWrapper = kyaVideo.closest(".video-wrapper")
    if (videoWrapper) {
      let controlsTimeout

      function showControls() {
        if (videoControls) videoControls.classList.add("show")
        clearTimeout(controlsTimeout)
      }

      function hideControls() {
        controlsTimeout = setTimeout(() => {
          if (videoControls && isPlaying) videoControls.classList.remove("show")
        }, 3000)
      }

      videoWrapper.addEventListener("mouseenter", showControls)
      videoWrapper.addEventListener("mousemove", showControls)
      videoWrapper.addEventListener("mouseleave", hideControls)

      // Keep controls visible when interacting with them
      if (videoControls) {
        videoControls.addEventListener("mouseenter", () => {
          clearTimeout(controlsTimeout)
        })
        videoControls.addEventListener("mouseleave", hideControls)
      }
    }
  }

  // ===== COMPTEURS ANIMÉS =====
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-count"))
      if (isNaN(target)) return

      let current = 0
      const increment = target / 100

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.floor(current)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // ===== SWIPER CAROUSEL =====
  let activitiesSwiper;

  function initSwiper() {
    if (typeof window.Swiper !== "undefined") {
      activitiesSwiper = new window.Swiper(".activitiesSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      })
    } else {
      // Retry after a short delay if Swiper is not loaded yet
      setTimeout(initSwiper, 100)
    }
  }

  // ===== INTERSECTION OBSERVER POUR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate")

        // Déclencher les compteurs pour les statistiques
        if (entry.target.classList.contains("domain-card") && entry.target.querySelector(".stat-number")) {
          setTimeout(animateCounters, 500)
        }
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec data-aos
  const aosElements = document.querySelectorAll("[data-aos]")
  aosElements.forEach((element) => {
    observer.observe(element)
  })

  // ===== SMOOTH SCROLLING =====
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault()
        const targetSection = document.querySelector(targetId)
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== SCROLL INDICATOR =====
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const actionsSection = document.querySelector(".actions-goals-section")
      if (actionsSection) {
        actionsSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  // ===== PARALLAX EFFECT =====
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroVideo = document.querySelector(".hero-video")
    const directorVideo = document.querySelector(".director-video")

    if (heroVideo) {
      heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`
    }

    if (directorVideo) {
      directorVideo.style.transform = `translateY(${scrolled * 0.3}px)`
    }
  })

  // ===== INITIALISATION =====
  // Créer les particules du hero
  createHeroParticles()

  // Initialiser Swiper après un court délai
  setTimeout(initSwiper, 500)

  // Marquer le body comme chargé
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 2500)

  // ===== GESTION DES ERREURS VIDÉO =====
  const videos = document.querySelectorAll("video")
  videos.forEach((video) => {
    video.addEventListener("error", () => {
      console.log("Erreur de chargement vidéo, utilisation de l'image de fallback")
      // La balise img de fallback sera automatiquement affichée
    })
  })

  // ===== OPTIMISATION PERFORMANCE =====
  // Debounce function pour optimiser les événements scroll
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Optimiser le scroll handler
  const optimizedScrollHandler = debounce(() => {
    // Logique de scroll optimisée si nécessaire
  }, 10)

  window.addEventListener("scroll", optimizedScrollHandler)
})

// ===== ANIMATIONS CSS KEYFRAMES DYNAMIQUES =====
const style = document.createElement("style")
style.textContent = `
  @keyframes floatParticle {
    0% {
      transform: translateY(0px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  .loading-screen.hidden {
    opacity: 0;
    pointer-events: none;
  }
  
  body.loaded {
    overflow-x: hidden;
  }
  
  /* Navigation mobile */
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      top: 80px;
      left: -100%;
      width: 100%;
      height: calc(100vh - 80px);
      background: rgba(10, 10, 10, 0.98);
      backdrop-filter: blur(20px);
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 2rem;
      transition: left 0.3s ease;
      z-index: 999;
    }
    
    .nav-menu.active {
      left: 0;
    }
    
    .nav-link {
      padding: 1rem 2rem;
      font-size: 1.2rem;
      width: 100%;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`
document.head.appendChild(style)

// ===== GESTION DU REDIMENSIONNEMENT =====
window.addEventListener(
  "resize",
  debounce(() => {
    // Réinitialiser Swiper si nécessaire
    if (window.activitiesSwiper) {
      window.activitiesSwiper.update()
    }
  }, 250),
)

console.log("🚀 KYA Foundation - Script chargé avec succès!")