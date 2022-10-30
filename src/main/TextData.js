

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
            },
            aboutDialog: {
                title: ["ABOUT ME", "ОБО МНЕ"],
                name: ["HI, MY NAME IS", "ПРИВЕТ, МЕНЯ ЗОВУТ"],
                main: [
                    "I'M A PROFESSIONAL PHOTOGRAPHER AND VIDEO EDITOR." +
                    "I TRAVEL AROUND THE WORLD AND CAPTURE MOMENTS TO SHARE WITH EVERYONE",

                    "Я ПРОФЕССИОНАЛЬНЫЙ ФОТОГРАФ И ВИДЕО ОПЕРАТОР. Я ПУТЕШЕСТВУЮ ПО ВСЕМУ МИРУ," +
                    " ЧТОБЫ СОБРАТЬ КОЛЛЕКЦИЮ САМЫХ ЛУЧШИХ МОМЕНТОВ"
                ],
                writeMeButton: ["WRITE ME", "НАПИСАТЬ МНЕ"],
                bottomLine: ["Or, You can also find me here", "Вы также можете найти меня здесь"]
            },
            helloScreen: {

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


    aboutDialogTitle() {
        return this.data.aboutDialog.title[this.lang];
    }
    aboutDialogName() {
        return this.data.aboutDialog.name[this.lang];
    }
    aboutDialogMain() {
        return this.data.aboutDialog.main[this.lang];
    }
    aboutDialogWriteMeButton() {
        return this.data.aboutDialog.writeMeButton[this.lang];
    }
    aboutDialogBottomLine() {
        return this.data.aboutDialog.bottomLine[this.lang];
    }
}

let textData = new TextData();

export default textData;