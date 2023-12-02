// import { useState } from "react";
// import useAuth from "./useAuth";
// import { useEffect } from "react";
// import { getRole } from "../Api/auth";

// const useRole = () => {
//   const { user } = useAuth();
//   const [role, setRole] = useState("");
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(true);
//     getRole(user?.email).then((data) => {
//       setLoading(false);
//       setRole(data);
//     });
//   }, [user]);
//   return [role, loading];
// };

// export default useRole;

import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getRole } from "../Api/auth";

const useRole = () => {
  const { user, loading } = useAuth();
  const { data: role, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryFn: async () => await getRole(user?.email),
    queryKey: ["role"],
  });

  return [role, isLoading];
};

export default useRole;
