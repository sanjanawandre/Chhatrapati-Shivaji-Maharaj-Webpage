// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", () => {
    // Declare AOS
    const AOS = window.AOS
  
    // Declare Fancybox
    const Fancybox = window.Fancybox
  
    // Declare translations
    const translations = {
      en: {
        "read-more": "Read More",
      },
      mr: {
        "read-more": "अधिक वाचा",
      },
    }
  
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease",
      once: true,
      offset: 100,
    })
  
    // Initialize Fancybox for gallery
    Fancybox.bind("[data-fancybox]", {
      // Custom options
    })
  
    // Mobile Navigation Toggle
    const navToggle = document.querySelector(".nav-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        document.body.classList.toggle("no-scroll")
      })
    }
  
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle")
  
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode")
  
        // Save preference to localStorage
        if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("theme", "dark")
        } else {
          localStorage.setItem("theme", "light")
        }
      })
    }
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode")
    }
  
    // Language Switcher
    const languageToggle = document.getElementById("language-toggle")
  
    if (languageToggle) {
      languageToggle.addEventListener("click", () => {
        const currentLang = document.body.getAttribute("data-lang")
        const newLang = currentLang === "en" ? "mr" : "en"
  
        document.body.setAttribute("data-lang", newLang)
        localStorage.setItem("language", newLang)
  
        // Update all translatable elements
        updateLanguage(newLang)
      })
    }
  
    // Check for saved language preference
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      document.body.setAttribute("data-lang", savedLanguage)
      updateLanguage(savedLanguage)
    }
  
    // Function to update language
    function updateLanguage(lang) {
      const elements = document.querySelectorAll("[data-lang-key]")
  
      elements.forEach((element) => {
        const key = element.getAttribute("data-lang-key")
        if (translations[lang] && translations[lang][key]) {
          element.textContent = translations[lang][key]
        }
      })
    }
  
    // Quotes Carousel
    const quoteSlides = document.querySelectorAll(".quote-slide")
    const prevQuote = document.querySelector(".prev-quote")
    const nextQuote = document.querySelector(".next-quote")
    let currentQuoteIndex = 0
  
    if (quoteSlides.length > 0 && prevQuote && nextQuote) {
      function showQuote(index) {
        quoteSlides.forEach((slide) => slide.classList.remove("active"))
        quoteSlides[index].classList.add("active")
      }
  
      prevQuote.addEventListener("click", () => {
        currentQuoteIndex = (currentQuoteIndex - 1 + quoteSlides.length) % quoteSlides.length
        showQuote(currentQuoteIndex)
      })
  
      nextQuote.addEventListener("click", () => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quoteSlides.length
        showQuote(currentQuoteIndex)
      })
  
      // Auto rotate quotes
      setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quoteSlides.length
        showQuote(currentQuoteIndex)
      }, 8000)
    }
  
    // Timeline Navigation
    const timelineYears = document.querySelectorAll(".timeline-year")
    const timelineContents = document.querySelectorAll(".timeline-content")
    const prevYear = document.querySelector(".prev-year")
    const nextYear = document.querySelector(".next-year")
    const timelineYearsContainer = document.querySelector(".timeline-years")
    let currentYearIndex = 0
  
    if (timelineYears.length > 0 && timelineContents.length > 0 && prevYear && nextYear) {
      function showTimelineContent(index) {
        timelineYears.forEach((year) => year.classList.remove("active"))
        timelineContents.forEach((content) => content.classList.remove("active"))
  
        timelineYears[index].classList.add("active")
        const yearValue = timelineYears[index].getAttribute("data-year")
  
        document.querySelector(`.timeline-content[data-year="${yearValue}"]`).classList.add("active")
      }
  
      timelineYears.forEach((year, index) => {
        year.addEventListener("click", () => {
          currentYearIndex = index
          showTimelineContent(currentYearIndex)
        })
      })
  
      prevYear.addEventListener("click", () => {
        currentYearIndex = (currentYearIndex - 1 + timelineYears.length) % timelineYears.length
        showTimelineContent(currentYearIndex)
  
        // Scroll timeline years
        if (timelineYearsContainer) {
          const yearWidth = timelineYears[0].offsetWidth + 20 // width + margin
          timelineYearsContainer.style.transform = `translateX(-${currentYearIndex * yearWidth}px)`
        }
      })
  
      nextYear.addEventListener("click", () => {
        currentYearIndex = (currentYearIndex + 1) % timelineYears.length
        showTimelineContent(currentYearIndex)
  
        // Scroll timeline years
        if (timelineYearsContainer) {
          const yearWidth = timelineYears[0].offsetWidth + 20 // width + margin
          timelineYearsContainer.style.transform = `translateX(-${currentYearIndex * yearWidth}px)`
        }
      })
  
      // Show first timeline content by default
      showTimelineContent(0)
    }
  
    // Gallery Filter
    const filterButtons = document.querySelectorAll(".filter-btn")
    const galleryItems = document.querySelectorAll(".gallery-item")
  
    if (filterButtons.length > 0 && galleryItems.length > 0) {
      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          this.classList.add("active")
  
          const filter = this.getAttribute("data-filter")
  
          // Filter gallery items
          galleryItems.forEach((item) => {
            if (filter === "all" || item.classList.contains(filter)) {
              item.classList.remove("hide")
            } else {
              item.classList.add("hide")
            }
          })
        })
      })
    }
  
    // Interactive Map
    const mapContainer = document.getElementById("shivaji-map")
    const mapButtons = document.querySelectorAll(".map-btn")
    const mapInfoTitle = document.getElementById("map-info-title")
    const mapInfoContent = document.getElementById("map-info-content")
  
    if (mapContainer && mapButtons.length > 0) {
      // Map data
      const mapData = {
        territories: [
          {
            id: "konkan",
            name: "Konkan",
            description:
              "The coastal region that formed the core of Shivaji's early kingdom. It included important ports and naval bases.",
          },
          {
            id: "desh",
            name: "Desh (Western Maharashtra)",
            description:
              "The inland region east of the Western Ghats, which included important cities like Pune and numerous strategic forts.",
          },
          {
            id: "karnataka",
            name: "Northern Karnataka",
            description: "The southern expansion of Shivaji's kingdom, which he conquered in his southern campaigns.",
          },
        ],
        forts: [
          {
            id: "raigad",
            name: "Raigad Fort",
            description:
              "The capital of Shivaji's kingdom and the site of his coronation in 1674. It served as the main political center of the Maratha Empire.",
          },
          {
            id: "pratapgad",
            name: "Pratapgad Fort",
            description:
              "The site of the famous encounter between Shivaji and Afzal Khan in 1659. This victory established Shivaji as a formidable power in the region.",
          },
          {
            id: "sindhudurg",
            name: "Sindhudurg Fort",
            description:
              "A sea fort built by Shivaji in 1664-1667 to protect his kingdom from naval attacks. It demonstrates his foresight in establishing naval defenses.",
          },
          {
            id: "sinhagad",
            name: "Sinhagad Fort",
            description:
              "Originally called Kondana, this fort was captured by Shivaji's forces in 1670 through a daring night attack led by Tanaji Malusare.",
          },
          {
            id: "panhala",
            name: "Panhala Fort",
            description:
              "One of the largest forts in the Deccan, where Shivaji was besieged by Siddi Jauhar. His escape from this siege led to the Battle of Pavan Khind.",
          },
        ],
        battles: [
          {
            id: "pratapgad-battle",
            name: "Battle of Pratapgad (1659)",
            description:
              "Shivaji defeated Afzal Khan, a general of the Bijapur Sultanate, using guerrilla tactics in the dense forests near Pratapgad.",
          },
          {
            id: "pavan-khind",
            name: "Battle of Pavan Khind (1660)",
            description:
              "Baji Prabhu Deshpande, Shivaji's commander, held off the Adilshahi forces at a narrow pass, allowing Shivaji to reach safety at Vishalgad.",
          },
          {
            id: "surat-raid",
            name: "Sack of Surat (1664)",
            description:
              "Shivaji attacked and plundered Surat, the major Mughal port city, demonstrating his power against the Mughal Empire.",
          },
          {
            id: "sinhagad-battle",
            name: "Battle of Sinhagad (1670)",
            description:
              "Tanaji Malusare led a night attack to recapture the fort of Sinhagad from the Mughals, sacrificing his life in the process.",
          },
        ],
      }
  
      // Create SVG map
      function createMap(type) {
        // Clear previous map
        mapContainer.innerHTML = ""
  
        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("viewBox", "0 0 800 600")
        svg.setAttribute("width", "100%")
        svg.setAttribute("height", "100%")
  
        // Add map elements based on type
        let data = []
        let fillColor = ""
  
        switch (type) {
          case "territory":
            data = mapData.territories
            fillColor = "#0a2463"
            break
          case "forts":
            data = mapData.forts
            fillColor = "#7e1f1f"
            break
          case "battles":
            data = mapData.battles
            fillColor = "#d4af37"
            break
          default:
            data = mapData.territories
            fillColor = "#0a2463"
        }
  
        // Create simplified shapes for demonstration
        // In a real implementation, you would use actual geographical coordinates
        data.forEach((item, index) => {
          let element
  
          if (type === "territory") {
            // Create polygon for territories
            element = document.createElementNS("http://www.w3.org/2000/svg", "path")
  
            // Simple shapes to represent territories
            const paths = [
              "M100,200 L300,150 L250,300 L150,350 Z", // Konkan
              "M320,150 L500,100 L550,250 L350,300 Z", // Desh
              "M300,320 L450,300 L500,450 L250,400 Z", // Karnataka
            ]
  
            element.setAttribute("d", paths[index])
            element.setAttribute("class", "map-region")
          } else if (type === "forts") {
            // Create circles for forts
            element = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  
            // Positions for forts
            const positions = [
              { cx: 200, cy: 250 }, // Raigad
              { cx: 350, cy: 200 }, // Pratapgad
              { cx: 150, cy: 350 }, // Sindhudurg
              { cx: 400, cy: 300 }, // Sinhagad
              { cx: 300, cy: 400 }, // Panhala
            ]
  
            element.setAttribute("cx", positions[index].cx)
            element.setAttribute("cy", positions[index].cy)
            element.setAttribute("r", 15)
            element.setAttribute("class", "map-fort")
          } else if (type === "battles") {
            // Create stars for battles
            element = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
  
            // Positions for battles
            const positions = [
              { x: 350, y: 200 }, // Pratapgad Battle
              { x: 250, y: 350 }, // Pavan Khind
              { x: 150, y: 150 }, // Surat Raid
              { x: 400, y: 300 }, // Sinhagad Battle
            ]
  
            // Create a star shape
            const x = positions[index].x
            const y = positions[index].y
            const points = `${x},${y - 20} ${x + 7},${y - 7} ${x + 20},${y - 5} ${x + 10},${y + 5} ${x + 12},${y + 20} ${x},${y + 12} ${x - 12},${y + 20} ${x - 10},${y + 5} ${x - 20},${y - 5} ${x - 7},${y - 7}`
  
            element.setAttribute("points", points)
            element.setAttribute("class", "map-battle")
          }
  
          element.setAttribute("fill", fillColor)
          element.setAttribute("stroke", "#fff")
          element.setAttribute("stroke-width", "2")
          element.setAttribute("data-id", item.id)
  
          // Add event listener
          element.addEventListener("click", () => {
            // Update info panel
            mapInfoTitle.textContent = item.name
            mapInfoContent.innerHTML = `<p>${item.description}</p>`
          })
  
          svg.appendChild(element)
        })
  
        mapContainer.appendChild(svg)
      }
  
      // Initialize map with territories
      createMap("territory")
  
      // Add event listeners to map buttons
      mapButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons
          mapButtons.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          this.classList.add("active")
  
          // Create map based on button data
          createMap(this.getAttribute("data-map"))
        })
      })
    }
  
    // Battle Card Read More
    const readMoreButtons = document.querySelectorAll(".read-more-btn")
  
    if (readMoreButtons.length > 0) {
      readMoreButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const details = this.previousElementSibling
          details.classList.toggle("expanded")
  
          // Update button text
          if (details.classList.contains("expanded")) {
            const lang = document.body.getAttribute("data-lang") || "en"
            this.textContent = lang === "en" ? "Read Less" : "कमी वाचा"
          } else {
            const lang = document.body.getAttribute("data-lang") || "en"
            this.textContent = translations[lang]["read-more"] || "Read More"
          }
        })
      })
    }
  
    // Quiz Functionality
    const startQuizBtn = document.getElementById("start-quiz")
    const quizQuestions = document.getElementById("quiz-questions")
    const quizResults = document.getElementById("quiz-results")
    const quizIntro = document.querySelector(".quiz-intro")
    const restartQuizBtn = document.getElementById("restart-quiz")
    const scoreElement = document.getElementById("score")
    const totalQuestionsElement = document.getElementById("total-questions")
    const scoreMessage = document.getElementById("score-message")
  
    // Quiz questions
    const questions = [
      {
        question: "In which year was Chhatrapati Shivaji Maharaj born?",
        options: ["1627", "1630", "1640", "1645"],
        answer: 1,
      },
      {
        question: "Where was Shivaji Maharaj born?",
        options: ["Raigad Fort", "Pratapgad Fort", "Shivneri Fort", "Sinhagad Fort"],
        answer: 2,
      },
      {
        question: "Who was Shivaji Maharaj's mother?",
        options: ["Tarabai", "Soyarabai", "Putalabai", "Jijabai"],
        answer: 3,
      },
      {
        question: "In which year was Shivaji Maharaj crowned as Chhatrapati?",
        options: ["1670", "1672", "1674", "1680"],
        answer: 2,
      },
      {
        question: "Which Mughal emperor invited Shivaji to Agra?",
        options: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
        answer: 3,
      },
      {
        question: "What was the name of Shivaji's council of ministers?",
        options: ["Rajya Sabha", "Ashta Pradhan", "Panchayat", "Diwan-e-Khas"],
        answer: 1,
      },
      {
        question: "Which fort did Shivaji capture at the age of 16?",
        options: ["Torna Fort", "Raigad Fort", "Pratapgad Fort", "Sinhagad Fort"],
        answer: 0,
      },
      {
        question: "What was the name of the weapon Shivaji used to kill Afzal Khan?",
        options: ["Bhavani Sword", "Wagh Nakh (Tiger Claws)", "Dagger", "Spear"],
        answer: 1,
      },
      {
        question: "Which naval fort was built by Shivaji Maharaj?",
        options: ["Raigad", "Pratapgad", "Sindhudurg", "Panhala"],
        answer: 2,
      },
      {
        question: "What was the tax called that Shivaji collected from neighboring territories?",
        options: ["Lagaan", "Chauth", "Jaziya", "Sardeshmukhi"],
        answer: 1,
      },
    ]
  
    if (startQuizBtn && quizQuestions && quizResults && quizIntro && restartQuizBtn) {
      let currentQuestionIndex = 0
      let score = 0
  
      function showQuestion(index) {
        quizQuestions.innerHTML = ""
  
        const questionDiv = document.createElement("div")
        questionDiv.className = "question"
  
        questionDiv.innerHTML = `
                  <h3>Question ${index + 1} of ${questions.length}</h3>
                  <p>${questions[index].question}</p>
                  <ul class="options">
                      ${questions[index].options
                        .map(
                          (option, i) => `
                          <li class="option" data-index="${i}">${option}</li>
                      `,
                        )
                        .join("")}
                  </ul>
                  <div class="quiz-controls">
                      <button class="cta-button next-question" disabled>Next Question</button>
                  </div>
              `
  
        quizQuestions.appendChild(questionDiv)
  
        // Add event listeners to options
        const options = questionDiv.querySelectorAll(".option")
        const nextButton = questionDiv.querySelector(".next-question")
  
        options.forEach((option) => {
          option.addEventListener("click", function () {
            // Remove selected class from all options
            options.forEach((opt) => opt.classList.remove("selected"))
  
            // Add selected class to clicked option
            this.classList.add("selected")
  
            // Enable next button
            nextButton.disabled = false
          })
        })
  
        nextButton.addEventListener("click", () => {
          const selectedOption = questionDiv.querySelector(".option.selected")
  
          if (selectedOption) {
            const selectedIndex = Number.parseInt(selectedOption.getAttribute("data-index"))
  
            // Check if answer is correct
            if (selectedIndex === questions[currentQuestionIndex].answer) {
              score++
              selectedOption.classList.add("correct")
            } else {
              selectedOption.classList.add("incorrect")
              options[questions[currentQuestionIndex].answer].classList.add("correct")
            }
  
            // Disable all options
            options.forEach((opt) => (opt.style.pointerEvents = "none"))
  
            // Change button text
            nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "See Results" : "Next Question"
  
            // Add delay before moving to next question
            setTimeout(() => {
              if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++
                showQuestion(currentQuestionIndex)
              } else {
                showResults()
              }
            }, 1500)
          }
        })
      }
  
      function showResults() {
        quizQuestions.classList.add("hidden")
        quizResults.classList.remove("hidden")
  
        scoreElement.textContent = score
        totalQuestionsElement.textContent = questions.length
  
        // Set score message
        if (score === questions.length) {
          scoreMessage.textContent = "Perfect! You're a Shivaji Maharaj expert!"
        } else if (score >= questions.length * 0.7) {
          scoreMessage.textContent = "Great job! You know a lot about Shivaji Maharaj!"
        } else if (score >= questions.length * 0.5) {
          scoreMessage.textContent = "Good effort! You have a decent knowledge about Shivaji Maharaj."
        } else {
          scoreMessage.textContent = "Keep learning! There's more to discover about Shivaji Maharaj."
        }
      }
  
      startQuizBtn.addEventListener("click", () => {
        quizIntro.classList.add("hidden")
        quizQuestions.classList.remove("hidden")
        currentQuestionIndex = 0
        score = 0
        showQuestion(currentQuestionIndex)
      })
  
      restartQuizBtn.addEventListener("click", () => {
        quizResults.classList.add("hidden")
        currentQuestionIndex = 0
        score = 0
        showQuestion(currentQuestionIndex)
        quizQuestions.classList.remove("hidden")
      })
    }
  
    // Audio Players for Children's Stories
    const audioPlayers = document.querySelectorAll("audio")
  
    if (audioPlayers.length > 0) {
      // Add event listeners to pause other audio when one starts playing
      audioPlayers.forEach((player) => {
        player.addEventListener("play", () => {
          audioPlayers.forEach((otherPlayer) => {
            if (otherPlayer !== player && !otherPlayer.paused) {
              otherPlayer.pause()
            }
          })
        })
      })
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
  
          // Close mobile menu if open
          if (navLinks && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active")
            document.body.classList.remove("no-scroll")
          }
        }
      })
    })
  
    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const heroSection = document.querySelector(".hero-section")
      if (heroSection) {
        const scrollPosition = window.pageYOffset
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + "px"
      }
    })
  
    // Accessibility improvements
    // Add focus trap for mobile menu
    if (navToggle && navLinks) {
      const focusableElements = navLinks.querySelectorAll("a, button")
      const firstFocusableElement = focusableElements[0]
      const lastFocusableElement = focusableElements[focusableElements.length - 1]
  
      navLinks.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstFocusableElement) {
            e.preventDefault()
            lastFocusableElement.focus()
          } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
            e.preventDefault()
            firstFocusableElement.focus()
          }
        }
      })
    }
  
    // Add ARIA attributes dynamically
    const galleryItems_aria = document.querySelectorAll(".gallery-item")
    galleryItems_aria.forEach((item) => {
      const caption = item.querySelector(".gallery-caption")
      if (caption) {
        item.setAttribute("aria-label", caption.textContent)
      }
    })
  
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll(
      ".battle-card, .gallery-item, .map-region, .map-fort, .map-battle",
    )
    interactiveElements.forEach((element) => {
      element.setAttribute("tabindex", "0")
      element.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          element.click()
        }
      })
    })
  })
  