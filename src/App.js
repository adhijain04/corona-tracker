import React from 'react';

// ---------- importing tooltip from material-ui -------------
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

// ---------- importing components ----------
import { Cards, Charts, CountryPicker } from './components';

// ---------- importing api functions ----------
import { fetchData, fetchCountries, fetchDailyUpdates } from './api';

// ----------- importing images and icons ----------------
import covid19 from './assets/images/covid19.jpg';
import logoWhite from './assets/images/logo-white.png';
import logoBlack from './assets/images/logo-black.png';
import sun from './assets/icons/sun.svg';
import moon from './assets/icons/moon.svg';
import info from './assets/icons/info.svg';

// --------- variables -----------
let defaultTheme = localStorage.getItem('color-theme'); 

class App extends React.Component {
  state = {
    data: {},
    theme: 'day',
    countries: [],
    dailyData: [],
    selectedCounty: "",
  }

  UNSAFE_componentWillMount() {
    // setting the deafult theme using localstorage.
    if (defaultTheme) {
      this.setState({ theme: defaultTheme });
    }
  }

  fetchDataHandler = async(country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, selectedCounty: country });
  }

  async componentDidMount() {
    this.fetchDataHandler();
    const fetchedCountries = await fetchCountries()
    const fetchedDailyData = await fetchDailyUpdates()

    this.setState({ countries: fetchedCountries, dailyData: fetchedDailyData });
  }

  // function for toggeling theme.
  themeToggler = (theme) => {
    localStorage.setItem('color-theme', theme);
    this.setState({ theme: theme });
  }

  infoHandler = () => {
    return (
      <div className='info-details-container'>
        <img src={covid19} alt='covid-19' className='covid-19'/>
        <h1>Coronavirus disease 2019</h1>
        <p>
          Coronavirus disease 2019 is an infectious disease caused by severe acute respiratory syndrome coronavirus.
          The disease was first identified in December 2019 in Wuhan, the capital of China's Hubei province, and has since spread globally, resulting in the ongoing 2019–20 coronavirus pandemic.
        </p>
      </div>
    )
  }

  render() {
    const { data, theme, countries, dailyData, selectedCounty } = this.state;

    return (
      <div className={`app ${theme}`}>

        {/* -------- header ---------- */}
        <div className='header-container'>
          <img src={theme === 'day' ? logoBlack : logoWhite} alt="logo" className='logo' />

          <div className='header-controls'>
            <Tooltip title={this.infoHandler()} arrow placement="bottom-start" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} enterTouchDelay={0} disableTouchListener={true}>
              <img src={info} alt="info" className='info' />
            </Tooltip>
            <img
              alt='theme toggle'
              src={theme === 'night' ? moon : sun}
              onClick={this.themeToggler.bind(this, theme === 'day' ? 'night' : 'day')}
            />
          </div> 
        </div>
        {/* -------- header ---------- */}
        
        <CountryPicker countries={countries} theme={theme} fetchDataHandler={this.fetchDataHandler}/>
        <Cards data={data} theme={theme} />
        <Charts theme={theme} dailyData={dailyData} data={data} country={selectedCounty}/>
      </div>
    );
  }
}

export default App;
