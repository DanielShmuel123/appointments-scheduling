// EventCreationForm.js
import React, { useEffect, useState } from "react";
import { collection, addDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { DaySelection } from "./DaySelection";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormError } from "./FormError/FormError";

interface IProps {
  userId: string;
}

export type TDayTimes = { [key: string]: ITimeConfig };
interface IHoursAndMinutes {
  hours: string;
  minutes: string;
}
interface ITimeConfig {
  start: IHoursAndMinutes;
  end: IHoursAndMinutes;
  error?: string;
}
const getInitialTimes = () => {
  const times = {
    Monday: {
      start: { hours: "07", minutes: "00" },
      end: { hours: "19", minutes: "00" },
    },
    Tuesday: {
      start: { hours: "07", minutes: "00" },
      end: { hours: "19", minutes: "00" },
    },
    Wednesday: {
      start: { hours: "07", minutes: "00" },
      end: { hours: "19", minutes: "00" },
    },
    Thursday: {
      start: { hours: "07", minutes: "00" },
      end: { hours: "19", minutes: "00" },
    },
    Friday: {
      start: { hours: "07", minutes: "00" },
      end: { hours: "19", minutes: "00" },
    },
  };
  return times;
};

const EventCreationForm: React.FC<IProps> = ({ userId }) => {
  const [times, setTimes] = useState<TDayTimes>(getInitialTimes());
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      duration: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      duration: Yup.string().required("Required"),
      startTime: Yup.date().required("Required"),
      endTime: Yup.date()
        .required("Required")
        .test("is-greater", "End date must be greater than start date", function (value) {
          const { startTime } = this.parent;
          if (!startTime) {
            return true;
          }
          return value && value > startTime;
        }),
    }),
    onSubmit: async (values) => {
      const userRef = doc(firestore, "Users", userId);
      const { title, description, startTime, endTime, duration } = values;
      const eventData = {
        title,
        duration,
        description,
        host: userRef,
        timeConfig: times,
        startTime,
        endTime,
      };

      try {
        await addDoc(collection(firestore, "Events"), eventData);
        alert("Event created successfully");
      } catch (error) {
        alert("Error creating event: " + error);
      }
    },
  });
  const handleTimeInput = (day: string, key: "start" | "end") => {
    return (value: string, hOrM: "hours" | "minutes") => {
      setTimes((prevTimes: TDayTimes) => {
        const newTimes = structuredClone(prevTimes);
        newTimes[day][key][hOrM] = value;
        const endHour = parseInt(newTimes[day].end.hours);
        const endMin = parseInt(newTimes[day].end.minutes);
        const startHour = parseInt(newTimes[day].start.hours);
        const startMin = parseInt(newTimes[day].start.minutes);
        const startTotal = startHour * 60 + startMin;
        const endTotal = endHour * 60 + endMin;
        if (startTotal > endTotal) {
          newTimes[day].error = "End time must be later than start time";
        } else {
          delete newTimes[day].error;
        }
        return newTimes;
      });
    };
  };
  useEffect(() => {
    setTimes(getInitialTimes());
  }, [formik.values.duration]);

  const duration = formik.values.duration;

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" {...formik.getFieldProps("title")} />
          <FormError formik={formik} id={"title"} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" {...formik.getFieldProps("description")} />
          <FormError formik={formik} id={"description"} />
        </div>
        <div>
          <label htmlFor="startTime">Start Date</label>
          <input id="startTime" type="date" {...formik.getFieldProps("startTime")} />
          <FormError formik={formik} id={"startTime"} />
        </div>
        <div>
          <label htmlFor="endTime">End Date</label>
          <input id="endTime" type="date" {...formik.getFieldProps("endTime")} />
          <FormError formik={formik} id={"endTime"} />
        </div>
        <div>
          <label htmlFor="duration">Select duration in minutes</label>
          <select id="duration" {...formik.getFieldProps("duration")}>
            <option value="" disabled>
              Select duration
            </option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="60">60</option>
          </select>
          <FormError formik={formik} id={"duration"} />
        </div>
        {duration && <DaySelection duration={duration} handleTimeInput={handleTimeInput} times={times} />}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreationForm;
