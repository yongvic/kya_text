// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      })
    })
  }

  // Smooth scrolling for anchor links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId.startsWith("#")) {
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

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll(".impact-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.floor(current).toLocaleString()
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target.toLocaleString()
        }
      }

      updateCounter()
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate")

        // Trigger counter animation for impact section
        if (entry.target.classList.contains("impact-grid")) {
          setTimeout(animateCounters, 500)
        }
      }
    })
  }, observerOptions)

  // Observe elements with AOS attributes
  const aosElements = document.querySelectorAll("[data-aos]")
  aosElements.forEach((element) => {
    observer.observe(element)
  })

  // Also observe impact section for counter animation
  const impactSection = document.querySelector(".impact-grid")
  if (impactSection) observer.observe(impactSection)

  // Particle animation for hero section
  function createParticles() {
    const particlesContainer = document.getElementById("particles")
    if (!particlesContainer) return

    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 8 + "s"
      particle.style.animationDuration = Math.random() * 3 + 5 + "s"
      particlesContainer.appendChild(particle)
    }
  }

  createParticles()

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".earth-container, .solar-panels")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      element.style.transform = `translate(-50%, -50%) translateY(${scrolled * speed}px)`
    })
  })

  // Loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
})

// Utility functions
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Handle scroll-based animations here if needed
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)
