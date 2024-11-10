import { memo } from 'react';
import Tooltip from 'views/components/UI/tooltip';
import { Spin } from 'antd';
import { bgMedium, bgSecondary, colorRed } from 'scss/_variables';
import { FaDotCircle, FaDownload, FaEye, FaRegSave, FaRegUser, FaShareAlt } from 'react-icons/fa';
import { RiCloseLargeFill } from 'react-icons/ri';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { ImHome } from 'react-icons/im';
import { FaRegTrashCan } from 'react-icons/fa6';
import { GrStatusGoodSmall, GrUpdate } from 'react-icons/gr';
import { VscInbox } from 'react-icons/vsc';

type TIconProps = {
  type:
    | 'user'
    | 'downCircle'
    | 'close'
    | 'upload'
    | 'home'
    | 'save'
    | 'donutCircle'
    | 'trash'
    | 'dot'
    | 'update'
    | 'eye'
    | 'download'
    | 'share'
    | 'inbox';
  iconType?: 'primary' | 'secondary' | 'danger';
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  fontSize?: string;
  margin?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginRight?: number | string;
  marginLeft?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  tooltip?: string;
  isLoading?: boolean;
  light?: boolean;
  onClick?: () => void;
};

const getIconComponent = (type: TIconProps['type']) => {
  switch (type) {
    case 'user':
      return FaRegUser;
    case 'close':
      return RiCloseLargeFill;
    case 'downCircle':
      return IoCaretDownCircleOutline;
    case 'upload':
      return PiUploadSimpleBold;
    case 'home':
      return ImHome;
    case 'save':
      return FaRegSave;
    case 'donutCircle':
      return FaDotCircle;
    case 'trash':
      return FaRegTrashCan;
    case 'dot':
      return GrStatusGoodSmall;
    case 'update':
      return GrUpdate;
    case 'eye':
      return FaEye;
    case 'download':
      return FaDownload;
    case 'share':
      return FaShareAlt;
    case 'inbox':
      return VscInbox;
    default:
      return null;
  }
};

const getColorByType = (iconType: TIconProps['iconType'], color: string | undefined, light: boolean) => {
  let colorByType;
  switch (iconType) {
    case 'primary':
      colorByType = bgMedium;
      break;
    case 'secondary':
      colorByType = bgSecondary;
      break;
    case 'danger':
      colorByType = colorRed;
      break;
    default:
      colorByType = color;
  }
  return light ? '#fff' : color ? color : colorByType;
};

function Icon({
  type,
  iconType = 'primary',
  className,
  style,
  color,
  fontSize = '1.2rem',
  margin,
  marginTop = 0,
  marginBottom = 0,
  marginRight = 0,
  marginLeft = 0,
  padding = 0,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  tooltip = '',
  isLoading = false,
  light = false,
  onClick,
}: TIconProps) {
  const IconComponent = getIconComponent(type);
  color = getColorByType(iconType, color, light);

  const defaultStyles = {
    fontSize: fontSize,
    color: color,
    margin: margin,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginRight: marginRight,
    marginLeft: marginLeft,
    padding: padding,
    paddingTop: paddingTop,
    paddingBottom: paddingBottom,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
    cursor: 'pointer',
  };

  return (
    IconComponent &&
    (tooltip ? (
      <Tooltip title={tooltip}>
        {isLoading ? (
          <Spin />
        ) : (
          <IconComponent style={{ ...defaultStyles, ...style }} className={className} onClick={onClick} />
        )}
      </Tooltip>
    ) : isLoading ? (
      <Spin />
    ) : (
      <IconComponent style={{ ...defaultStyles, ...style }} className={className} onClick={onClick} />
    ))
  );
}

export default memo(Icon);
