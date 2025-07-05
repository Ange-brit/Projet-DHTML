/*document.addEventListener('DOMContentLoaded', function () {
    let totalQuantite = 0;
    let totalMontant = 0;
    let prixList = [];

    for (let i = 1; i <= 5; i++) {
        const qt = parseInt(document.getElementById(`qt${i}`).textContent);
        const prix = parseFloat(document.getElementById(`prix${i}`).textContent);
        const montant = qt * prix;
        document.getElementById(`m${i}`).textContent = montant.toFixed(2) + " €";

        totalQuantite += qt;
        totalMontant += montant;
        prixList.push(prix);
    }

    document.getElementById('total').textContent = totalQuantite;
    document.getElementById('tmontant').textContent = totalMontant.toFixed(2) + " €";

    // Moyenne, min, max
    const totalPrix = prixList.reduce((a, b) => a + b, 0);
    const moyenne = totalPrix / prixList.length;

    document.getElementById('moyen').value = moyenne.toFixed(2);
    document.getElementById('minimal').value = Math.min(...prixList);
    document.getElementById('maximal').value = Math.max(...prixList);
});*/

function updateStats() {
                let totalMontant = 0;
                let totalQt = 0;
                let prixList = [];

                $('#montab tbody tr:visible').each(function () {
                    const qt = parseInt($(this).find('td:eq(1)').text()) || 0;
                    const prix = parseFloat($(this).find('td:eq(2)').text()) || 0;
                    const montant = qt * prix;

                    $(this).find('td:eq(3)').text(montant + " €");

                    totalMontant += montant;
                    totalQt += qt;
                    prixList.push(prix);
                });

                // Stats
                const moyen = prixList.reduce((a, b) => a + b, 0) / prixList.length || 0;
                const min = Math.min(...prixList) || 0;
                const max = Math.max(...prixList) || 0;

                // Affichage
                $('#totalMontant').text(totalMontant + " €");
                $('#totalQt').text(totalQt);
                $('#moyen').val(moyen);
                $('#minimal').val(min);
                $('#maximal').val(max);

                return [moyen, min, max];
            }

            let chartInstance = null;

            $(document).ready(function () {
                const table = $('#montab').DataTable({
                    dom: 'lfrtip',
                    initComplete: function () {
                        const stats = updateStats();
                        renderChart(stats);
                    }
                });

                table.on('draw', function () {
                    const stats = updateStats();
                    updateChart(stats);
                });
            });

            function renderChart([moyen, min, max]) {
                const ctx = document.getElementById("statChart").getContext("2d");
                chartInstance = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: ["Prix moyen", "Prix min", "Prix max"],
                        datasets: [{
                            data: [moyen, min, max],
                            backgroundColor: [
                                "rgba(54, 162, 235, 0.7)",
                                "rgba(255, 206, 86, 0.7)",
                                "rgba(255, 99, 132, 0.7)"
                            ],
                            borderColor: [
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(255, 99, 132, 1)"
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: "bottom" },
                            title: { display: false }
                        }
                    }
                });
            }

            function updateChart([moyen, min, max]) {
                if (chartInstance) {
                    chartInstance.data.datasets[0].data = [moyen, min, max];
                    chartInstance.update();
                }
            }