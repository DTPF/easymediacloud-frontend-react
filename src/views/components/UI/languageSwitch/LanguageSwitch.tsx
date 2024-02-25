import './languageSwitch.scss';
import English from "assets/img/English.webp";
import Spanish from "assets/img/Spanish.webp";
import { useDauth } from "dauth-context-react";
import Tooltip from '../tooltip/Tooltip';
import moment from 'moment';

const languages = [
  {
    code: "en",
    label: {
      es: "Inglés",
      en: "English"
    },
    img: English
  },
  {
    code: "es",
    label: {
      es: "Español",
      en: "Spanish"
    },
    img: Spanish
  },
];

const LanguageSwitch = () => {
  const { user, updateUser } = useDauth()
  moment.locale(user.language)
  return (
    <div className="language-switcher">
      <div className="language-switcher__section">
        {languages.map((lng, i) => {
          const { code, label, img } = lng;
          return (
            <div key={i} className="language-switcher__section--container">
              <Tooltip title={user.language === 'es' ? label.es : label.en}>
                <button
                  onClick={() => updateUser({ language: code })}
                  className="language-switcher__section--container__btn"
                >
                  <img
                    src={img}
                    alt={code === 'es' ? label.es : label.en}
                    className={user.language === code ? "language-switcher__section--container__btn--imgActive" : "language-switcher__section--container__btn--img"}
                  />
                </button>
              </Tooltip>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LanguageSwitch;

