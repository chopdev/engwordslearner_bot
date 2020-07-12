const { Word } = require("../models/wordEntity");
const fs = require('fs');
const path = require('path');

const BIG_DASH = '—', SMALL_DASH = '-';

function getWordsFromFile(filePath = path.join(__dirname, 'WORDS.txt')) {
    let wordEntities = [];

    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    
    // http://jrgraphix.net/r/Unicode/0400-04FF      /^[\u0400-\u04FF]+$/
    const cyrillicPattern = /[а-яА-ЯЁё]/;
    let rows = data.split('\r\n');
    let eng = '', translations = [], examples = [];
    for (let row of rows) {
        try {
            if (row == "") {
                if (eng != '') {
                    wordEntities.push(new Word(eng, translations, examples));
                }
                eng = '', translations = [], examples = [];
                continue;
            }

            if (eng == '') {
                let parts = row.split(BIG_DASH).join(SMALL_DASH).split(/\s\-\s/g);
                if (parts.length != 2) {
                    throw new Error(`Invalid row syntax. Row: ${row}`);
                }
                eng = parts[0].trim().split('.').join('').replace(/\s\s+/g, ' ');
                if (!cyrillicPattern.test(parts[1])) {
                    throw new Error(`Invalid translation. Row: ${row}`);
                }
                translations = parts[1].trim().split(',').map(tran => tran.trim());
            } else {
                row = capitalizeStr(row.trim());
                examples.push(row.endsWith('.') ? row : row + '.');
            }
        } catch (ex) {
            console.warn(`[Skip row] ${ex}`);
        }
    }

    return wordEntities;
}

function capitalizeStr(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

exports.getWordsFromFile = getWordsFromFile;
