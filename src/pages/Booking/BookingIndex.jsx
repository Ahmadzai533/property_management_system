import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingIndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/bookings/list", { replace: true });
  }, [navigate]);

  return null;
};

export default BookingIndexPage;