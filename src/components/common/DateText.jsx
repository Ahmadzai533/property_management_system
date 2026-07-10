// src/components/common/DateText.jsx
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useLocalization } from "../../hooks/useLocalization";

/**
 * DateText - Reusable date display component
 *
 * Uses your existing useLocalization().formatDate()
 * Handles null, undefined, empty strings, and invalid dates without crashing.
 *
 * @example
 * <DateText value={payment.date} />
 * <DateText value={agreement.startDate} format="short" />
 * <DateText value={null} fallback="Not set" />
 */
const DateText = ({
  value,
  format = "full",
  showTime = false,
  fallback = "",
  className = "",
  as: Component = "span",
  ...props
}) => {
  const { formatDate } = useLocalization();

  const formattedDate = useMemo(() => {
    // Handle null/undefined
    if (value === null || value === undefined) {
      return fallback;
    }

    // Handle empty string
    if (typeof value === "string" && value.trim() === "") {
      return fallback;
    }

    // Try to format the date
    try {
      const result = formatDate(value, { format, showTime });

      // If formatDate returns empty/falsy, use fallback
      if (!result) {
        return fallback;
      }

      return result;
    } catch (error) {
      // Invalid dates or any parsing errors
      return fallback;
    }
  }, [value, format, showTime, fallback, formatDate]);

  // Don't render anything if there's no content
  if (!formattedDate) {
    return null;
  }

  return (
    <Component
      className={className ? `date-text ${className}` : "date-text"}
      {...props}
    >
      {formattedDate}
    </Component>
  );
};

DateText.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  format: PropTypes.oneOf(["full", "short", "numeric"]),
  showTime: PropTypes.bool,
  fallback: PropTypes.string,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default DateText;
