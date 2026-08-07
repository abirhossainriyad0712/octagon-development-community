// ===============================
// OCTAGON DEVELOPMENT COMMUNITY
// Main Script
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("servicePopup");
    const closePopup = document.querySelector("#servicePopup .closePopup");
    const form = document.getElementById("serviceForm");

    const popupTitle = document.getElementById("popupTitle");
    const serviceType = document.getElementById("serviceType");
    const description = document.getElementById("projectDescription");

    // ===============================
    // SERVICE CARDS
    // ===============================

    const serviceCards = document.querySelectorAll(".serviceCard");

    serviceCards.forEach(function (card) {
        card.addEventListener("click", function () {
            if (popup) popup.style.display = "flex";

            const service = card.dataset.service;
            if (popupTitle) popupTitle.textContent = "Request " + service;
            if (serviceType) serviceType.value = service;

            if (description) {
                switch (service) {
                    case "3D Modeling":
                        description.placeholder = "Describe your 3D modeling project in detail...";
                        break;

                    case "Video Editing":
                        description.placeholder = "Describe your video editing requirements...";
                        break;

                    case "Photo Editing":
                        description.placeholder = "Describe your photo editing requirements...";
                        break;

                    case "Graphic Design":
                        description.placeholder = "Describe your graphic design requirements...";
                        break;

                    case "Custom Project":
                        description.placeholder = "Describe your custom project in detail...";
                        break;

                    default:
                        description.placeholder = "Describe your project in detail...";
                        break;
                }
            }
        });
    });

    // ===============================
    // FAQ ACCORDION
    // ===============================

    const faqItems = document.querySelectorAll(".faqItem");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faqQuestion");

        if (question) {
            question.addEventListener("click", () => {
                faqItems.forEach((faq) => {
                    if (faq !== item) {
                        faq.classList.remove("active");
                    }
                });

                item.classList.toggle("active");
            });
        }
    });

    // ===============================        
    // SCROLL ANIMATION
    // ===============================

    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.15
    });

    hiddenElements.forEach((element) => {
        observer.observe(element);
    });

    // ===============================
    // MOUSE GLOW
    // ===============================

    const glow = document.querySelector(".cursorGlow");
    if (glow) {
        window.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        });
    }

    // ===============================
    // CUSTOM CURSOR
    // ===============================

    const cursor = document.querySelector(".customCursor");

    if (cursor) {
        window.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        const hoverItems = document.querySelectorAll("a, button, .card, .faqQuestion");

        hoverItems.forEach(item => {
            item.addEventListener("mouseenter", () => {
                cursor.classList.add("hover");
            });

            item.addEventListener("mouseleave", () => {
                cursor.classList.remove("hover");
            });
        });
    }

    // ===============================
    // APPLY NOW BUTTON
    // ===============================

    const applyBtn = document.getElementById("applyNow");

    if (applyBtn) {
        applyBtn.addEventListener("click", function () {
            if (popup) popup.style.display = "flex";
            if (popupTitle) popupTitle.textContent = "Job Application";
            if (serviceType) serviceType.value = "Job Application";
            if (description) description.placeholder = "Describe your skills, experience and which category you want to apply for...";
        });
    }

    // ===============================
    // CLOSE BUTTONS
    // ===============================

    if (closePopup) {
        closePopup.addEventListener("click", function () {
            if (popup) popup.style.display = "none";
        });
    }

    // ===============================
    // CLICK OUTSIDE TO CLOSE
    // ===============================

    window.addEventListener("click", function (e) {
        if (popup && e.target === popup) {
            popup.style.display = "none";
        }
    });

    // ===============================
    // ESC KEY TO CLOSE
    // ===============================

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            if (popup) popup.style.display = "none";
            const teamPopup = document.getElementById("teamPopup");
            if (teamPopup) teamPopup.classList.remove("active");
        }
    });

    // ===============================
    // FORM SUBMIT (EMAILJS)
    // ===============================

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Honeypot Spam Protection
            const honeypot = document.getElementById("website");
            if (honeypot && honeypot.value.trim() !== "") {
                alert("Spam detected.");
                return;
            }

            const lastSubmit = localStorage.getItem("lastSubmit");

            if (lastSubmit) {
                const secondsPassed = (Date.now() - Number(lastSubmit)) / 1000;
                if (secondsPassed < 30) {
                    alert("Please wait " + Math.ceil(30 - secondsPassed) + " seconds before sending another request.");
                    return;
                }
            }

            if (typeof emailjs !== "undefined") {
                emailjs.send("service_v3ipj0h", "template_7jkn1pg", {
                    name: document.getElementById("clientName").value,
                    email: document.getElementById("clientEmail").value,
                    service: document.getElementById("serviceType").value,
                    message: document.getElementById("projectDescription").value
                })
                .then(function () {
                    alert("✅ Request sent successfully!");
                    if (popup) popup.style.display = "none";
                    form.reset();
                    if (popupTitle) popupTitle.textContent = "Request a Service";
                    if (description) description.placeholder = "Describe your project in detail...";
                    localStorage.setItem("lastSubmit", Date.now());
                })
                .catch(function (error) {
                    console.error(error);
                    alert("❌ Failed to send request.");
                });
            }
        });
    }

    // ===============================
    // SCROLL PROGRESS & BACK TO TOP
    // ===============================

    const progressBar = document.getElementById("progressBar");
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        if (progressBar && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + "%";
        }

        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // LOADER HIDE
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", function () {
            loader.classList.add("hide");
        });
    }

    // ===============================
    // TEAM POPUP LOGIC
    // ===============================

    const viewTeamBtn = document.getElementById("viewTeamBtn");
    const teamPopup = document.getElementById("teamPopup");
    const closeTeamPopup = document.getElementById("closeTeamPopup") || document.querySelector("#teamPopup .closePopup");

    if (viewTeamBtn && teamPopup) {
        viewTeamBtn.addEventListener("click", () => {
            teamPopup.classList.add("active");
            // Default select CEO category when opened
            renderTeamCategory("ceo");
        });
    }

    if (closeTeamPopup && teamPopup) {
        closeTeamPopup.addEventListener("click", () => {
            teamPopup.classList.remove("active");
        });
    }

    window.addEventListener("click", (e) => {
        if (teamPopup && e.target === teamPopup) {
            teamPopup.classList.remove("active");
        }
    });

    // ===============================
    // TEAM DATABASE & RENDER
    // ===============================

    const teamMembers = {
        ceo: [
            {
                name: "Abir Hussain",
                role: "CEO & Founder",
                country: "🇧🇩 (Bangladesh)",
                experience: "4+ Years",
                skills: ["Website Development", "Project Management", "Community Management"]
            }
        ],
        "3d": [
            {
                name: "David",
                role: "Lead 3D Modeler",
                country: "🇰🇪 (Kenya)",
                experience: "Experience Coming Soon",
                skills: ["Blender", "Roblox Assets", "Environment Design", "Low Poly Modeling"]
            }
        ],
        design: [
            {
                name: "Hiring",
                role: "Graphic Designer",
                country: "🌍 (Open Worldwide)",
                experience: "—",
                skills: ["Applications Open"]
            }
        ],
        video: [
            {
                name: "Hiring",
                role: "Video Editor",
                country: "🌍 (Open Worldwide)",
                experience: "—",
                skills: ["Applications Open"]
            }
        ],
        photo: [
            {
                name: "Hiring",
                role: "Photo Editor",
                country: "🌍 (Open Worldwide)",
                experience: "—",
                skills: ["Applications Open"]
            }
        ],
        web: [
            {
                name: "Abir Hussain",
                role: "Lead Web Developer",
                country: "🇧🇩 (Bangladesh)",
                experience: "4+ Years",
                skills: ["HTML", "CSS", "JavaScript", "Frontend Development"]
            }
        ]
    };

    const teamContent = document.getElementById("teamContent");

    function renderTeamCategory(category) {
        const workers = teamMembers[category];
        if (workers && teamContent) {
            let html = "";
            workers.forEach((worker, index) => {
                html += `
                <div class="workerCard">
                    <h3>${index + 1}. ${worker.name}</h3>
                    <h4>${worker.role}</h4>
                    <p><strong>🌍 Country:</strong> ${worker.country}</p>
                    <p><strong>⭐ Experience:</strong> ${worker.experience}</p>
                    <strong>Skills</strong>
                    <ul>
                        ${worker.skills.map(skill => `<li>${skill}</li>`).join("")}
                    </ul>
                </div>
                `;
            });
            teamContent.innerHTML = html;
        }
    }

    document.querySelectorAll(".teamCategory").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            renderTeamCategory(category);
        });
    });

});