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

	const getLicenses = useCallback(async () => {
		const token = await getAccessToken()
		action.getLicensesAction(dispatch, token)
	}, [getAccessToken])

	const postLicense = useCallback(async ({ projectName }: { projectName: string }) => {
		const token = await getAccessToken()
		action.postLicenseAction(dispatch, projectName, token)
	}, [getAccessToken])

	const setLicenseOnline = useCallback(async ({ licenseId, online }: { licenseId: string, online: boolean }) => {
		const token = await getAccessToken()
		action.setLicenseOnlineAction(dispatch, licenseId, online, token)
	}, [getAccessToken])

	const deleteLicense = useCallback(async ({ licenseId }: { licenseId: string }) => {
		const token = await getAccessToken()
		action.deleteLicenseAction(dispatch, licenseId, token)
	}, [getAccessToken])

	const memoProvider = useMemo(
		() => ({
			...licensesState,
			getLicenses,
			postLicense,
			setLicenseOnline,
			deleteLicense
		}), [
		licensesState,
		getLicenses,
		postLicense,
		setLicenseOnline,
		deleteLicense
	])

	return (
		<LicensesContext.Provider value={memoProvider}>
			{props.children}
		</LicensesContext.Provider>
	)
}

export default memo(LicensesProvider)