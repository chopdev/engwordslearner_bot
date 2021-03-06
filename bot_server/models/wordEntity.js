class Word {
    constructor(eng, translations, examples, synonyms) {
        if (eng == null || eng == '') {
            throw new Error('Word cannot be empty');
        }
        if (translations == null) {
            throw new Error('Translation cannot be empty');
        }

        this._eng = eng;
        this._translations = translations;
        this._examples = examples;
        this._synonyms = synonyms;
    }

    get eng() {
        return this._eng;
    }

    get translations() {
        if (Array.isArray(this._translations)) {
            return this._translations.join('; ');
        }

        return this._translations;
    }

    get examples() {
        if (this._examples == null) {
            return '';
        }

        if (Array.isArray(this._examples)) {
            return this._examples.join('\n');
        }

        return this._examples;
    }

    get synonyms() {
        if (this._synonyms == null) {
            return '';
        }

        if (Array.isArray(this._synonyms)) {
            return this._synonyms.join(', ');
        }

        return this._synonyms;
    }
}

exports.Word = Word;