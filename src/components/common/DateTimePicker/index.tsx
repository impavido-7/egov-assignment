import moment from "moment";

import { dateFormat, dateTimeLocalFormat } from "../../../modules/constants";

type DateTimePickerProps = {
  value?: Date;
  label: string;
  onDateTimeChange: (arg: Date) => void;
  isDatePicker?: boolean;
  min?: string;
};

const DateTimePicker = ({
  label,
  value,
  onDateTimeChange,
  min,
  isDatePicker = false,
}: DateTimePickerProps) => {
  const format = isDatePicker ? dateFormat : dateTimeLocalFormat;

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="mb-1">
          <label className="text-md"> {label} </label>
        </div>
        <div className="w-full sm:w-52">
          <input
            type={isDatePicker ? "date" : "datetime-local"}
            className="appearance-none border rounded shadow py-3 px-2 text-gray-500"
            value={value ? moment(value).format(format) : ""}
            onChange={(e) => {
              onDateTimeChange(new Date(e.target.value));
            }}
            min={min}
          />
        </div>
      </div>
    </>
  );
};

export default DateTimePicker;
