import { useCookies } from "react-cookie";

const useGetToken = () => {
  const [cookies, _] = useCookies(["access_token"]);
  return { headers: { authorization: cookies.access_token } };
};

export default useGetToken;
