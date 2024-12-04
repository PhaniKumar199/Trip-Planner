
import React, { useState } from "react";
import "./TripList.css";

const TripList = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      destination: "Paris",
      startDate: "2024-12-01",
      endDate: "2024-12-10",
      expenses: ["Flight", "Hotel"],
      companions: ["John", "Alice"],
    },
  ]);

  const [newTrip, setNewTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });
  };

  const addTrip = () => {
    if (!newTrip.destination || !newTrip.startDate || !newTrip.endDate) {
      alert("Please fill in all fields to add a trip.");
      return;
    }

    if (new Date(newTrip.endDate) < new Date(newTrip.startDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    setTrips([
      ...trips,
      {
        id: trips.length + 1,
        destination: newTrip.destination,
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
        expenses: [],
        companions: [],
      },
    ]);

    setNewTrip({ destination: "", startDate: "", endDate: "" });
  };

  const addDetail = (id, type) => {
    const detail = prompt(`Add a new ${type === "expenses" ? "expense" : "companion"}:`);
    if (detail) {
      setTrips(
        trips.map((trip) =>
          trip.id === id ? { ...trip, [type]: [...trip[type], detail] } : trip
        )
      );
    }
  };

  const editDetail = (id, type, index) => {
    const trip = trips.find((trip) => trip.id === id);
    const updatedDetail = prompt(
      `Edit ${type === "expenses" ? "expense" : "companion"}:`,
      trip[type][index]
    );
    if (updatedDetail) {
      const updatedDetails = [...trip[type]];
      updatedDetails[index] = updatedDetail;

      setTrips(
        trips.map((trip) =>
          trip.id === id ? { ...trip, [type]: updatedDetails } : trip
        )
      );
    }
  };

  const deleteDetail = (id, type, index) => {
    setTrips(
      trips.map((trip) =>
        trip.id === id
          ? {
              ...trip,
              [type]: trip[type].filter((_, i) => i !== index),
            }
          : trip
      )
    );
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  return (
    <div className="card-trip-list-container">
      <h2>My Trips</h2>
      <div className="add-trip-form">
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={newTrip.destination}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="startDate"
          value={newTrip.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="endDate"
          value={newTrip.endDate}
          onChange={handleInputChange}
        />
        <button onClick={addTrip}>Add Trip</button>
      </div>
      <div className="trip-list">
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            <h3>{trip.destination}</h3>
            <p>
              <strong>Dates:</strong> {trip.startDate} to {trip.endDate}
            </p>

            <div className="details-section">
              <h4>Expenses:</h4>
              <ul>
                {trip.expenses.map((expense, index) => (
                  <li key={index}>
                    {expense}
                    <button onClick={() => editDetail(trip.id, "expenses", index)}>Edit</button>
                    <button onClick={() => deleteDetail(trip.id, "expenses", index)}>Delete</button>
                  </li>
                ))}
              </ul>
              <button onClick={() => addDetail(trip.id, "expenses")}>Add Expense</button>
            </div>

            <div className="details-section">
              <h4>Companions:</h4>
              <ul>
                {trip.companions.map((companion, index) => (
                  <li key={index}>
                    {companion}
                    <button onClick={() => editDetail(trip.id, "companions", index)}>Edit</button>
                    <button onClick={() => deleteDetail(trip.id, "companions", index)}>Delete</button>
                  </li>
                ))}
              </ul>
              <button onClick={() => addDetail(trip.id, "companions")}>Add Companion</button>
            </div>

            <button className="delete-trip-btn" onClick={() => deleteTrip(trip.id)}>
              Delete Trip
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripList;
