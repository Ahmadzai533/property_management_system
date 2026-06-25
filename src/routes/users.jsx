import { Routes, Route } from "react-router-dom";
import Users from "../pages/Users";

export const UsersRoute = () => {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="list" element={<Users />} />
      <Route path="roles" element={<Users />} />
      <Route path="history" element={<Users />} />
      <Route path="*" element={<Users />} />
    </Routes>
  );
};
