import { useContext } from "react";
import './languageSwitch.scss';
import UserContext from "context/user/UserContext";
import English from "assets/img/English.webp";
import Spanish from "assets/img/Spanish.webp";

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
  const { user, setLanguage } = useContext(UserContext)
  return (
    <div className="language-switcher">
      <div className="language-switcher__section">
        {languages.map((lng, i) => {
          const { code, label, img } = lng;
          return (
            <div key={i} className="language-switcher__section--container">
              <button onClick={() => setLanguage({ language: code })} className="language-switcher__section--container__btn">
                <img
                  src={img}
                  alt={code === 'es' ? label.es : label.en}
                  className={user.language === code ? "language-switcher__section--container__btn--imgActive" : "language-switcher__section--container__btn--img"}
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LanguageSwitch;

