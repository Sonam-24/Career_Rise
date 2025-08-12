import { useEffect, useState } from "react";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const JobFilterMenu = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const jobFilters = [
    {
      type: "Location",
      values: ["Noida", "Gurugram", "Mumbai", "Pune", "Bangalore"],
      searchValue: ["noida", "gurugram", "mumbai", "pune", "bangalore"],
    },
    {
      type: "Job Role",
      values: [
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "UI/UX Designer",
      ],
      searchValues: [
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "UI/UX Designer",
      ],
    },
  ];

  // Fix: dispatch the actual new value, not old selectedValue
  const handleRadioChange = (value) => {
    setSelectedValue(value);
    dispatch(setSearchQuery(value));
  };

  const clearFilters = () => {
    setSelectedValue("");
    dispatch(setSearchQuery(""));
  };

  // Optional: you can keep or remove this useEffect, since you already dispatch in handleRadioChange
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <>
      <div className="my-10 max-sm:hidden">
        <h1 className="font-bold text-2xl text-center">Filter Jobs</h1>
        <hr className="my-2 border-2" />
        <div className="w-full flex items-center justify-end">
          <Button variant="link" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
        {jobFilters.map((data, index) => (
          <div key={index} className="my-5">
            <h1 className="text-xl font-bold p-2">{data.type}</h1>
            <RadioGroup
              className="flex flex-col gap-3 pl-6"
              value={selectedValue}
              onValueChange={handleRadioChange}
            >
              {data.values.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <RadioGroupItem id={item} value={item} />
                  <Label htmlFor={item} className="cursor-pointer text-base">
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>

      {/* for small devices */}
      <div className="sm:hidden">
        <Popover>
          {/* Fix here: add asChild to avoid nested buttons */}
          <PopoverTrigger asChild>
            <Button className="bg-cyan-500 hover:bg-cyan-700 mx-2">
              Filter Jobs
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {jobFilters.map((data, index) => (
              <div key={index}>
                <h1 className="text-xl font-bold p-2">{data.type}</h1>
                <RadioGroup
                  className="flex flex-col gap-2 pl-5"
                  value={selectedValue}
                  onValueChange={handleRadioChange}
                >
                  {data.values.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <RadioGroupItem id={item} value={item} />
                      <Label
                        htmlFor={item}
                        className="cursor-pointer text-base"
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default JobFilterMenu;
