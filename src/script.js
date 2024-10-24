document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('grafico').getContext('2d');
    let chart;

    fetch('src/base_amazonia_desmatada.xlsx').then(response => response.arrayBuffer()).then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const labels = [];
        const values = [];

        jsonData.forEach((row, index) => {
            if (index === 0) return; 
            const year = row[0]; 
            const area = row[1]; 

            labels.push(year);
            values.push(area);
        });

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Área Desmatada (km²)',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: true,
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Área (km²)'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `Área: ${tooltipItem.raw} km²`;
                            }
                        }
                    }
                }
            }
        });

        
        document.getElementById('filter-button').addEventListener('click', function() {
            const startYear = parseInt(document.getElementById('start-year').value);
            const endYear = parseInt(document.getElementById('end-year').value);

            const filteredData = jsonData.filter(row => {
                const year = row[0];
                return (!isNaN(startYear) && !isNaN(endYear)) ? (year >= startYear && year <= endYear) : true;
            });

            const newLabels = [];
            const newValues = [];

            filteredData.forEach(row => {
                const year = row[0];
                const area = row[1];

                newLabels.push(year);
                newValues.push(area);
            });

            chart.data.labels = newLabels;
            chart.data.datasets[0].data = newValues;
            chart.update();
        });
    });
});
