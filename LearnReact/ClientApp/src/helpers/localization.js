const LOCALIZATION_LANG = 'LOCALIZATION_LANG';
const PERSIAN = 'fa-ir';
const ENGLISH = 'en-us';

const getLocalization = () => {
    const lang = localStorage.getItem(LOCALIZATION_LANG);

    return lang == null ? PERSIAN : lang;
}

export const isRTL = () => getLocalization() === PERSIAN;

const setLocalization = (lang) => {
    localStorage.setItem(LOCALIZATION_LANG, lang);
    window.location.reload();
}

export const switchLanguage = () => setLocalization(isRTL() ? ENGLISH : PERSIAN);

const localization = {
    switchLanguage,
    isRTL
};

export default localization;