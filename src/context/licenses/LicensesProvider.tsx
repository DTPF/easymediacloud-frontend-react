import { useReducer, useMemo, useCallback, memo } from 'react'
import LicensesContext from './LicensesContext'
import initialLicensesState from './initialLicensesState'
import licenseReducer from 'context/licenses/reducer/licenses.reducer'
import * as action from "context/licenses/reducer/licenses.actions"
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react'

function LicensesProvider(props: ChildrenProps) {
	const [licensesState, dispatch] = useReducer(licenseReducer, initialLicensesState)
	const { getAccessTokenSilently } = useAuth0()

	const getLicenses = useCallback(async () => {
		const token = await getAccessTokenSilently()
		action.getLicensesAction(dispatch, token)
	}, [getAccessTokenSilently])

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