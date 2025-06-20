// Script pour la page certification
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initialisation de la page certification...")

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

        // Animation spéciale pour les cartes de bénéfices
        if (entry.target.classList.contains("benefit-item")) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }

        // Animation pour les cartes de détails
        if (entry.target.classList.contains("detail-card")) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }

        // Animation pour le sceau qualité
        if (entry.target.classList.contains("quality-seal")) {
          entry.target.style.transform = "scale(1) rotate(0deg)"
          entry.target.style.opacity = "1"
        }
      }
    })
  }, observerOptions)

  // Observer les éléments avec animations
  const benefitItems = document.querySelectorAll(".benefit-item")
  benefitItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(item)
  })

  const detailCards = document.querySelectorAll(".detail-card")
  detailCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`
    observer.observe(card)
  })

  // Animation spéciale pour le sceau qualité
  const qualitySeal = document.querySelector(".quality-seal")
  if (qualitySeal) {
    qualitySeal.style.transform = "scale(0.8) rotate(-10deg)"
    qualitySeal.style.opacity = "0"
    qualitySeal.style.transition = "transform 0.8s ease, opacity 0.8s ease"
    observer.observe(qualitySeal)
  }

  // Animation du certificat au scroll
  const certificateFrame = document.querySelector(".certificate-frame")
  if (certificateFrame) {
    const certificateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animation de "scan" du certificat
            const scanLine = document.createElement("div")
            scanLine.style.cssText = `
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.3), transparent);
              transition: left 1.5s ease;
              pointer-events: none;
              z-index: 1;
            `
            certificateFrame.appendChild(scanLine)

            setTimeout(() => {
              scanLine.style.left = "100%"
            }, 500)

            setTimeout(() => {
              scanLine.remove()
            }, 2000)

            certificateObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    certificateObserver.observe(certificateFrame)
  }

  // Gestion du menu mobile
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")

      // Animation des barres du hamburger
      const spans = hamburger.querySelectorAll("span")
      spans.forEach((span, index) => {
        if (hamburger.classList.contains("active")) {
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
  const certificationBadges = document.querySelectorAll(".certification-badge, .certificate-badge")
  certificationBadges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(2deg)"
      this.style.boxShadow = "0 8px 25px rgba(249, 115, 22, 0.4)"
    })

    badge.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
      this.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    })
  })

  // Gestion des boutons CTA avec effet ripple
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Effet ripple
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
        top: ${y}px;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      `

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)

      // Actions spécifiques selon le bouton
      if (this.textContent.includes("Télécharger")) {
        console.log("Téléchargement du certificat...")
        // Ici vous pouvez ajouter la logique de téléchargement
      } else if (this.textContent.includes("Démarrer")) {
        console.log("Redirection vers formulaire de projet...")
        // Ici vous pouvez ajouter la logique de redirection
      }
    })
  })

  // Animation de typing pour les titres importants
  const typingElements = document.querySelectorAll(".announcement-title")
  typingElements.forEach((element) => {
    const text = element.innerHTML
    element.innerHTML = ""
    element.style.borderRight = "2px solid var(--primary-orange)"

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      } else {
        // Supprimer le curseur après l'animation
        setTimeout(() => {
          element.style.borderRight = "none"
        }, 1000)
      }
    }

    // Démarrer l'animation après un délai
    setTimeout(typeWriter, 1000)
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

    // Effet de transparence selon le scroll
    if (scrollTop > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
  })

  // Animation des icônes au hover
  const iconElements = document.querySelectorAll(".benefit-icon, .detail-icon, .cta-icon")
  iconElements.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)"
    })

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
    })
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
    
    .certificate-frame {
      position: relative;
      overflow: hidden;
    }
    
    .navbar {
      transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    }
    
    .benefit-icon, .detail-icon, .cta-icon {
      transition: transform 0.2s ease;
    }
    
    .quality-seal {
      transition: transform 0.8s ease, opacity 0.8s ease;
    }
    
    .certification-badge, .certificate-badge {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
  `
  document.head.appendChild(style)

  // Intersection Observer pour les animations d'entrée
  const fadeElements = document.querySelectorAll(
    ".hero-announcement, .hero-description, .certification-details, .qhse-text, .gratitude-content",
  )

  fadeElements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            fadeObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    fadeObserver.observe(element)
  })

  console.log("Page certification KYA Energy chargée avec succès!")
})
