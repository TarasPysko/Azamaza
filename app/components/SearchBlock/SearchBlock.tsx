"use client";

import { useState, useRef, forwardRef, useEffect } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      {...props}
      ref={ref}
      className="font-sans min-w-0 flex-1 w-full bg-transparent px-[8px] text-[16px] font-normal leading-5 tracking-normal text-[#4A5565] placeholder:text-[#4A5565] outline-none"
      style={{ maxWidth: "100%" }}
    />
  )
);
DateInput.displayName = "DateInput";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  rating: number;
}

const SERVICE_TYPES = [
  "Hotel",
  "Restaurant",
  "Meeting Room",
  "Taxi",
  "Event",
  "Rental",
] as const;

export function SearchBlock() {
  const [destination, setDestination] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const el = event.target as HTMLElement;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(target) &&
        !el.closest(".react-datepicker")
      ) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDropdownOpen || isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, isDatePickerOpen]);

  const validateForm = (): string | null => {
    if (!destination.trim()) {
      return "Destination is required";
    }
    if (!serviceType.trim()) {
      return "Service type is required";
    }
    if (!selectedDate) {
      return "Date is required";
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);
    if (selected < today) {
      return "Date must be today or in the future";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: destination.trim(),
          serviceType: serviceType.trim(),
          date: selectedDate?.toISOString().split("T")[0] || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        className="min-w-0 rounded-[16px] bg-[#006CE4] p-2 mt-4"
        aria-label="Search"
      >
        <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-2">
          <label className="flex h-[42px] items-center rounded-lg bg-white px-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src="/location.svg"
                alt=""
                width={18}
                height={24}
                className="shrink-0"
              />
            </span>
            <input
              type="text"
              placeholder="Destination, city, address"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setError(null);
              }}
              className="font-sans min-w-0 flex-1 bg-transparent px-[8px] text-[16px] font-normal leading-5 tracking-normal text-[#4A5565] placeholder:text-[#4A5565] outline-none"
            />
            {destination && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                <button
                  type="button"
                  onClick={() => setDestination("")}
                  className="flex h-full w-full items-center justify-center touch-manipulation"
                  aria-label="Clear"
                >
                  <Image
                    src="/cross.svg"
                    alt=""
                    width={11}
                    height={11}
                    className="h-[10.5px] w-[10.5px] shrink-0"
                  />
                </button>
              </span>
            )}
          </label>

          <div
            ref={dropdownRef}
            className="min-w-0 overflow-hidden rounded-lg bg-white transition-[height] duration-300 ease-in-out"
            style={{ height: isDropdownOpen ? "200px" : "42px" }}
          >
            <div
              className="flex h-[42px] shrink-0 cursor-pointer items-center px-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                <Image
                  src="/search.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="shrink-0"
                />
              </span>
              <input
                type="text"
                placeholder="A service, a meeting, an offer"
                value={serviceType}
                readOnly
                className="font-sans min-w-0 flex-1 cursor-pointer bg-transparent px-[8px] text-[16px] font-normal leading-5 tracking-normal text-[#4A5565] placeholder:text-[#4A5565] outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                <Image
                  src="/arrow.svg"
                  alt=""
                  width={17}
                  height={11}
                  className={`shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </div>
            <div className="h-[158px] min-h-0 overflow-y-auto">
              {SERVICE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setServiceType(type);
                    setIsDropdownOpen(false);
                    setError(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-[#4A5565] hover:bg-gray-100 transition-colors"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={datePickerRef}
            className="flex h-[42px] cursor-pointer items-center rounded-lg bg-white px-2"
            onClick={() => {
              setIsDatePickerOpen(true);
              setTimeout(() => {
                dateInputRef.current?.click();
              }, 0);
            }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center pointer-events-none">
              <Image
                src="/calendar.svg"
                alt=""
                width={24}
                height={24}
                className="shrink-0"
              />
            </span>
            <div className="flex-1 min-w-0 overflow-visible">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => {
                  setSelectedDate(date);
                  setError(null);
                  setIsDatePickerOpen(false);
                }}
                onCalendarClose={() => setIsDatePickerOpen(false)}
                open={isDatePickerOpen}
                placeholderText="Date of use of the service"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                filterDate={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const checkDate = new Date(date);
                  checkDate.setHours(0, 0, 0, 0);
                  return checkDate >= today;
                }}
                wrapperClassName="w-full"
                calendarClassName="!rounded-lg"
                popperClassName="!z-[100]"
                customInput={<DateInput ref={dateInputRef} />}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex h-10 w-full items-center justify-center rounded-full bg-[#F1D246] font-sans text-sm font-semibold leading-5 tracking-normal text-[#364153] transition-colors hover:bg-[#e5c63e] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      {results && results.length > 0 && (
        <div className="mt-4 space-y-3">
          <h2 className="font-onest text-lg font-semibold text-[#151414]">
            Search Results
          </h2>
          {results.map((result) => (
            <div
              key={result.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <h3 className="font-onest text-base font-semibold text-[#151414]">
                {result.title}
              </h3>
              <p className="font-onest mt-1 text-sm text-[#4A5565]">
                {result.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-onest text-sm text-[#4A5565]">
                  {result.location}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-onest text-sm font-semibold text-[#006CE4]">
                    {result.price}
                  </span>
                  <span className="font-onest text-sm text-[#4A5565]">
                    ⭐ {result.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
