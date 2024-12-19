// script.js
document.getElementById('damage-potential').addEventListener('input', updateOutput);
document.getElementById('reproducibility').addEventListener('input', updateOutput);
document.getElementById('exploitability').addEventListener('input', updateOutput);
document.getElementById('affected-users').addEventListener('input', updateOutput);
document.getElementById('discoverability').addEventListener('input', updateOutput);

function updateOutput(event) {
    const id = event.target.id;
    const outputId = id + '-output';
    document.getElementById(outputId).value = event.target.value;
}

document.getElementById('risk-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const threatType = document.getElementById('threat').value;
    const damagePotential = parseInt(document.getElementById('damage-potential').value);
    const reproducibility = parseInt(document.getElementById('reproducibility').value);
    const exploitability = parseInt(document.getElementById('exploitability').value);
    const affectedUsers = parseInt(document.getElementById('affected-users').value);
    const discoverability = parseInt(document.getElementById('discoverability').value);

    // Calculate DREAD score
    const dreadScore = (damagePotential + reproducibility + exploitability + affectedUsers + discoverability) / 5;
    
    // Display results
    document.getElementById('threat-description').getElementsByTagName('span')[0].innerText = getThreatDescription(threatType);
    document.getElementById('risk-score').getElementsByTagName('span')[0].innerText = dreadScore.toFixed(2);
    document.getElementById('recommendations').getElementsByTagName('span')[0].innerText = getRecommendations(dreadScore);
});

function getThreatDescription(threatType) {
    const descriptions = {
        spoofing: "Ancaman Spoofing melibatkan penyamaran sebagai entitas lain untuk mendapatkan akses tidak sah.",
        tampering: "Ancaman Tampering melibatkan manipulasi data atau sistem untuk tujuan jahat.",
        repudiation: "Ancaman Repudiation melibatkan penyangkalan atas tindakan yang dilakukan, baik yang sah maupun tidak.",
        "info-disclosure": "Ancaman Information Disclosure melibatkan pembocoran informasi rahasia kepada pihak yang tidak berwenang.",
        dos: "Ancaman Denial of Service melibatkan penghentian layanan untuk pengguna yang sah.",
        eop: "Ancaman Elevation of Privilege melibatkan eskalasi hak akses tanpa izin."
    };

    return descriptions[threatType] || "Ancaman tidak dikenal.";
}

function getRecommendations(score) {
    if (score >= 8) {
        return "Prioritas tinggi, ambil tindakan segera untuk mitigasi.";
    } else if (score >= 5) {
        return "Prioritas sedang, pertimbangkan tindakan mitigasi yang sesuai.";
    } else {
        return "Prioritas rendah, monitor terus ancaman ini.";
    }
}
