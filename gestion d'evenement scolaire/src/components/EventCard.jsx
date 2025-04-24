const EventCard = ({ event }) => {
    return (
      <div className="event-card">
        <h3>{event.title}</h3>
        <p>Date: {event.date}</p>
        <p>Lieu: {event.location}</p>
      </div>
    );
  };
  
  export default EventCard;
  