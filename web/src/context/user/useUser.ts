import { useContext } from "react";
import { UserContext } from "./Provider";

const useUser = () => {
  const userContext = useContext(UserContext);

  if (userContext === undefined) {
    throw new Error("User context is undefined");
  }

  return userContext;
};

export default useUser;
