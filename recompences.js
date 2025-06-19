// Script pour la page des récompenses
document.addEventListener("DOMContentLoaded", () => {
  // Configuration des animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  // Observer pour les animations au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")

        // Animation spéciale pour les cartes de prix
        if (entry.target.classList.contains("award-card")) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }

        // Animation pour les statistiques
        if (entry.target.classList.contains("stat-card")) {
          animateStatNumber(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observer toutes les cartes de prix
  const awardCards = document.querySelectorAll(".award-card")
  awardCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Observer les cartes de statistiques
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  // Observer les éléments de catégories
  const categoryItems = document.querySelectorAll(".category-item")
  categoryItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`
    observer.observe(item)
  })

  // Animation des compteurs de statistiques
  function animateStatNumber(statCard) {
    const statNumber = statCard.querySelector(".stat-number")
    if (!statNumber) return

    const target = Number.parseInt(statNumber.getAttribute("data-target"))
    const duration = 2000 // 2 secondes
    const increment = target / (duration / 16) // 60 FPS
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        statNumber.textContent = target
        clearInterval(timer)
      } else {
        statNumber.textContent = Math.floor(current)
      }
    }, 16)

    // Marquer comme animé pour éviter la répétition
    statCard.classList.add("animated")
  }

  // Animation des statistiques du hero
  const animateHeroStats = () => {
    const heroStatNumbers = document.querySelectorAll(".hero-stats .stat-number")
    heroStatNumbers.forEach((stat) => {
      const finalValue = stat.textContent
      const numericValue = Number.parseInt(finalValue.replace(/\D/g, ""))
      const suffix = finalValue.replace(/\d/g, "")

      if (numericValue) {
        let currentValue = 0
        const increment = numericValue / 60
        const timer = setInterval(() => {
          currentValue += increment
          if (currentValue >= numericValue) {
            stat.textContent = finalValue
            clearInterval(timer)
          } else {
            stat.textContent = Math.floor(currentValue) + suffix
          }
        }, 25)
      }
    })
  }

  // Observer le hero pour déclencher l'animation des stats
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(animateHeroStats, 1000)
            heroObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    heroObserver.observe(heroContent)
  }

  // Gestion du menu mobile
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Smooth scroll pour les liens internes
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Effet parallax léger sur le hero
  let ticking = false
  function updateParallax() {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-bg-image")
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`
    }
    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  })

  // Animation des badges au hover
  const awardCategories = document.querySelectorAll(".award-category")
  awardCategories.forEach((category) => {
    category.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
      this.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)"
    })

    category.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "none"
    })
  })

  // Effet de survol sur les cartes de prix
  awardCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Ajouter un effet de brillance
      const shimmer = document.createElement("div")
      shimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
        pointer-events: none;
        z-index: 1;
      `
      this.appendChild(shimmer)

      setTimeout(() => {
        shimmer.style.left = "100%"
      }, 50)

      setTimeout(() => {
        shimmer.remove()
      }, 600)
    })
  })

  // Gestion des boutons CTA avec effet ripple
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;255,255,0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      `

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Animation staggerée pour les éléments de liste dans les catégories
  const categoryLists = document.querySelectorAll(".category-awards")
  categoryLists.forEach((list) => {
    const items = list.querySelectorAll("li")
    items.forEach((item, index) => {
      item.style.opacity = "0"
      item.style.transform = "translateX(-20px)"
      item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`
    })

    // Observer pour animer les listes
    const listObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const listItems = entry.target.querySelectorAll("li")
            listItems.forEach((item) => {
              item.style.opacity = "1"
              item.style.transform = "translateX(0)"
            })
            listObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    listObserver.observe(list)
  })

  // Effet de typing pour le titre du hero
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.innerHTML
    heroTitle.innerHTML = ""

    setTimeout(() => {
      let i = 0
      const typeWriter = () => {
        if (i < originalText.length) {
          heroTitle.innerHTML = originalText.slice(0, i + 1)
          i++
          setTimeout(typeWriter, 50)
        }
      }
      typeWriter()
    }, 500)
  }

  // Animation de pulsation pour les icônes importantes
  const importantIcons = document.querySelectorAll(".cta-icon, .stat-icon")
  importantIcons.forEach((icon) => {
    setInterval(() => {
      icon.style.transform = "scale(1.05)"
      setTimeout(() => {
        icon.style.transform = "scale(1)"
      }, 200)
    }, 3000)
  })

  // Gestion du scroll pour la navbar
  let lastScrollTop = 0
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll vers le bas
      navbar.style.transform = "translateY(-100%)"
    } else {
      // Scroll vers le haut
      navbar.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
  })

  // Ajout des styles CSS pour les animations
  const style = document.createElement("style")
  style.textContent = `
    .btn-primary, .btn-secondary {
      position: relative;
      overflow: hidden;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .award-card {
      position: relative;
      overflow: hidden;
    }
    
    .navbar {
      transition: transform 0.3s ease;
    }
    
    .hero-title {
      min-height: 1.2em;
    }
    
    .stat-icon, .cta-icon {
      transition: transform 0.2s ease;
    }
    
    .category-awards li {
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
  `
  document.head.appendChild(style)

  console.log("Page des récompenses KYA Energy chargée avec succès!")
})

// Animation des statistiques
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"))
        const duration = 2000
        const increment = target / (duration / 16)
        let current = 0

        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            entry.target.textContent = target + (target === 100 ? "%" : "+")
            clearInterval(timer)
          } else {
            entry.target.textContent = Math.floor(current) + (target === 100 ? "%" : "+")
          }
        }, 16)

        observer.unobserve(entry.target)
      }
    })
  })

  statNumbers.forEach((stat) => observer.observe(stat))
}

// Navigation mobile
function initMobileNav() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }
}

// Smooth scroll pour les liens
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Effet parallax sur le hero
function initParallax() {
  const hero = document.querySelector(".hero-section")
  const heroImage = document.querySelector(".hero-bg-image")

  if (hero && heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroImage.style.transform = `translateY(${rate}px)`
    })
  }
}

// Animation des cartes au scroll
function initScrollAnimations() {
  const cards = document.querySelectorAll(".award-card, .stat-card, .category-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })
}

// Effet de brillance sur les cartes
function initShineEffect() {
  const cards = document.querySelectorAll(".award-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.background = "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.background = "white"
    })
  })
}

// Navigation sticky
function initStickyNav() {
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  animateStats()
  initMobileNav()
  initSmoothScroll()
  initParallax()
  initScrollAnimations()
  initShineEffect()
  initStickyNav()

  // Délai pour les animations d'entrée
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)
})

// Gestion du redimensionnement
window.addEventListener("resize", () => {
  // Réinitialiser certains effets si nécessaire
})

// Préchargement des images
function preloadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Effet de typing pour les titres
function initTypingEffect() {
  const titles = document.querySelectorAll(".typing-effect")

  titles.forEach((title) => {
    const text = title.textContent
    title.textContent = ""

    let i = 0
    const timer = setInterval(() => {
      title.textContent += text.charAt(i)
      i++
      if (i > text.length) {
        clearInterval(timer)
      }
    }, 100)
  })
}
