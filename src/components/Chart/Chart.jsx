import React from 'react'
import { Line, Bar } from 'react-chartjs-2';

const Chart = ({dailyData, theme, data: { confirmed, recovered, deaths }, country}) => {

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#0066ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(209, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : <p className='chart-loading-message'>visualising daily updates...</p>
  );

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 102, 255, 0.5)', 'rgba(0, 175, 6, 0.5)', 'rgba(209, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  return (
    <div className='chart-container'>

      <div className='daily-updates-heading-container'>
        <hr/>
        {
          country ? <h1>Visualised Data</h1> : <h1>Daily Updates</h1>
        }
        <hr/>
      </div>

      {country ? barChart : lineChart}

      <footer className='credits-container'>
        <p>
          <a href="https://www.instagram.com/jain.codes/" style={theme === 'day' ? { color:'#707070'} : {color: '#ffffff'}}>@jain.codes</a> | Stay Home Stay Safe &#128151;
        </p>
      </footer>
    </div>
  )
}

export default Chart;
