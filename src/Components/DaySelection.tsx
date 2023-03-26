import { TDayTimes } from "./EventCreation";
import { TimeInput } from "./TimeInput";

interface IProps {
  duration: string;
  times: TDayTimes;
  handleTimeInput(day: string, key: string): void;
}

export const DaySelection: React.FC<IProps> = ({ duration, times, handleTimeInput }) => {
  const days = Object.keys(times);
  return (
    <div>
      {days.map((day) => {
        const error = times[day].error;
        return (
          <div key={day}>
            <p>{day}</p>
            <TimeInput
              duration={duration}
              handleTimeInput={handleTimeInput(day, "start")}
              hour={times[day].start.hours}
              minute={times[day].start.minutes}
            />
            <span>-</span>
            <TimeInput
              duration={duration}
              handleTimeInput={handleTimeInput(day, "end")}
              hour={times[day].end.hours}
              minute={times[day].end.minutes}
            />
            {error && <p>{error}</p>}
          </div>
        );
      })}
    </div>
  );
};
