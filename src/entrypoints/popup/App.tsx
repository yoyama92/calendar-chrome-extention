import { formatDate } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ja } from "react-day-picker/locale";
import { ja as dateFnsJa } from "date-fns/locale";

function App() {
  const today = new Date();
  const [month, setMonth] = useState(today);
  return (
    <div className="card card-border w-[275px]">
      <div className="card-body p-0">
        <button
          className="btn btn-sm btn-ghost justify-start w-fit"
          onClick={() => setMonth(today)}
        >
          {formatDate(today, "M月dd日（E）", {
            locale: dateFnsJa,
          })}
        </button>
        <div className="flex justify-center">
          <DayPicker
            className="react-day-picker"
            mode="single"
            showOutsideDays={true}
            fixedWeeks={true}
            locale={ja}
            month={month}
            onMonthChange={setMonth}
            formatters={{
              formatCaption: (date, options) =>
                formatDate(date, "yyyy年M月", options),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
