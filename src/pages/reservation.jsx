import React, { useState, useEffect } from 'react';

const TABLES = [
  { id: 1, name: "Table 1", seats: 2, type: "square", top: "12%", left: "10%", width: "12%", height: "14%" },
  { id: 2, name: "Table 2", seats: 2, type: "square", top: "12%", left: "78%", width: "12%", height: "14%" },
  { id: 3, name: "Table 3", seats: 4, type: "rectangle", top: "12%", left: "28%", width: "18%", height: "14%" },
  { id: 4, name: "Table 4", seats: 4, type: "rectangle", top: "12%", left: "54%", width: "18%", height: "14%" },
  
  { id: 5, name: "Table 5", seats: 6, type: "round", top: "42%", left: "42%", width: "16%", height: "22%" },
  { id: 6, name: "Table 6", seats: 2, type: "square", top: "45%", left: "10%", width: "12%", height: "14%" },
  { id: 7, name: "Table 7", seats: 4, type: "rectangle", top: "45%", left: "78%", width: "12%", height: "22%" },
  
  { id: 8, name: "Table 8", seats: 4, type: "rectangle", top: "72%", left: "10%", width: "18%", height: "14%" },
  { id: 9, name: "Table 9", seats: 8, type: "banquet", top: "72%", left: "36%", width: "28%", height: "14%" },
  { id: 10, name: "Table 10", seats: 2, type: "square", top: "72%", left: "78%", width: "12%", height: "14%" }
];

