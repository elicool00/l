import en from "../Lang/en.json"
import fr from "../Lang/fr.json"

export function getLang(){
    if(!localStorage.getItem('lang')){
        localStorage.setItem('lang', "en")
        return "en"
    }
    return localStorage.getItem('lang')
}

export function setLang(lang){
    localStorage.setItem('lang', lang)
}

export function t(key){
    var to = getLang()
    if(to === "en"){
        return en[key]
    }
    if(to === 'fr'){
        return fr[key]
    }
}
