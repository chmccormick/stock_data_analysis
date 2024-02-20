document.addEventListener('DOMContentLoaded', function(){
    fetch('./static/database_data.json')
    .then(response => response.json())
    .then(data => {
        var amazonData = data.amazon;
        
        var trace = {
            type: 'scatter',
            mode: 'markers',
            x: amazonData.map(d => d.date),
            y: amazonData.map(d => d.close),
            marker: {
                size: amazonData.map(d => Math.sqrt(d.volume) / 250), // Adjust marker size for better visibility
                color: amazonData.map(d => d.volume),
                colorscale: 'Cividis',
                showscale: true // Show color scale to interpret volume
            }
        };

        var layout = {
            title: 'Amazon (AMZN) Closing Day Value vs Volume Over Time',
            plot_bgcolor: 'ivory',
            paper_bgcolor: 'ivory',
            xaxis: { title: 'Date' },
            yaxis: { 
                title: 'Close Value' },
                range: [0, 'auto'],
                rangemode: 'nonnegative' 
        };

        Plotly.newPlot('myDiv', [trace], layout);
    })
    .catch(error => console.error('Error loading the JSON data:', error));
});
