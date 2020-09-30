const path = require('path');
const xlsx = require('xlsx');
const { Word } = require("../models/wordEntity");

const rowSeparator = '\n\n';
const fieldSeparator = ';;';
const cyrillicPattern = /[а-яА-ЯЁё]/;

function getWordsFromExcel(filePath = path.join(__dirname, '/tmp/WORDS.xlsx')) {
    
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const csvOptions = {
        FS: fieldSeparator,
        RS: rowSeparator,
        strip: true,
        blankrows: false,
        skipHidden: true,
        forceQuotes: false
    };
    const data = xlsx.utils.sheet_to_csv(workbook.Sheets[sheet_name_list[0]], csvOptions);

    return parseToWords(data);
}

function parseToWords(data) {
    const words = [];

    const rows = data.split(rowSeparator);

    for (const row of rows) {
        if (isNullOrEmpty(row))
            continue;

        const columns = row.split(fieldSeparator);
        let word = columns[0];
        let translation = columns[1];
        let synonyms = columns[2];
        let examples = columns[3];
        if (cyrillicPattern.test(word)) {
            const temp = word;
            word = translation;
            translation = temp;
        }

        word = word.trim();
        translation = split(translation, ',');
        examples = split(examples, '\n');
        synonyms = split(synonyms, ",");

        if (isNullOrEmpty(word) || isNullOrEmpty(translation)) {
            console.warn("INCORRECT WORD")
        }

        words.push(new Word(word, translation, examples, synonyms));
    }

    return words;
}

function isNullOrEmpty(str) {
    return str == null || str == '';
}

function split(str, separator) {
    if (isNullOrEmpty(str)) 
        return null;

    return str.replace(/"/g,"").split(separator).map(x => x.trim());
}

function capitalizeStr(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

exports.getWordsFromExcel = getWordsFromExcel;
