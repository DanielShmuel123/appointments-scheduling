import React from "react";

interface IProps {
  duration: string;
  handleTimeInput: any;
  hour: string;
  minute: string;
}

const minutesConfig: { [key: string]: string[] } = {
  15: ["00", "15", "30", "45"],
  30: ["00", "30"],
};
export const TimeInput: React.FC<IProps> = ({ duration, hour, minute, handleTimeInput }) => {
  const hours = Array.from({ length: 13 }, (_, i) => (i + 7).toString().padStart(2, "0"));
  const minutes = minutesConfig[duration];
  const canSelectMinutes = duration !== "60";
  return (
    <span>
      <select id="hour-input" name="hour" value={hour} onChange={(e) => handleTimeInput(e.target.value, "hours")}>
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span>:</span>
      {canSelectMinutes && (
        <select id="minute-input" name="minute" value={minute} onChange={(e) => handleTimeInput(e.target.value, "minutes")}>
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      )}
      {!canSelectMinutes && <span>00</span>}
    </span>
  );
};
