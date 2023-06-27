import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Chart } from 'chart.js';

export const BandChart = () => {

    const { socket } = useContext( SocketContext );

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            console.log({bands})
            crearGrafica( bands );
        });
        // (async function() {
        //     const data = [
        //       { year: 2010, count: 10 },
        //       { year: 2011, count: 20 },
        //       { year: 2012, count: 15 },
        //       { year: 2013, count: 25 },
        //       { year: 2014, count: 22 },
        //       { year: 2015, count: 30 },
        //       { year: 2016, count: 28 },
        //     ];
          
        //     new Chart(
        //       document.getElementById('myChart'),
        //       {
        //         type: 'bar',
        //         data: {
        //           labels: data.map(row => row.year),
        //           datasets: [
        //             {
        //               label: 'Acquisitions by year',
        //               data: data.map(row => row.count)
        //             }
        //           ]
        //         }
        //       }
        //     );
        //   })();
    }, [ socket ])


    const crearGrafica = ( bands = []) => {
        
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: bands.map( band => band.name ),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map( band => band.votes ),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                scales: {
                    xAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }

    return (
        <canvas id="myChart"></canvas>
    )
}