export default function Reservation({ addToast }) {
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [date, setDate] = useState(getTodayDateString());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookedTables, setBookedTables] = useState([]);
  const [fetchingTables, setFetchingTables] = useState(false);
  const [guests, setGuests] = useState(2);
  const [currentStep, setCurrentStep] = useState(1);

  const slots = ["12:00 PM", "01:30 PM", "03:00 PM", "06:00 PM", "07:30 PM", "09:00 PM"];

  const fetchAvailability = async (selectedDate) => {
    if (!selectedDate) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/reservation/availability?date=${selectedDate}`);
      if (response.ok) {
        const data = await response.json();
        setAvailability(data);
      } else {
        addToast('Failed to fetch table availability.', 'error');
      }
    } catch (err) {
      console.error(err);
      addToast('Error connecting to the server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedTables = async (selectedDate, slot) => {
    if (!selectedDate || !slot) return;
    setFetchingTables(true);
    try {
      const response = await fetch(`/api/reservation/booked-tables?date=${selectedDate}&time=${slot}`);
      if (response.ok) {
        const data = await response.json();
        setBookedTables(data.booked_tables || []);
      } else {
        addToast('Failed to fetch table layout status.', 'error');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingTables(false);
    }
  };

  useEffect(() => {
    fetchAvailability(date);
    setSelectedSlot('');
    setSelectedTable(null);
  }, [date]);

  useEffect(() => {
    if (date && selectedSlot) {
      fetchBookedTables(date, selectedSlot);
    } else {
      setBookedTables([]);
    }
    setSelectedTable(null);
  }, [date, selectedSlot]);

  useEffect(() => {
    if (selectedTable) {
      const table = TABLES.find(t => t.id === selectedTable);
      if (table && table.seats < guests) {
        setSelectedTable(null);
      }
    }
  }, [guests]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      addToast('Please select a time slot.', 'error');
      return;
    }
    if (!selectedTable) {
      addToast('Please select a table on the layout map.', 'error');
      return;
    }

    const formData = new FormData(e.target);
    formData.append('time', selectedSlot);
    formData.append('table_number', selectedTable);

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        addToast(`Table ${selectedTable} has been successfully reserved! We look forward to seeing you.`, 'success');
        e.target.reset();
        setSelectedSlot('');
        setSelectedTable(null);
        setCurrentStep(1);
        // Re-fetch to update availability
        fetchAvailability(date);
      } else {
        addToast(result.message || 'Failed to reserve table. Please try again later.', 'error');
      }
    } catch (error) {
      addToast('Network error occurred.', 'error');
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!date || !guests) {
        addToast('Please select a date and guest count.', 'error');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedSlot) {
        addToast('Please select a time slot.', 'error');
        return;
      }
      if (!selectedTable) {
        addToast('Please select a table on the map.', 'error');
        return;
      }
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-espresso text-cream relative">
        <div className="container mx-auto px-6 relative z-10 text-center reveal-up">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Reserve a Table</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-cream/80">Experience luxury dining. Secure your spot today.</p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-12 flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-premium p-8 md:p-12 page-transition border-t-4 border-gold">
            <div className="text-center mb-10">
              <i className="fa-solid fa-bell-concierge text-4xl text-gold mb-4"></i>
              <h2 className="font-serif text-3xl text-espresso font-bold">Book Your Experience</h2>
              <p className="text-espresso/70 mt-2">Each day we offer 10 exclusive tables per time slot. Let us guide you through our reservation process.</p>
            </div>

            {/* Progress Stepper Bar */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-12 relative select-none">
              {/* Connector line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-gold -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(currentStep - 1) * 50}%` }}
              ></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep > 1 
                    ? 'bg-gold text-espresso shadow' 
                    : currentStep === 1 
                      ? 'bg-espresso text-cream border-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                  {currentStep > 1 ? <i className="fa-solid fa-check"></i> : "1"}
                </div>
                <span className={`text-xs mt-2 font-semibold transition-colors duration-300 ${
                  currentStep >= 1 ? 'text-espresso font-bold' : 'text-gray-400'
                }`}>Date & Guests</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep > 2 
                    ? 'bg-gold text-espresso shadow' 
                    : currentStep === 2 
                      ? 'bg-espresso text-cream border-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                  {currentStep > 2 ? <i className="fa-solid fa-check"></i> : "2"}
                </div>
                <span className={`text-xs mt-2 font-semibold transition-colors duration-300 ${
                  currentStep >= 2 ? 'text-espresso font-bold' : 'text-gray-400'
                }`}>Choose Table</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep === 3 
                    ? 'bg-espresso text-cream border-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                  3
                </div>
                <span className={`text-xs mt-2 font-semibold transition-colors duration-300 ${
                  currentStep === 3 ? 'text-espresso font-bold' : 'text-gray-400'
                }`}>Your Info</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="date" value={date} />
              <input type="hidden" name="guests" value={guests} />
              
              {/* STEP 1: Date and Guest count */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-espresso font-medium mb-2">Select Date</label>
                      <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={getTodayDateString()}
                        required 
                        className="form-input" 
                      />
                    </div>
                    <div>
                      <label htmlFor="guests" className="block text-espresso font-medium mb-2">Guests</label>
                      <select 
                        id="guests" 
                        name="guests" 
                        required 
                        value={guests} 
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="form-input text-espresso/80"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5 People</option>
                        <option value="6">6+ People</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="text-center pt-6">
                    <button 
                      type="button" 
                      onClick={nextStep} 
                      className="btn-primary w-full md:w-auto px-12 py-4 text-lg transition-all"
                    >
                      Next: Choose Table <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Time Slots & Floor Map Layout */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Summary Header */}
                  <div className="bg-cream/40 border border-espresso/10 rounded-lg p-4 flex justify-between items-center text-sm mb-6">
                    <div>
                      <span className="font-semibold text-espresso">Selected: </span>
                      <span className="text-espresso/80">{date} • {guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="text-gold hover:text-espresso font-medium transition duration-200 text-xs uppercase tracking-wider flex items-center gap-1 font-sans"
                    >
                      <i className="fa-solid fa-pen-to-square"></i> Change
                    </button>
                  </div>

                  {/* Time Slots Area */}
                  <div>
                    <label className="block text-espresso font-medium mb-3">Select Time Slot</label>
                    {loading ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {slots.map((slot) => {
                          const tablesLeft = availability[slot] !== undefined ? availability[slot] : 10;
                          const isFull = tablesLeft === 0;
                          const isSelected = selectedSlot === slot;

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isFull}
                              onClick={() => setSelectedSlot(slot)}
                              className={`relative p-4 rounded-lg border-2 text-center transition-all duration-300 ${
                                isFull 
                                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60' 
                                  : isSelected
                                    ? 'bg-espresso border-gold text-cream shadow-md'
                                    : 'bg-white border-gray-200 text-espresso hover:border-gold hover:shadow-sm'
                              }`}
                            >
                              <div className="font-serif font-bold text-lg">{slot}</div>
                              <div className={`text-xs mt-1 font-medium ${
                                isFull 
                                  ? 'text-red-500' 
                                  : isSelected 
                                    ? 'text-gold' 
                                    : tablesLeft <= 3 
                                      ? 'text-amber-600' 
                                      : 'text-green-600'
                              }`}>
                                {isFull ? 'Fully Booked' : `${tablesLeft} of 10 tables left`}
                              </div>
                              
                              {/* Selected Check Indicator */}
                              {isSelected && (
                                <div className="absolute top-1 right-2 text-gold text-xs">
                                  <i className="fa-solid fa-circle-check"></i>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Seating Layout Map Section */}
                  {selectedSlot ? (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-espresso">Choose Your Table</h3>
                          <p className="text-sm text-espresso/60 mt-1">Select an available table from the floor layout below.</p>
                        </div>
                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 mt-3 md:mt-0 text-xs font-medium">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded bg-white border border-emerald-500"></div>
                            <span>Available</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded bg-espresso border border-gold"></div>
                            <span>Selected</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded bg-gray-100 border border-gray-300"></div>
                            <span>Occupied</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded bg-amber-50/50 border border-amber-300"></div>
                            <span>Too Small</span>
                          </div>
                        </div>
                      </div>

                      {/* Seating Map Canvas */}
                      {fetchingTables ? (
                        <div className="flex justify-center items-center py-20 bg-cream/30 rounded-xl border border-espresso/10">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
                        </div>
                      ) : (
                        <div>
                          <div className="relative w-full aspect-[16/10] bg-cream/30 rounded-2xl border-2 border-espresso/10 p-6 shadow-inner select-none overflow-hidden animate-fadeIn">
                            {/* Windows (Top) */}
                            <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-blue-300/30 via-cyan-200/35 to-blue-300/30 border-b border-cyan-400/20 flex justify-center items-center">
                              <span className="text-[9px] text-cyan-800/50 font-semibold tracking-widest uppercase flex items-center gap-1">
                                <i className="fa-solid fa-leaf text-[7px] text-emerald-600/60"></i> Garden Windows View
                              </span>
                            </div>

                            {/* Bar Counter (Right) */}
                            <div className="absolute top-[20%] right-0 bottom-[20%] w-[8%] bg-espresso/5 border-l-2 border-y-2 border-espresso/15 rounded-l-xl flex flex-col justify-center items-center py-2">
                              <span className="text-[8px] text-espresso/50 font-bold uppercase tracking-widest rotate-90 my-auto whitespace-nowrap">
                                Bar Counter
                              </span>
                              {/* Bar stools */}
                              <div className="absolute -left-1.5 top-[20%] w-2.5 h-2.5 rounded-full bg-espresso/10 border border-espresso/20"></div>
                              <div className="absolute -left-1.5 top-[40%] w-2.5 h-2.5 rounded-full bg-espresso/10 border border-espresso/20"></div>
                              <div className="absolute -left-1.5 top-[60%] w-2.5 h-2.5 rounded-full bg-espresso/10 border border-espresso/20"></div>
                              <div className="absolute -left-1.5 top-[80%] w-2.5 h-2.5 rounded-full bg-espresso/10 border border-espresso/20"></div>
                            </div>

                            {/* Entrance (Bottom) */}
                            <div className="absolute bottom-0 left-[42%] right-[42%] h-1.5 bg-cream flex justify-center items-center border-t border-dashed border-espresso/40">
                              <span className="absolute -top-4 text-[9px] text-espresso/50 font-bold uppercase tracking-wider flex items-center gap-1">
                                <i className="fa-solid fa-door-open"></i> Entrance
                              </span>
                            </div>

                            {/* Lounge (Left bottom corner) */}
                            <div className="absolute bottom-0 left-0 top-[75%] w-[18%] bg-espresso/5 border-t-2 border-r-2 border-espresso/15 rounded-tr-xl flex justify-center items-center p-1">
                              <span className="text-[9px] text-espresso/50 font-bold uppercase tracking-wider flex items-center gap-1">
                                <i className="fa-solid fa-couch"></i> Lounge Area
                              </span>
                            </div>

                            {/* Plant Pots & Decor Elements */}
                            <div className="absolute top-4 left-4 text-emerald-600/20 text-md">
                              <i className="fa-solid fa-seedling"></i>
                            </div>
                            <div className="absolute top-4 right-4 text-emerald-600/20 text-md">
                              <i className="fa-solid fa-seedling"></i>
                            </div>

                            {/* Tables Map */}
                            {TABLES.map((table) => {
                              const isBooked = bookedTables.includes(table.id);
                              const isSelected = selectedTable === table.id;
                              const isTooSmall = table.seats < guests;
                              
                              let tableClass = "";
                              let chairClass = "";
                              
                              if (isBooked) {
                                tableClass = "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed";
                                chairClass = "bg-gray-200 border-gray-300";
                              } else if (isSelected) {
                                tableClass = "bg-espresso border-gold text-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105 z-10";
                                chairClass = "bg-gold border-gold";
                              } else if (isTooSmall) {
                                tableClass = "bg-amber-50/40 border-amber-300/80 text-amber-600/80 cursor-pointer hover:bg-amber-100/40 hover:border-amber-400 transition-all duration-300";
                                chairClass = "bg-amber-100 border-amber-300";
                              } else {
                                tableClass = "bg-white border-emerald-500 text-emerald-800 hover:bg-emerald-50/50 hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-300";
                                chairClass = "bg-emerald-100 border-emerald-500";
                              }

                              const handleTableClick = () => {
                                if (isBooked) return;
                                if (isTooSmall) {
                                  addToast(`This table seats ${table.seats} guests, but you selected ${guests} guests. Please select a larger table.`, 'error');
                                  return;
                                }
                                setSelectedTable(table.id);
                              };

                              return (
                                <div
                                  key={table.id}
                                  className="absolute transition-all duration-300"
                                  style={{
                                    top: table.top,
                                    left: table.left,
                                    width: table.width,
                                    height: table.height
                                  }}
                                >
                                  {/* Visual Chairs */}
                                  {table.seats === 2 && (
                                    <>
                                      <div className={`absolute top-1/2 -translate-y-1/2 -left-2.5 w-2 h-4 rounded-l-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute top-1/2 -translate-y-1/2 -right-2.5 w-2 h-4 rounded-r-sm border transition-all duration-300 ${chairClass}`} />
                                    </>
                                  )}

                                  {table.seats === 4 && table.id !== 7 && (
                                    <>
                                      <div className={`absolute -top-2.5 left-[20%] w-4 h-2 rounded-t-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -top-2.5 right-[20%] w-4 h-2 rounded-t-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -bottom-2.5 left-[20%] w-4 h-2 rounded-b-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -bottom-2.5 right-[20%] w-4 h-2 rounded-b-sm border transition-all duration-300 ${chairClass}`} />
                                    </>
                                  )}

                                  {table.id === 7 && (
                                    <>
                                      <div className={`absolute top-[20%] -left-2.5 w-2 h-4 rounded-l-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute bottom-[20%] -left-2.5 w-2 h-4 rounded-l-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute top-[20%] -right-2.5 w-2 h-4 rounded-r-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute bottom-[20%] -right-2.5 w-2 h-4 rounded-r-sm border transition-all duration-300 ${chairClass}`} />
                                    </>
                                  )}

                                  {table.seats === 6 && (
                                    <>
                                      <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-2 rounded-t-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-2 rounded-b-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute top-1/2 -translate-y-1/2 -left-2.5 w-2 h-4 rounded-l-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute top-1/2 -translate-y-1/2 -right-2.5 w-2 h-4 rounded-r-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute top-[15%] left-[10%] w-3 h-3 rounded-tl-sm border -rotate-45 transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute top-[15%] right-[10%] w-3 h-3 rounded-tr-sm border rotate-45 transition-all duration-300 ${chairClass}`} />
                                    </>
                                  )}

                                  {table.seats === 8 && (
                                    <>
                                      <div className={`absolute -top-2.5 left-[15%] w-4 h-2 rounded-t-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -top-2.5 left-[50%] -translate-x-1/2 w-4 h-2 rounded-t-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -top-2.5 right-[15%] w-4 h-2 rounded-t-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -bottom-2.5 left-[15%] w-4 h-2 rounded-b-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -bottom-2.5 left-[50%] -translate-x-1/2 w-4 h-2 rounded-b-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute -bottom-2.5 right-[15%] w-4 h-2 rounded-b-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute top-1/2 -translate-y-1/2 -left-2.5 w-2 h-4 rounded-l-sm border transition-all duration-300 ${chairClass}`} />
                                      <div className={`absolute top-1/2 -translate-y-1/2 -right-2.5 w-2 h-4 rounded-r-sm border transition-all duration-300 ${chairClass}`} />
                                    </>
                                  )}

                                  {/* Table Surface */}
                                  <div
                                    onClick={handleTableClick}
                                    className={`w-full h-full border flex flex-col justify-center items-center transition-all duration-300 relative shadow-sm ${
                                      table.type === "round" ? "rounded-full" : "rounded-lg"
                                    } ${tableClass}`}
                                  >
                                    <span className="font-serif font-bold text-xs sm:text-sm">{table.id}</span>
                                    <span className="text-[7px] sm:text-[9px] opacity-75 font-medium">{table.seats} Seats</span>
                                    
                                    {isTooSmall && !isBooked && !isSelected && (
                                      <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] shadow">
                                        <i className="fa-solid fa-warning"></i>
                                      </div>
                                    )}

                                    {isSelected && (
                                      <div className="absolute -top-1 -right-1 bg-gold text-espresso rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] shadow border border-espresso">
                                        <i className="fa-solid fa-check"></i>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Selected Table Information Alert */}
                          {selectedTable ? (
                            <div className="mt-4 p-4 rounded-lg bg-gold/10 border border-gold/30 flex items-center gap-3 animate-fadeIn">
                              <i className="fa-solid fa-circle-check text-gold text-lg"></i>
                              <div>
                                <p className="font-medium text-espresso">
                                  Selected <span className="font-bold">Table {selectedTable}</span> ({TABLES.find(t => t.id === selectedTable)?.seats} seats)
                                </p>
                                <p className="text-xs text-espresso/70 mt-0.5">
                                  Perfect for your group of {guests} {guests === 1 ? 'person' : 'people'}.
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200 text-center text-espresso/60 text-sm">
                              <i className="fa-solid fa-arrow-pointer mr-2 text-gold"></i>
                              Please click on an available table on the floor plan above to select it.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-8 p-8 rounded-xl border border-dashed border-espresso/20 text-center text-espresso/60 bg-cream/10">
                      <i className="fa-solid fa-calendar-day text-3xl text-gold mb-3 block animate-pulse"></i>
                      <p className="font-medium text-espresso/80">Please select a Time Slot above to load the floor seating plan.</p>
                    </div>
                  )}

                  <div className="flex justify-between pt-6 border-t border-espresso/10">
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="btn-secondary px-8 py-3 flex items-center gap-2 hover:bg-espresso hover:text-cream transition"
                    >
                      <i className="fa-solid fa-arrow-left text-sm"></i> Back
                    </button>
                    <button 
                      type="button" 
                      onClick={nextStep}
                      disabled={!selectedSlot || !selectedTable}
                      className="btn-primary px-8 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none"
                    >
                      Next: Contact Info <i className="fa-solid fa-arrow-right text-sm"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Personal Information & Submission */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Summary */}
                  <div className="bg-cream/40 border border-espresso/10 rounded-lg p-4 text-sm mb-6 space-y-2">
                    <div className="font-semibold text-espresso border-b border-espresso/10 pb-2 flex justify-between items-center">
                      <span>Booking Summary</span>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(2)}
                        className="text-gold hover:text-espresso font-medium transition duration-200 text-xs uppercase tracking-wider flex items-center gap-1 normal-case font-sans"
                      >
                        <i className="fa-solid fa-pen-to-square"></i> Change Table/Time
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 pt-1 text-espresso/80">
                      <div>Date: <span className="font-bold text-espresso">{date}</span></div>
                      <div>Time Slot: <span className="font-bold text-espresso">{selectedSlot}</span></div>
                      <div>Party Size: <span className="font-bold text-espresso">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span></div>
                      <div>Selected Seating: <span className="font-bold text-espresso">Table {selectedTable}</span></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-espresso font-medium mb-2">Full Name</label>
                      <input type="text" id="name" name="name" required className="form-input" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-espresso font-medium mb-2">Phone Number</label>
                      <input type="tel" id="phone" name="phone" required className="form-input" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="special_request" className="block text-espresso font-medium mb-2">Special Request (Optional)</label>
                    <textarea id="special_request" name="special_request" rows="4" className="form-input" placeholder="Any dietary preferences or special occasions?"></textarea>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-espresso/10">
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="btn-secondary px-8 py-3 flex items-center gap-2 hover:bg-espresso hover:text-cream transition"
                    >
                      <i className="fa-solid fa-arrow-left text-sm"></i> Back
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary px-12 py-3 text-lg transition-all"
                    >
                      Confirm Reservation <i className="fa-solid fa-circle-check ml-1.5"></i>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
