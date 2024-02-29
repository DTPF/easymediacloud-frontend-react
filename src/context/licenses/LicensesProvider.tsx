import { useReducer, useMemo, useCallback, memo } from 'react'
import LicensesContext from './LicensesContext'
import initialLicensesState from './initialLicensesState'
import licenseReducer from 'context/licenses/reducer/licenses.reducer'
import * as action from "context/licenses/reducer/licenses.actions"
import { ChildrenProps } from 'interfaces/global'
import { ILicenseState } from 'interfaces/license.interface'
import { useDauth } from 'dauth-context-react'
import { useTranslation } from 'react-i18next'

function LicensesProvider(props: ChildrenProps) {
	const [lState, dispatch] = useReducer(licenseReducer, initialLicensesState)
	const licensesState: ILicenseState = lState
	const { getAccessToken } = useDauth()
	const { t: translate } = useTranslation()

	const getLicenses = useCallback(async () => {
		const token = await getAccessToken()
		action.getLicensesAction(dispatch, token, translate)
	}, [getAccessToken, translate])

	const postLicense = useCallback(async ({ projectName }: { projectName: string }) => {
		const token = await getAccessToken()
		action.postLicenseAction(dispatch, projectName, token, translate)
	}, [getAccessToken, translate])

	const setLicenseOnline = useCallback(async ({ licenseId, online }: { licenseId: string, online: boolean }) => {
		const token = await getAccessToken()
		action.setLicenseOnlineAction(dispatch, licenseId, online, token, translate)
	}, [getAccessToken, translate])

	const deleteLicense = useCallback(async ({ licenseId }: { licenseId: string }) => {
		const token = await getAccessToken()
		action.deleteLicenseAction(dispatch, licenseId, token, translate)
	}, [getAccessToken, translate])

	const getLicenseToken = useCallback(async ({ licenseId }: { licenseId: string }) => {
		const token = await getAccessToken()
		action.getLicenseTokenAction(licenseId, token, translate)
	}, [getAccessToken, translate])

	const refreshLicenseToken = useCallback(async ({ licenseId }: { licenseId: string }) => {
		const token = await getAccessToken()
		action.refreshLicenseTokenAction(licenseId, token, translate)
	}, [getAccessToken, translate])

	const memoProvider = useMemo(
		() => ({
			...licensesState,
			getLicenses,
			postLicense,
			setLicenseOnline,
			deleteLicense,
			getLicenseToken,
			refreshLicenseToken
		}), [
		licensesState,
		getLicenses,
		postLicense,
		setLicenseOnline,
		deleteLicense,
		getLicenseToken,
		refreshLicenseToken
	])

	return (
		<LicensesContext.Provider value={memoProvider}>
			{props.children}
		</LicensesContext.Provider>
	)
}

export default memo(LicensesProvider)