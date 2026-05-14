// Database of potential scooters
const scooters = [
    { name: "Segway Ninebot Max G2", type: "commute", budget: "mid", portable: "no", desc: "The king of reliability and range." },
    { name: "Unagi Model One Voyager", type: "commute", budget: "pro", portable: "yes", desc: "Ultra-lightweight and stylish." },
    { name: "Gotrax GXL V2", type: "commute", budget: "budget", portable: "yes", desc: "The best entry-level budget scooter." },
    { name: "Nami Burn-E 2", type: "fun", budget: "pro", portable: "no", desc: "A beastly off-road machine." },
    { name: "EMOVE Cruiser S", type: "long", budget: "mid", portable: "no", desc: "Massive range for long commutes." }
];

let userPreferences = {};

function nextStep(currentStep, value) {
    // Store user choice
    if (currentStep === 1) userPreferences.type = value;
    if (currentStep === 2) userPreferences.budget = value;

    // UI Transition
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${currentStep + 1}`).classList.add('active');
}

function calculateResult(isPortable) {
    userPreferences.portable = isPortable;
    
    document.getElementById('step-3').classList.remove('active');
    document.getElementById('result-step').classList.add('active');

    // Simple matching algorithm: Find the scooter with the most matching tags
    let bestMatch = scooters[0];
    let highestScore = -1;

    scooters.forEach(scooter => {
        let score = 0;
        if (scooter.type === userPreferences.type) score += 3;
        if (scooter.budget === userPreferences.budget) score += 2;
        if (scooter.portable === userPreferences.portable) score += 1;

        if (score > highestScore) {
            highestScore = score;
            bestMatch = scooter;
        }
    });

    // Display result
    const resultDiv = document.getElementById('scooter-result');
    resultDiv.innerHTML = `
        <h3>${bestMatch.name}</h3>
        <p>${bestMatch.desc}</p>
        <p><strong>Perfect for:</strong> ${bestMatch.type} use on a ${bestMatch.budget} budget.</p>
    `;
}
