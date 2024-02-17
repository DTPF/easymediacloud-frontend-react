import './myLicenses.scss'
import { useContext, useEffect } from 'react';
import LicensesContext from 'context/licenses/LicensesContext';
import Licenses from './licenses';
import Spin from 'views/components/UI/spin/Spin';
import { useDauth } from 'dauth-context-react';

function MyLicenses() {
  const { licenses, getLicenses } = useContext(LicensesContext)
  const { isLoading: isLoadingAuth0 } = useDauth()

  useEffect(() => {
    let isMounted = true
    if (isMounted && !licenses[0]?._id) {
      getLicenses()
    }
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='my-licenses'>
      <h2>Mis Licencias</h2>
      {isLoadingAuth0 ? (
        <Spin />
      ) : (
        <Licenses />
      )}
    </div>
  )
}

export default MyLicenses