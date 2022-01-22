import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { authSelector } from "../../Store/Auth/selectors";

export const RegisterResult = () => {
  const { registerEventLoading, error } = useSelector(authSelector);
  if (registerEventLoading) {
    return (
      <div className={"Result"}>
        <CircularProgress />
      </div>
    );
  } else if (error) {
    return (
      <div className={"Result"}>
        <div className={"Error"}>{error?.register}</div>
      </div>
    );
  } else return <div className={"Result"}> </div>; //думал возвращать сюда зеленую галочку при успешной регистрации
};
