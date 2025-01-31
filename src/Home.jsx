import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Css/Home.css';
import { Link } from 'react-router-dom';

const images = ['/pic1.png', '/pic2.jpeg'];

const Home = () => {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);
  const [showSection, setShowSection] = useState('services');
  const [currentIndex, setIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState('No preference');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const serviceRefs = useRef({});

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(setData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const today = new Date();
    const upcomingDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return {
        fullDate: date.toLocaleDateString(),
        day: date.getDate().toString().padStart(2, '0'),
        month: date.toLocaleString('default', { month: 'short' })
      };
    });
    setDateOptions(upcomingDates);
  }, []);

  const servicesData = useMemo(() => data?.services || {}, [data]);

  const navigateImage = useCallback(
    (direction) =>
      setIndex((prev) =>
        direction === 'prev' ? (prev === 0 ? images.length - 1 : prev - 1) : (prev === images.length - 1 ? 0 : prev + 1)
      ),
    []
  );

  const handleCheckboxChange = useCallback(
    (service) =>
      setCart((prev) =>
        prev.some((item) => item.id === service.id) ? prev.filter((item) => item.id !== service.id) : [...prev, service]
      ),
    []
  );

  const calculateTotal = useMemo(() => cart.reduce((total, { price }) => total + price, 0).toFixed(2), [cart]);

  const handleCategoryClick = useCallback(
    (category) => {
      if (activeCategory === category || !serviceRefs.current[category]) return;
      serviceRefs.current[category].scrollIntoView({ behavior: 'smooth' });
      setActiveCategory(category);
    },
    [activeCategory]
  );

  const handleSelectStaffClick = () => {
    if (cart.length === 0) {
      alert('Please select at least one service before selecting staff.');
      return;
    }
    setShowSection('selectStaff');
  };

  const handleBookNowClick = () => {
    // Check if staff is selected
    if (!selectedStaff || selectedStaff === 'No preference') {
      alert('Please select a staff member.');
      return;
    }

    // Check if date is selected
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    // Check if time is selected
    if (!selectedTime) {
      alert('Please select a time.');
      return;
    }

    // If all conditions are met, proceed with the booking
    alert('Booking successful!');
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date.fullDate);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className='home'>
      <div id='infobox'>
        <div id='infocontainer'>
          <div id='info'>
            <p className='titlecontainer'>
              <span className='n'>N</span>
              <span className='title'>Natural Beauty Salon, Spa and Wellness Center</span>
              <span className='rating'>
                ★<span className='ratingno'>4.8</span>
              </span>
            </p>
            <ul className='infolist'>
              <li>
                <i className='bi bi-geo-alt'></i>
                <span className='ilist'>319, Bin Sougat centre, Rashidiya branch, UAE.</span>
              </li>
              <li>
                <i className='bi bi-clock'></i>
                <span className='ilist'>9:00 AM to 9:00 PM</span>
              </li>
              <li>
                <i className='bi bi-lightning-charge'></i>
                <span className='ilist'>Instant booking</span>
              </li>
            </ul>
            <Link className='map' to={'https://web.whatsapp.com/'}>
              <i className='bi bi-map'></i>View Map
            </Link>
          </div>

          <div id='pic'>
            <i className='bi bi-chevron-left' onClick={() => navigateImage('prev')} />
            <img className='image' src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
            <i className='bi bi-chevron-right' onClick={() => navigateImage('next')} />
            <p className='colorIndicator'>
              {images.map((_, idx) => (
                <span key={idx} className={`dot ${currentIndex === idx ? 'active' : ''}`}>
                  .
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className='menucontainer'>
          <div className='menu'>
            {['services', 'gift', ''].map((section) => (
              <span
                key={section}
                className={showSection === section ? 'activemenu' : ''}
                onClick={() => setShowSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
            ))}
          </div>

          {showSection === 'services' ? (
            <div id='services'>
              <div id='services-container'>
                <div id='column1' className='service-column'>
                  {Object.keys(servicesData).map((category) => (
                    <p
                      key={category}
                      className={activeCategory === category ? 'active-category' : ''}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </p>
                  ))}
                </div>

                <div id='column2' className='service-column'>
                  {Object.entries(servicesData).map(([category, services]) => (
                    <div key={category} ref={(el) => (serviceRefs.current[category] = el)}>
                      <h4>{category}</h4>
                      <ul className='service-list'>
                        {services.map((service) => (
                          <li key={service.id} className='service-list-item'>
                            <label className='service-label'>
                              <input
                                type='checkbox'
                                checked={cart.some((item) => item.id === service.id)}
                                onChange={() => handleCheckboxChange(service)}
                                className='service-checkbox'
                              />
                              <span className='sername'>{service.name}</span>{' '}
                              <span className='serprice'>${service.price}</span> <br />
                              <small>{service.duration}</small>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div id='cart' className='service-column'>
                  <h3>Cart</h3>
                  <p id='cart-count'>{cart.length} items</p>
                  <div id='cart-items'>
                    {cart.map((item) => (
                      <div key={item.id} className='service-list-item'>
                        <span className='sername'>{item.name}</span>
                        <h3 className='cartserprice'> ${item.price}</h3>
                        <br />
                        <small>{item.duration}</small>
                      </div>
                    ))}
                  </div>
                  <div id='cart-total'>
                    Total: <span className='total'>${calculateTotal}</span>
                  </div>
                  <button id='book-now-button' onClick={handleSelectStaffClick}>
                    Select Staff
                  </button>
                </div>
              </div>
            </div>
          ) : showSection === 'gift' ? (
            <div id='gift'>Coming Soon</div>
          ) : (
            <div id='selectStaff'>
              <div id='selectStaff-container'>
                <div className='column3'>
                  <h3>Select Staff</h3>
                  <div className='staff-list'>
                    {['No preference', 'Ryan', 'John', 'Amaya', 'Sam', 'Anna'].map((staff) => (
                      <label key={staff}>
                        <input
                          type='radio'
                          name='staff'
                          value={staff}
                          checked={selectedStaff === staff}
                          onChange={() => setSelectedStaff(staff)}
                        />
                        {staff}
                      </label>
                    ))}
                  </div>

                  {/* Select Date Section */}
                  <div id='selectDate'>
                    <h4>Select Date</h4>
                    <div id='date-buttons'>
                      {dateOptions.map((date) => (
                        <button
                          key={date.day}
                          className={`date-button ${selectedDate === date.fullDate ? 'selected' : ''}`}
                          onClick={() => handleSelectDate(date)}
                        >
                          {date.day} {date.month}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Time Section */}
                  <div id='selectTime'>
                    <h4>Select Time</h4>
                    <div id='time-buttons'>
                      <h5>Early Hours</h5>
                      {[
                        '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM',
                        '11:15 AM', '11:30 AM', '12:00 PM'
                      ].map((time) => (
                        <button
                          key={time}
                          className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => handleSelectTime(time)}
                        >
                          {time}
                        </button>
                      ))}

                      <h5>Late Hours</h5>
                      {[
                        '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM', '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM', '6:00 PM',
                        '6:15 PM', '6:30 PM', '6:45 PM'
                      ].map((time) => (
                        <button
                          key={time}
                          className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => handleSelectTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div id='cart' className='service-column column4'>
                  <h3>Cart</h3>
                  <p id='cart-count'>{cart.length} items</p>
                  <div id='cart-items'>
                    {cart.map((item) => (
                      <div key={item.id} className='service-list-item'>
                        <span className='sername'>{item.name}</span>
                        <h3 className='cartserprice'> ${item.price}</h3>
                        <br />
                        <small>{item.duration}</small>
                      </div>
                    ))}
                  </div>

                  {/* Display Selected Staff, Date, and Time */}
                  <div id='selected-details'>
                    <p>
                      <strong>Staff:</strong> {selectedStaff}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedDate ? selectedDate : 'Not selected'}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedTime ? selectedTime : 'Not selected'}
                    </p>
                  </div>

                  <div id='cart-total'>
                    Total: <span className='total'>${calculateTotal}</span>
                  </div>

                  {/* Book Now Button */}
                  <button id="book-now-button" onClick={handleBookNowClick}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className='credits'>
          Beauty Services in Beta 1 Plaza / Hair Services in Beta 1 Plaza / Beauty Services in Madhead Studios / Beauty
          Services in Beta 1 Plaza / Hair Services in Beta 1 Plaza / Beauty Services in Madhead Studios / Beauty
          Services in Beta 1 Plaza / Hair Services in Beta 1 Plaza / Beauty Services in Madhead Studios / 
        </p>
        <p className='copyright'>
          Online bookings powered by Miosalon | copyrights 2019. All rights reserved | Terms & Conditions | Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Home;
