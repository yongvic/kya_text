// Script JavaScript Ultra-Moderne pour la page À propos
class ModernAboutPage {
  constructor() {
    this.init()
    this.setupEventListeners()
    this.initAnimations()
    this.createParticleSystem()
    this.initScrollEffects()
  }

  init() {
    // Configuration initiale
    this.navbar = document.querySelector(".navbar")
    this.navProgress = document.querySelector(".nav-progress")
    this.hamburger = document.getElementById("hamburger")
    this.navMenu = document.querySelector(".nav-menu")

    // Éléments d'animation
    this.impactCards = document.querySelectorAll(".stat-card")
    this.memberCards = document.querySelectorAll(".member-card")
    this.valueCards = document.querySelectorAll(".value-card")

    // Configuration des observateurs
    this.setupIntersectionObservers()

    // Initialiser le carrousel
    this.initCarousel()

    console.log("🚀 ModernAboutPage initialized")
  }

  setupEventListeners() {
    // Navigation
    window.addEventListener("scroll", this.handleScroll.bind(this))

    // Menu mobile
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", this.toggleMobileMenu.bind(this))
    }

    // Boutons CTA
    const organigrammeBtn = document.getElementById("organigramme-btn")
    const rejoindreBtn = document.getElementById("rejoindre-btn")

    if (organigrammeBtn) {
      organigrammeBtn.addEventListener("click", this.handleOrganigrammeClick.bind(this))
    }

    if (rejoindreBtn) {
      rejoindreBtn.addEventListener("click", this.handleRejoindreClick.bind(this))
    }

    // Effets de hover avancés
    this.setupAdvancedHoverEffects()

    // Gestion du redimensionnement
    window.addEventListener("resize", this.debounce(this.handleResize.bind(this), 250))

