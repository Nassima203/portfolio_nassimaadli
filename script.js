// --- 1. VÉRIFICATION IMMÉDIATE (Anti-clignotement) ---
(function() {
    if (sessionStorage.getItem('loaderVu') === 'oui') {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.style.display = 'none';
    }
})();

// --- 2. CONFIGURATION ---
const textParagraph1 = "Le développement est mon point de rencontre entre logique et émotion visuelle. Je traduis des concepts en expériences fluides, précises et épurées.";
const textParagraph2 = "Ma démarche repose sur un code propre, au service d'environnements digitaux minimalistes et haut de gamme.";
const typingSpeed = 30;

function typeWriter(text, element, callback) {
    let i = 0;
    element.classList.add('typing-active');
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        } else {
            element.classList.remove('typing-active');
            if (callback) setTimeout(callback, 300);
        }
    }
    type();
}

// --- 3. EXÉCUTION FUSIONNÉE ---
document.addEventListener('DOMContentLoaded', () => {
    const elem1 = document.getElementById('text-1');
    const elem2 = document.getElementById('text-2');
    const loadingScreen = document.getElementById('loading-screen');

    // Détection de la navigation (retour arrière)
    const navEntries = performance.getEntriesByType("navigation");
    const isBackForward = navEntries.length > 0 && navEntries[0].type === "back_forward";
    
    // Si c'est une visite classique et qu'on n'a pas encore vu le loader
    if (!isBackForward && sessionStorage.getItem('loaderVu') !== 'oui') {
        setTimeout(() => {
            typeWriter(textParagraph1, elem1, () => {
                typeWriter(textParagraph2, elem2, () => {
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                        sessionStorage.setItem('loaderVu', 'oui');
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 1000); // Temps de transition de l'opacité
                    }, 1000);
                });
            });
        }, 300);
    } else {
        // Cas du retour arrière ou déjà vu : disparition immédiate
        if (loadingScreen) loadingScreen.style.display = 'none';
    }
});

const response = await fetch('https://hook.eu1.make.com/2j6oxq2o9l2cnywosw4ajq03rknuxu7a', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, message: message })
});