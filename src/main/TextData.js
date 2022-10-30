

class TextData {
    constructor(lang = 0) {
        this.lang = lang > 1 ? 1 : lang;
        this.lang = lang < 0 ? 0 : lang;
        this.data = {
            menu: {
                about: ["ABOUT ME", "ОБО МНЕ"],
                socials: ["SOCIALS", "МОИ СОЦСЕТИ"],
                contact: ["CONTACT ME", "НАПИСАТЬ МНЕ"],
                gallery: ["GALLERY", "ГАЛЕРЕЯ"],
            }
        };
    }

    /* this will switch language data to the opposite */
    switch() {
        if (this.lang === 0)
            this.lang = 1;
        else
            this.lang = 0;
    }

    menuAboutMe() {
        return this.data.menu.about[this.lang];
    }
    menuSocials() {
        return this.data.menu.socials[this.lang];
    }
    menuContact() {
        return this.data.menu.contact[this.lang];
    }
    menuGallery() {
        return this.data.menu.gallery[this.lang];
    }
}

let textData = new TextData();

export default textData;