import { createContext } from "react"

export const AppContext = createContext()

const AppContextProvider = ( props )=>{

  const currency = '$'  

const calculateAge = (dob) => {
  if (!dob) return "N/A";

  const birthDate = new Date(dob);

  if (Number.isNaN(birthDate.getTime())) return "N/A";

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 0 ? age : "N/A";
};



const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

    const value = {
        calculateAge,
        dateFormat,
        currency,
    }
    return(
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
