const scooters = [
    // SEGWAY NINEBOT LINEUP
    { name: "Segway Ninebot Max G2", type: "commute", budget: "mid", suspension: "yes", portable: "no", desc: "The ultimate commuter with hydraulic front and spring rear suspension." },
    { name: "Segway Ninebot F2 Pro", type: "commute", budget: "mid", suspension: "yes", portable: "yes", desc: "A lighter commuter with front suspension and turn signals." },
    { name: "Segway Ninebot E2 Plus", type: "commute", budget: "budget", suspension: "no", portable: "yes", desc: "Simple, reliable, and very affordable for short trips." },
    
    // KUKIRIN LINEUP
    { name: "KuKirin G2 Master", type: "fun", budget: "pro", suspension: "yes", portable: "no", desc: "Dual motor power with high-quality dual suspension for off-roading." },
    { name: "KuKirin G2 Max", type: "long", budget: "mid", suspension: "yes", portable: "no", desc: "Great range and power with a seat option and solid suspension." },
    { name: "KuKirin S3 Pro", type: "commute", budget: "budget", suspension: "yes", portable: "yes", desc: "The rare budget scooter that includes basic suspension." },

    // OTHER COMPARISONS
    { name: "Nami Burn-E 2", type: "fun", budget: "pro", suspension: "yes", portable: "no", desc: "Hyper-scooter with adjustable hydraulic suspension." },
    { name: "Unagi Model One", type: "commute", budget: "pro", suspension: "no", portable: "yes", desc: "The lightest high-end scooter, but no suspension." }
];

let userPreferences = {};

function nextStep(currentStep, value) {
    if (currentStep === 1) userPreferences.type = value;
    if (currentStep === 2) userPreferences.budget = value;
    if (currentStep === 3) userPreferences.suspension = value;

    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${currentStep + 1}`).classList.add('active');
}

function calculateResult(isPortable) {
    userPreferences.portable = isPortable;
    
    document.getElementById('step-4').classList.remove('active');
    document.getElementById('result-step').classList.add('active');

    let bestMatch = null;
    let highestScore = -1;

    scooters.forEach(scooter => {
        let score = 0;
        
        // Match Weighting
        if (scooter.type === userPreferences.type) score += 4;       // Primary use is most important
        if (scooter.budget === userPreferences.budget) score += 3;   // Budget is second
        if (scooter.suspension === userPreferences.suspension) score += 2; 
        if (scooter.portable === userPreferences.portable) score += 1;

        if (score > highestScore) {
            highestScore = score;
            bestMatch = scooter;
        }
    });

    const resultDiv = document.getElementById('scooter-result');
    resultDiv.innerHTML = `
        <div class="result-card">
            <h3>${bestMatch.name}</h3>
            <p>${bestMatch.desc}</p>
            <div class="specs">
                <span><strong>Suspension:</strong> ${bestMatch.suspension.toUpperCase()}</span> | 
                <span><strong>Budget:</strong> ${bestMatch.budget.toUpperCase()}</span>
            </div>
        </div>
    `;
}
