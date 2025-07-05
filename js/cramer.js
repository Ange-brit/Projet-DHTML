function resoudre1() {
    // Récupération des coefficients
    const a1 = parseFloat(document.getElementById("a1").value);
    const b1 = parseFloat(document.getElementById("b1").value);
    const c1 = parseFloat(document.getElementById("c1").value);
    const d1 = parseFloat(document.getElementById("d1").value);

    const a2 = parseFloat(document.getElementById("a2").value);
    const b2 = parseFloat(document.getElementById("b2").value);
    const c2 = parseFloat(document.getElementById("c2").value);
    const d2 = parseFloat(document.getElementById("d2").value);

    const a3 = parseFloat(document.getElementById("a3").value);
    const b3 = parseFloat(document.getElementById("b3").value);
    const c3 = parseFloat(document.getElementById("c3").value);
    const d3 = parseFloat(document.getElementById("d3").value);

    // Vérification de la validité des entrées
    if ([a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3].some(isNaN)) {
        alert("Veuillez remplir tous les champs avec des valeurs numériques.");
        return;
    }

    // Déterminant principal Δ
    const delta = determinant3x3(a1, b1, c1, a2, b2, c2, a3, b3, c3);

    // Si delta = 0, pas de solution unique
    if (delta === 0) {
        document.getElementById("resultat").classList.remove("d-none");
        document.getElementById("resultaX").textContent = "Pas de solution unique (Δ = 0)";
        document.getElementById("resultaY").textContent = "";
        document.getElementById("resultaZ").textContent = "";
        return;
    }

    // Déterminants pour x, y, z
    const deltaX = determinant3x3(d1, b1, c1, d2, b2, c2, d3, b3, c3);
    const deltaY = determinant3x3(a1, d1, c1, a2, d2, c2, a3, d3, c3);
    const deltaZ = determinant3x3(a1, b1, d1, a2, b2, d2, a3, b3, d3);

    // Solutions
    const x = deltaX / delta;
    const y = deltaY / delta;
    const z = deltaZ / delta;

    // Affichage du résultat
    document.getElementById("resultat").classList.remove("d-none");
    document.getElementById("resultaX").textContent = `x = ${x.toFixed(4)}`;
    document.getElementById("resultaY").textContent = `y = ${y.toFixed(4)}`;
    document.getElementById("resultaZ").textContent = `z = ${z.toFixed(4)}`;
}

// Fonction pour calculer le déterminant d'une matrice 3x3
function determinant3x3(a, b, c, d, e, f, g, h, i) {
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}