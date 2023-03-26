// UserEvents.js
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { FirestoreDataConverter } from "firebase/firestore";
interface EventData {
  id: string;
  title: string;
  description: string;
  // Add other fields as needed
}
interface IProps {
  userId: string;
}

const eventDataConverter: FirestoreDataConverter<EventData> = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      // Add other fields as needed
    };
  },
  toFirestore: (event: EventData) => {
    const { id, ...data } = event;
    return data;
  },
};

const UserEvents: React.FC<IProps> = ({ userId }) => {
  const userRef = doc(firestore, "Users", userId);
  const eventsCollection = collection(firestore, "Events").withConverter(eventDataConverter);

  const eventsQuery = query(eventsCollection, where("host", "==", userRef));

  const [eventsSnapshot, loading, error] = useCollection<EventData>(eventsQuery);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const events = eventsSnapshot?.docs;

  if (events?.length === 0) {
    return <div>No events found</div>;
  }

  return (
    <div>
      <h2>User Events</h2>
      <ul>
        {events?.map((event) => {
          const data = event.data();
          return (
            <li key={data.id}>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
              {/* Add other event details here */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserEvents;
