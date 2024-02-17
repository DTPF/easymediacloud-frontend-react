import { useReducer, useMemo, useCallback, memo } from 'react'
import LicensesContext from './LicensesContext'
import initialLicensesState from './initialLicensesState'
import licenseReducer from 'context/licenses/reducer/licenses.reducer'
import * as action from "context/licenses/reducer/licenses.actions"
import { ChildrenProps } from 'interfaces/global'
import { ILicenseState } from 'interfaces/license.interface'
import { useDauth } from 'dauth-context-react'

function LicensesProvider(props: ChildrenProps) {
	const [lState, dispatch] = useReducer(licenseReducer, initialLicensesState)
	const licensesState: ILicenseState = lState
	const { getAccessToken } = useDauth()

	const getLicenses = useCallback(() => {
		const token = getAccessToken()
		action.getLicensesAction(dispatch, token)
	}, [getAccessToken])

	const postLicense = useCallback(async () => {
		action.postLicenseAction(dispatch)
	}, [])

	const memoProvider = useMemo(
		() => ({
			...licensesState,
			getLicenses,
			postLicense,
		}), [
		licensesState,
		getLicenses,
		postLicense,
	])

	return (
		<LicensesContext.Provider value={memoProvider}>
			{props.children}
		</LicensesContext.Provider>
	)
}

export default memo(LicensesProvider)