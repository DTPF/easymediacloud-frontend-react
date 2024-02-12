import { useReducer, useMemo, useEffect, memo, useCallback } from 'react'
import UserContext from './UserContext'
import initialUserState from './initialUserState'
import userReducer from 'context/user/reducer/user.reducer'
import * as action from "context/user/reducer/user.actions"
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react'
import { lastLoginLS } from './constants'
import { IUserState } from 'interfaces/user.interface'
import { useTranslation } from 'react-i18next'

function UserProvider(props: ChildrenProps) {
	const [ustate, dispatch] = useReducer(userReducer, initialUserState)
	const userState: IUserState = ustate
	const { isAuthenticated, user, getAccessTokenSilently, isLoading, loginWithRedirect, logout: logoutAuth0 } = useAuth0()
	const { i18n } = useTranslation()

	useEffect(() => {
		(async () => {
			if (isLoading) return
			if (!isAuthenticated) {
				const lastLogin = localStorage.getItem(lastLoginLS)
				if (lastLogin) {
					loginWithRedirect()
				}
				return
			}
			const token = await getAccessTokenSilently()
			if (token && user) {
				// console.log(token);
				action.loginAction({ dispatch, user, token })
			}
		})()
	}, [isAuthenticated, user, isLoading, getAccessTokenSilently, loginWithRedirect])

	useEffect(() => {
		if (isLoading) return
		(async () => {
			try {
				const lastLogin = localStorage.getItem(lastLoginLS)
				if (lastLogin) {
					const token = await getAccessTokenSilently()
					if (isAuthenticated && !userState.isLoading && (!userState.user.language || userState.user.language === undefined)) {
						return action.setLanguageAction({ dispatch, language: navigator.language.split('-')[0], token, i18n })
					}
				}
			} catch (err) {
				console.log(err);
			} finally {
				return action.setLanguageAction({ dispatch, language: userState.user.language, i18n })
			}
		})();
	}, [getAccessTokenSilently, i18n, isAuthenticated, isLoading, userState.isLoading, userState.user.language])

	const logout = useCallback(() => {
		localStorage.removeItem(lastLoginLS)
		logoutAuth0()
	}, [logoutAuth0])

	const setLanguage = useCallback(async ({ language }: { language: string }) => {
		if (isLoading) return
		if (isAuthenticated) {
			const token = await getAccessTokenSilently()
			action.setLanguageAction({ dispatch, language, token, i18n })
		} else {
			action.setLanguageAction({ dispatch, language, i18n })
		}
	}, [getAccessTokenSilently, i18n, isAuthenticated, isLoading])

	const memoProvider = useMemo(
		() => ({
			...userState,
			setLanguage,
			logout
		}), [
		userState,
		setLanguage,
		logout
	])

	return (
		<UserContext.Provider value={memoProvider}>
			{props.children}
		</UserContext.Provider>
	)
}

export default memo(UserProvider)