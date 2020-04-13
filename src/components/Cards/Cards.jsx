import React from 'react'
import moment from 'moment';
import CountUp from 'react-countup';

const Cards = ({ data, theme }) => {
  return (
    <div className='cards-container'>
      {/* --------------- card 1 --------------- */}
      <div className={`card ${theme === 'day' ? "day-highlighter" : "night-highlighter"}`}>
        <div className='card-heading-container'>
          <h3>Infected</h3>
          <h6>Number of active cases.</h6>
        </div>
        <hr/>
        {
          Object.keys(data).length && data.confirmed
            ? (
                <div className='card-data-container'>
                  <h1 className='infected'>
                    <CountUp start={0} end={data.confirmed.value} duration={2.75} separator="," />
                  </h1>
                  <h6>updated {moment(data.lastUpdate).fromNow()}</h6>
                </div>
              )
            : <p className='card-data-container'>Loading no. of active cases...</p>
        }
      </div>

      {/* --------------- card 2 --------------- */}
      <div className={`card ${theme === 'day' ? "day-highlighter" : "night-highlighter"}`}>
        <div className='card-heading-container'>
          <h3>Recovered</h3>
          <h6>Number of cases recovered.</h6>
        </div>
        <hr/>
        {
          Object.keys(data).length && data.recovered
            ? (
                <div className='card-data-container'>
                  <h1 className='recovered'>
                    <CountUp start={0} end={data.recovered.value} duration={2.75} separator="," />
                  </h1>
                  <h6>updated {moment(data.lastUpdate).fromNow()}</h6>
                </div>
              )
            : <p className='card-data-container'>Loading no. of cases recovered...</p>
        }
      </div>

      {/* --------------- card 3 --------------- */}
      <div className={`card ${theme === 'day' ? "day-highlighter" : "night-highlighter"}`}>
        <div className='card-heading-container'>
          <h3>Deaths</h3>
          <h6>Number of deaths.</h6>
        </div>
        <hr/>
        {
          Object.keys(data).length && data.deaths
            ? (
                <div className='card-data-container'>
                  <h1 className='deaths'>
                    <CountUp start={0} end={data.deaths.value} duration={2.75} separator="," />
                  </h1>
                  <h6>updated {moment(data.lastUpdate).fromNow()}</h6>
                </div>
              )
            : <p className='card-data-container'>Loading no. of deaths...</p>
        }
      </div>
    </div>
  )

}

export default Cards;
