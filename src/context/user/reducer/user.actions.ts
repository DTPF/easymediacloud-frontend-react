import * as RecipeTypes from './user.types'
import { registerLoginUserAPI, updateUserAPI } from 'api/user.api';
import { englishLanguage, lastLoginLS } from 'context/user/constants';
import { messageError, messageWarning } from 'views/components/UI/messages';
import { IAuth0User, IUser } from 'interfaces/user.interface';

type LoginType = { dispatch: any, user: IAuth0User, token: string }
export async function loginAction({ dispatch, user, token }: LoginType) {
	dispatch({ type: RecipeTypes.SET_IS_LOADING, payload: { isLoading: true } })
	try {
		const loginFetch = await registerLoginUserAPI(user, token)
		if (loginFetch.response.status === 200 || loginFetch.response.status === 201) {
			localStorage.setItem(lastLoginLS, Date.now().toString())
			return dispatch({
				type: RecipeTypes.LOGIN,
				payload: {
					user: loginFetch.data.user as IUser
				}
			})
		} else {
			messageWarning({ msg: 'Authentication failed' })
		}
	} catch (err) {
		messageError({ msg: 'Server error' })
	} finally {
		dispatch({ type: RecipeTypes.SET_IS_LOADING, payload: { isLoading: false } })
	}
}

type SetLanguageType = { dispatch: any, language: string, token?: string, i18n: any }
export async function setLanguageAction({ dispatch, language, token, i18n }: SetLanguageType) {
	if (!token) {
		i18n.changeLanguage(language || englishLanguage)
		document.documentElement.setAttribute("lang", language || englishLanguage)
		return dispatch({
			type: RecipeTypes.UPDATE_PARTIAL_USER,
			payload: {
				key: 'language',
				value: language || englishLanguage
			}
		})
	}
	try {
		const updateUserFetch = await updateUserAPI({ language: language }, token)
		if (updateUserFetch.response.status === 200) {
			i18n.changeLanguage(language)
			document.documentElement.setAttribute("lang", language)
			return dispatch({
				type: RecipeTypes.UPDATE_PARTIAL_USER,
				payload: {
					key: 'language',
					value: language
				}
			})
		} else {
			messageError({ msg: 'Error al actualizar el idioma' })
		}
	} catch (err) {
		messageError({ msg: 'Server error' })
	}
}