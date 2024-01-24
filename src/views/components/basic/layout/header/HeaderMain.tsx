import { NavLink } from "react-router-dom"
import MenuTopMain from 'views/components/basic/layout/menuTop/MenuTopMain'
import LoginIcon from 'views/components/basic/layout/loginIcon'
import './headerMain.scss'
import useWindowSizeReport from "hooks/useWindowSizeReport"
import { routes } from "router/paths"
import { memo } from "react"
import { PiFloppyDiskDuotone } from "react-icons/pi"

function HeaderMain() {
  const [isMobile] = useWindowSizeReport()
  return (
    <header className='header-main'>
      <NavLink to={routes.home} >
        <PiFloppyDiskDuotone className="header-main__logo" />
      </NavLink>
      {!isMobile && <MenuTopMain />}
      <LoginIcon />
    </header>
  )
}

export default memo(HeaderMain)