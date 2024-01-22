import { useReducer, useMemo, useCallback, memo } from 'react'
import LicensesContext from './LicensesContext'
import initialLicensesState from './initialLicensesState'
import licenseReducer from 'context/licenses/reducer/licenses.reducer'
import * as action from "context/licenses/reducer/licenses.actions"
import { ChildrenProps } from 'interfaces/global'

function LicensesProvider(props: ChildrenProps) {
	const [licensesState, dispatch] = useReducer(licenseReducer, initialLicensesState)

	const postLicense = useCallback(async () => {
		action.postLicenseAction(dispatch)
	}, [])

	const memoProvider = useMemo(
		() => ({
			...licensesState,
			postLicense,
		}), [
		licensesState,
		postLicense,
	])

	return (
		<LicensesContext.Provider value={memoProvider}>
			{props.children}
		</LicensesContext.Provider>
	)
}

export default memo(LicensesProvider)