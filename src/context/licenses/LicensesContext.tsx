import { createContext } from "react"
import initialLicenseState from "./initialLicensesState"
const LicensesContext = createContext(initialLicenseState)

export default LicensesContext