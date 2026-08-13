// ===============================
// OCTAGON DEVELOPMENT COMMUNITY
// Main Script (Includes Firebase & Reviews)
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, doc, updateDoc, serverTimestamp, query, orderBy, limit 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ===============================
// FIREBASE CONFIGURATION
// ===============================
const firebaseConfig = {
    apiKey: "AIzaSyCCNbhdNlKhi3HVt4nwvOKuhIV5afCw4tQ",
    authDomain: "octagon-development-community.firebaseapp.com",
    projectId: "octagon-development-community",
    storageBucket: "octagon-development-community.firebasestorage.app",
    messagingSenderId: "861729221423",
    appId: "1:861729221423:web:987c3588ccee59282e4fda",
    measurementId: "G-HN29FG1RSZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("servicePopup");
    const closePopup = document.querySelector("#servicePopup .closePopup");
    const form = document.getElementById("serviceForm");

    const popupTitle = document.getElementById("popupTitle");
    const serviceType = document.getElementById("serviceType");
    const description = document.getElementById("projectDescription");
    const teamPopup = document.getElementById("teamPopup");
    const rateBox = document.getElementById("rateBox");
    const ratingsBox = document.getElementById("ratingsBox");

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
    }, { threshold: 0.15 });

    hiddenElements.forEach((element) => observer.observe(element));

    // ===============================
    // MOUSE GLOW & CUSTOM CURSOR
    // ===============================
    const glow = document.querySelector(".cursorGlow");
    if (glow) {
        window.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        });
    }

    const cursor = document.querySelector(".customCursor");
    if (cursor) {
        window.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        const hoverItems = document.querySelectorAll("a, button, .card, .faqQuestion");
        hoverItems.forEach(item => {
            item.addEventListener("mouseenter", () => cursor.classList.add("hover"));
            item.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
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
    // CLOSE & MODAL OVERLAY HANDLERS
    // ===============================
    if (closePopup) {
        closePopup.addEventListener("click", () => {
            if (popup) popup.style.display = "none";
        });
    }

    const closeRateBox = document.getElementById("closeRateBox");
    const closeRatingsBox = document.getElementById("closeRatingsBox");

    if (closeRateBox && rateBox) {
        closeRateBox.addEventListener("click", () => rateBox.classList.remove("active"));
    }

    if (closeRatingsBox && ratingsBox) {
        closeRatingsBox.addEventListener("click", () => ratingsBox.classList.remove("active"));
    }

    window.addEventListener("click", function (e) {
        if (popup && e.target === popup) popup.style.display = "none";
        if (teamPopup && e.target === teamPopup) teamPopup.classList.remove("active");
    });

    // Unified ESC Key Event Listener
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            if (popup) popup.style.display = "none";
            if (teamPopup) teamPopup.classList.remove("active");
            if (rateBox) rateBox.classList.remove("active");
            if (ratingsBox) ratingsBox.classList.remove("active");
        }
    });

    // ===============================
    // FORM SUBMIT (EMAILJS)
    // ===============================
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

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
            scrollTopBtn.classList.toggle("show", scrollTop > 300);
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ===============================
    // LOADER HIDE
    // ===============================
    const loader = document.getElementById("loader");
    if (loader) {
        if (document.readyState === "complete") {
            loader.classList.add("hide");
        } else {
            window.addEventListener("load", function () {
                loader.classList.add("hide");
            });
        }
    }

    // ===============================
    // TEAM POPUP & DATABASE LOGIC
    // ===============================
    const viewTeamBtn = document.getElementById("viewTeamBtn");
    const closeTeamPopup = document.getElementById("closeTeamPopup") || document.querySelector("#teamPopup .closePopup");

    if (viewTeamBtn && teamPopup) {
        viewTeamBtn.addEventListener("click", () => {
            teamPopup.classList.add("active");
            renderTeamCategory("ceo");
        });
    }

    if (closeTeamPopup && teamPopup) {
        closeTeamPopup.addEventListener("click", () => teamPopup.classList.remove("active"));
    }

    const teamMembers = {
        ceo: [
            {
                name: "Abir Hussain",
                role: "CEO & Founder",
                country: "🇧🇩 (Bangladesh)",
                experience: "Beginner in Web Development and basic to intermediate skilled in photo editing and graphic designing",
                skills: ["Website Development", "Project Management", "Community Management", "Photo Editing", "Graphic Design", "Roblox Game Development"]
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
                name: "Abir Hussain",
                role: "Graphic Designer",
                country: "🇧🇩 (Bangladesh)",
                experience: "3+ Years.",
                skills: ["Basic to Intermediate graphics designer with 3+ years of experience in creating visually appealing designs of banners,posters,billboards etc."]
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
                name: "Abir Hussain",
                role: "Photo Editor",
                country: "🇧🇩 (Bangladesh)",
                experience: "3+ Years",
                skills: ["Basic to Intermediate photo editor with 3+ years of experience in editing photos for social media, websites, and other digital platforms."]
            }
        ],
        web: [
            {
                name: "Abir Hussain",
                role: "Lead Web Developer",
                country: "🇧🇩 (Bangladesh)",
                experience: "Beginner to Intermediate",
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
            renderTeamCategory(button.dataset.category);
        });
    });

    // ===============================
    // FIREBASE REVIEWS & RATINGS LOGIC
    // ===============================
    const openRateBtn = document.getElementById("openRateBtn");
    const openRatingsBtn = document.getElementById("openRatingsBtn");
    const starButtons = document.querySelectorAll(".star-rating button");
    const nameInput = document.getElementById("reviewName");
    const reviewInput = document.getElementById("reviewText");
    const submitButton = document.getElementById("submitReview");
    const message = document.getElementById("reviewMessage");
    const reviewsList = document.getElementById("reviewsList");
    const averageRating = document.getElementById("averageRating");
    const averageStars = document.getElementById("averageStars");
    const reviewCount = document.getElementById("reviewCount");

    let selectedRating = 0;

    function updateStarUI(rating) {
        selectedRating = rating;
        starButtons.forEach(star => {
            const r = Number(star.dataset.rating);
            star.classList.toggle("selected", r <= selectedRating);
        });
    }

    function checkRatingStatus() {
        const userReviewData = localStorage.getItem("userReview");
        if (userReviewData && openRateBtn) {
            const parsedData = JSON.parse(userReviewData);
            openRateBtn.textContent = "✏️ Change Review";
            if (nameInput) nameInput.value = parsedData.name || "";
            if (reviewInput) reviewInput.value = parsedData.review || "";
            if (parsedData.rating) updateStarUI(Number(parsedData.rating));
            if (submitButton) submitButton.textContent = "Update Review";
        } else if (openRateBtn) {
            openRateBtn.textContent = "⭐ Rate Us";
            if (submitButton) submitButton.textContent = "Submit Review";
        }
    }

    checkRatingStatus();

    if (openRateBtn) {
        openRateBtn.addEventListener("click", () => {
            if (rateBox) rateBox.classList.toggle("active");
            if (ratingsBox) ratingsBox.classList.remove("active");
        });
    }

    if (openRatingsBtn) {
        openRatingsBtn.addEventListener("click", async () => {
            if (ratingsBox) ratingsBox.classList.toggle("active");
            if (rateBox) rateBox.classList.remove("active");
            if (ratingsBox && ratingsBox.classList.contains("active")) {
                await loadReviews();
            }
        });
    }

    starButtons.forEach(button => {
        button.addEventListener("click", () => {
            updateStarUI(Number(button.dataset.rating));
        });
    });

    function createStars(rating) {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? "★" : "☆";
        }
        return stars;
    }

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    async function loadReviews() {
        if (!reviewsList) return;

        try {
            reviewsList.innerHTML = `<p class="loading-reviews">Loading ratings...</p>`;
            
            const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(50));
            const snapshot = await getDocs(q);
            const reviews = [];

            snapshot.forEach(doc => {
                reviews.push({ id: doc.id, ...doc.data() });
            });

            reviewsList.innerHTML = "";

            if (reviews.length === 0) {
                reviewsList.innerHTML = `<p class="loading-reviews">No ratings yet. Be the first one!</p>`;
                if (averageRating) averageRating.textContent = "0.0";
                if (averageStars) averageStars.textContent = "☆☆☆☆☆";
                if (reviewCount) reviewCount.textContent = "0 reviews";
                return;
            }

            let totalRating = 0;
            reviews.forEach(review => {
                totalRating += Number(review.rating);
                const card = document.createElement("div");
                card.className = "review-card";
                card.innerHTML = `
                    <div class="review-card-name">${escapeHTML(review.name)}</div>
                    <div class="review-card-stars">${createStars(Number(review.rating))}</div>
                    <div class="review-card-text">${escapeHTML(review.review)}</div>
                `;
                reviewsList.appendChild(card);
            });

            const average = totalRating / reviews.length;
            if (averageRating) averageRating.textContent = average.toFixed(1);
            if (averageStars) averageStars.textContent = createStars(Math.round(average));
            if (reviewCount) reviewCount.textContent = `${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`;

        } catch (error) {
            console.error("Error loading reviews:", error);
            reviewsList.innerHTML = `<p class="loading-reviews">Unable to load reviews right now.</p>`;
        }
    }

    if (submitButton) {
        submitButton.addEventListener("click", async () => {
            const name = nameInput ? nameInput.value.trim() : "";
            const review = reviewInput ? reviewInput.value.trim() : "";

            if (!name || !selectedRating || !review) {
                if (message) {
                    message.textContent = "Please fill in all fields and select a rating.";
                    message.style.color = "#ff5c5c";
                }
                return;
            }

            const existingReview = localStorage.getItem("userReview");
            const parsedReview = existingReview ? JSON.parse(existingReview) : null;

            try {
                submitButton.disabled = true;
                submitButton.textContent = parsedReview ? "Updating..." : "Submitting...";
                if (message) message.textContent = "";

                let docId = parsedReview ? parsedReview.id : null;

                if (docId) {
                    const reviewRef = doc(db, "reviews", docId);
                    await updateDoc(reviewRef, {
                        name: name,
                        rating: selectedRating,
                        review: review,
                        updatedAt: serverTimestamp()
                    });
                } else {
                    const docRef = await addDoc(collection(db, "reviews"), {
                        name: name,
                        rating: selectedRating,
                        review: review,
                        createdAt: serverTimestamp()
                    });
                    docId = docRef.id;
                }

                localStorage.setItem("userReview", JSON.stringify({
                    id: docId,
                    name: name,
                    rating: selectedRating,
                    review: review
                }));

                if (message) {
                    message.textContent = parsedReview ? "Review updated successfully! ⭐" : "Review submitted successfully! ⭐";
                    message.style.color = "#00ff99";
                }

                await loadReviews();
                checkRatingStatus();

                setTimeout(() => {
                    if (rateBox) rateBox.classList.remove("active");
                    if (message) message.textContent = "";
                }, 1500);

            } catch (error) {
                console.error("Error saving review:", error);
                if (message) {
                    message.textContent = "Something went wrong. Please try again.";
                    message.style.color = "#ff5c5c";
                }
            } finally {
                submitButton.disabled = false;
                checkRatingStatus();
            }
        });
    }

    loadReviews();
});