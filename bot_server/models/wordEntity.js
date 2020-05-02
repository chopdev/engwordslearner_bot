class Word {
    constructor(eng, translations, examples) {
        this.eng = eng;
        this.translations = translations;
        this.examples = examples;
    }

    get eng() {
        if (this.eng == null || this.eng == '') {
            throw new Error('Word cannot be empty');
        }

        return this.eng;
    }

    get translations() {
        if (this.translations == null) {
            throw new Error('Translation cannot be empty');
        }

        if (Array.isArray(this.translations)) {
            return this.translations.join('; ');
        }

        return this.translations;
    }

    get examples() {
        if (this.examples == null) {
            return '';
        }

        if (Array.isArray(this.examples)) {
            return this.examples.join('\n');
        }

        return this.examples;
    }
}

exports.Word = Word;