    // Gestion de la visibilité de la page
    document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this))
  }

  initCarousel() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".carousel-slide")
    this.indicators = document.querySelectorAll(".indicator")
    this.prevBtn = document.getElementById("prevBtn")
    this.nextBtn = document.getElementById("nextBtn")

    if (!this.slides.length) return

    // Event listeners pour les boutons
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.previousSlide())
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide())
    }

    // Event listeners pour les indicateurs
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index))
    })

    // Auto-play (optionnel)
    this.startAutoPlay()

    console.log("🎠 Carousel initialized")
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length
    this.updateSlide()
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.updateSlide()
  }

  goToSlide(index) {
    this.currentSlide = index
    this.updateSlide()
  }

  updateSlide() {
    // Mettre à jour les slides
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide)
    })

    // Mettre à jour les indicateurs
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide)
    })
  }

  startAutoPlay() {
    // Auto-play toutes les 5 secondes
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)

    // Pause au survol
    const carouselContainer = document.querySelector(".hero-carousel")
    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", () => {
        clearInterval(this.autoPlayInterval)
      })

      carouselContainer.addEventListener("mouseleave", () => {
        this.startAutoPlay()
      })
    }
  }

  handleScroll() {
    const scrolled = window.pageYOffset
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = (scrolled / maxScroll) * 100

    // Mise à jour de la barre de progression de navigation
    if (this.navProgress) {
      this.navProgress.style.width = `${scrollProgress}%`
    }

    // Effet de navbar
    if (scrolled > 50) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.98)"
      this.navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
      this.navbar.style.backdropFilter = "blur(30px)"
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.8)"
      this.navbar.style.boxShadow = "none"
      this.navbar.style.backdropFilter = "blur(20px)"
    }

    // Parallax effects
    this.updateParallaxEffects(scrolled)
  }

  updateParallaxEffects(scrolled) {
    // Hero parallax
    const heroMesh = document.querySelector(".hero-mesh")
    if (heroMesh) {
      heroMesh.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.01}deg)`
    }

    // Background elements parallax
    const backgroundParticles = document.querySelector(".background-particles")
    if (backgroundParticles) {
      backgroundParticles.style.transform = `translateY(${scrolled * 0.1}px)`
    }

    // Impact cards parallax
    this.impactCards.forEach((card, index) => {
      const speed = (index + 1) * 0.05
      card.style.transform = `translateY(${scrolled * speed}px)`
    })
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle("active")
    this.hamburger.classList.toggle("active")

    // Animation des barres du hamburger
    const spans = this.hamburger.querySelectorAll("span")
    spans.forEach((span, index) => {
      if (this.hamburger.classList.contains("active")) {
        span.style.transform =
          index === 0
            ? "rotate(45deg) translate(5px, 5px)"
            : index === 1
              ? "opacity(0)"
              : "rotate(-45deg) translate(7px, -6px)"
      } else {
        span.style.transform = "none"
        span.style.opacity = "1"
      }
    })
  }

  setupIntersectionObservers() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    // Observer pour les animations générales
    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")

          // Animations spécifiques
          if (entry.target.classList.contains("stat-card")) {
            this.animateStatCard(entry.target)
          }

          if (entry.target.classList.contains("vision-card")) {
            this.animateVisionCard(entry.target)
          }
        }
      })
    }, observerOptions)

    // Observer tous les éléments avec data-aos
    document.querySelectorAll("[data-aos]").forEach((el) => {
      this.animationObserver.observe(el)
    })

    // Observer spécial pour la section impact
    const impactSection = document.querySelector(".impact-section")
    if (impactSection) {
      const impactObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateImpactSection()
              impactObserver.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.3 },
      )

      impactObserver.observe(impactSection)
    }
  }

  animateStatCard(card) {
    const number = card.querySelector(".stat-number")
    const progressCircle = card.querySelector(".progress-circle")

    if (number) {
      const target = Number.parseInt(number.getAttribute("data-target"))
      this.animateCounter(number, target)
    }

    if (progressCircle) {
      const progress = progressCircle.getAttribute("data-progress")
      const circumference = 2 * Math.PI * 45
      const offset = circumference - (progress / 100) * circumference

      setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset
      }, 500)
    }
  }

  animateVisionCard(card) {
    const progressBar = card.querySelector(".progress-bar")
    if (progressBar) {
      const progress = progressBar.getAttribute("data-progress")
      setTimeout(() => {
        progressBar.style.width = `${progress}%`
      }, 300)
    }
  }

  animateCounter(element, target, duration = 2000) {
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const updateCounter = () => {
      if (current < target) {
        current += increment
        element.textContent = Math.floor(current).toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target.toLocaleString()
        // Effet de pulsation à la fin
        element.style.animation = "pulse 0.5s ease-in-out"
      }
    }

    updateCounter()
  }

  animateImpactSection() {
    // Animation en cascade des cartes
    this.impactCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate")
        this.animateStatCard(card)
      }, index * 200)
    })

    // Création des particules
    this.createImpactParticles()
  }

  createImpactParticles() {
    const impactSection = document.querySelector(".impact-section")
    if (!impactSection) return

    const particlesContainer = document.createElement("div")
    particlesContainer.className = "impact-particles-dynamic"
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
    `

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${Math.random() > 0.5 ? "#10b981" : "#f59e0b"};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        animation: floatUp ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        opacity: ${Math.random() * 0.7 + 0.3};
      `
      particlesContainer.appendChild(particle)
    }

    impactSection.appendChild(particlesContainer)

    // Ajouter l'animation CSS
    if (!document.getElementById("particle-animation")) {
      const style = document.createElement("style")
      style.id = "particle-animation"
      style.textContent = `
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
      `
      document.head.appendChild(style)
    }
  }

  handleResize() {
    // Méthode simplifiée sans gestion du curseur
    console.log("🔄 Window resized")
  }

  handleVisibilityChange() {
    if (document.hidden) {
      // Pause des animations coûteuses quand la page n'est pas visible
      document.body.style.animationPlayState = "paused"
    } else {
      // Reprendre les animations
      document.body.style.animationPlayState = "running"
    }
  }

  // Utilitaire de debounce
  debounce(func, wait) {
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

  // Méthodes publiques pour l'API
  showOrganigrammeExternal() {
    this.showOrganigramme()
  }

  redirectToCareerExternal() {
    this.redirectToCareer()
  }

  handleOrganigrammeClick(e) {
    e.preventDefault()

    // Animation du bouton
    const button = e.currentTarget
    button.style.transform = "scale(0.95)"

    setTimeout(() => {
      button.style.transform = "scale(1)"
    }, 150)

    // Effet de particules
    this.createButtonParticles(button)

    // Logique d'affichage de l'organigramme
    this.showOrganigramme()
  }

  handleRejoindreClick(e) {
    e.preventDefault()

    // Animation du bouton
    const button = e.currentTarget
    button.style.transform = "scale(0.95)"

    setTimeout(() => {
      button.style.transform = "scale(1)"
    }, 150)

    // Effet de particules
    this.createButtonParticles(button)

    // Redirection vers la page carrières
    this.redirectToCareer()
  }

  createButtonParticles(button) {
    const rect = button.getBoundingClientRect()

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #10b981;
        border-radius: 50%;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        pointer-events: none;
        z-index: 9999;
        animation: buttonParticleExplode 1s ease-out forwards;
      `

      const angle = (i / 10) * Math.PI * 2
      const velocity = 100
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity

      particle.style.setProperty("--vx", vx + "px")
      particle.style.setProperty("--vy", vy + "px")

      document.body.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 1000)
    }

    // Ajouter l'animation CSS
    if (!document.getElementById("button-particle-animation")) {
      const style = document.createElement("style")
      style.id = "button-particle-animation"
      style.textContent = `
        @keyframes buttonParticleExplode {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--vx), var(--vy)) scale(0); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  }

  showOrganigramme() {
    // Créer une modal moderne pour l'organigramme
    const modal = document.createElement("div")
    modal.className = "organigramme-modal"
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `

    const content = document.createElement("div")
    content.style.cssText = `
      background: white;
      border-radius: 20px;
      padding: 2rem;
      max-width: 90vw;
      max-height: 90vh;
      overflow: auto;
      position: relative;
      transform: scale(0.8);
      transition: transform 0.3s ease;
    `

    content.innerHTML = `
      <button class="close-modal" style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        transition: color 0.3s ease;
      ">&times;</button>
      <h2 style="margin-bottom: 1rem; color: #10b981;">Organigramme KYA-Energy Group</h2>
      <p style="color: #6b7280; margin-bottom: 2rem;">Structure organisationnelle de notre entreprise</p>
      <div style="text-align: center; padding: 2rem; background: #f9fafb; border-radius: 12px;">
        <p>Organigramme détaillé disponible prochainement...</p>
      </div>
    `

    modal.appendChild(content)
    document.body.appendChild(modal)

    // Animation d'ouverture
    setTimeout(() => {
      modal.style.opacity = "1"
      content.style.transform = "scale(1)"
    }, 10)

    // Fermeture de la modal
    const closeModal = () => {
      modal.style.opacity = "0"
      content.style.transform = "scale(0.8)"
      setTimeout(() => {
        modal.remove()
      }, 300)
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal()
    })

    content.querySelector(".close-modal").addEventListener("click", closeModal)

    console.log("📊 Organigramme modal opened")
  }

  redirectToCareer() {
    // Animation de transition
    const overlay = document.createElement("div")
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #10b981, #f59e0b);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.5s ease;
    `

    overlay.innerHTML = `
      <div style="text-align: center; color: white;">
        <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
        <h3>Redirection vers les opportunités de carrière...</h3>
      </div>
    `

    document.body.appendChild(overlay)

    setTimeout(() => {
      overlay.style.opacity = "1"
    }, 10)

    // Ajouter l'animation de rotation
    if (!document.getElementById("spin-animation")) {
      const style = document.createElement("style")
      style.id = "spin-animation"
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `
      document.head.appendChild(style)
    }

    setTimeout(() => {
      // Ici vous pouvez rediriger vers la vraie page carrières
      console.log("🚀 Redirecting to career page...")
      // window.location.href = 'carrieres.html';

      // Pour la démo, on ferme juste l'overlay
      overlay.style.opacity = "0"
      setTimeout(() => {
        overlay.remove()
      }, 500)
    }, 2000)
  }
}

// Initialisation automatique
document.addEventListener("DOMContentLoaded", () => {
  window.modernAboutPage = new ModernAboutPage()
})

// Export pour utilisation externe
window.AboutPageAPI = {
  showOrganigramme: () => window.modernAboutPage?.showOrganigrammeExternal(),
  redirectToCareer: () => window.modernAboutPage?.redirectToCareerExternal(),
}

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`)
    }, 0)
  })
}

// Service Worker registration (optionnel)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("🔧 SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("❌ SW registration failed: ", registrationError)
      })
  })
}

console.log("🎨 Modern About Page Script Loaded Successfully!")
