export async function getAllEvents() {
  let eventsJson;
  let formatData = [];
  try {
    const events = await fetch(
      "https://nextapp-events-default-rtdb.firebaseio.com/events.json"
    );
    eventsJson = await events.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error occcur while fetching data in firebase.");
  }

  for (const key in eventsJson) {
    formatData.push(eventsJson[key]);
  }

  return formatData;
}

export async function getFeaturedEvents() {
  return (await getAllEvents()).filter((event) => event.isFeatured);
}

export async function getEventById(eventId) {
  const allEvents = await getAllEvents();
  const event = await allEvents.find((event) => event.id === eventId);
  return event;
}

export async function getFiltredEvents(dataFilter) {
  const { year, month } = dataFilter;

  let allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() == year && eventDate.getMonth() == month - 1;
  });

  return filteredEvents;
}

export async function getAllEventsIDs() {
  const allEvents = await getAllEvents();
  return allEvents.map((event) => event.id);
}
