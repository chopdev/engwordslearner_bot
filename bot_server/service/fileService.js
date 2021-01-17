const { Word } = require("../models/wordEntity");
const { TelegramAPI } = require("../repository/messageSender");
const { SendMessage } = require("../models/sendMessage");
const { getWordsFromExcel } = require("../parser/excelParser");

class FileService {

    constructor(wordsUploader) {
        this.wordsUploader = wordsUploader;
    }
    
    /**
     * Get info about the file, uploaded to telegram servers
     */
    async getFileInfo(fileId) {
        if (fileId == null || fileId == '') {
            throw new Error(`getFileInfo invalid arguments - fileId: ${fromUserId}`);
        }

        const res = await TelegramAPI.postData(TelegramAPI.GET_FILE, {file_id: fileId});
        return res.data.result;
    }

    /**
     * Saves words from uploaded to bot file
     * */
    async saveWordsFromFile(uploadedFile) {
        if (uploadedFile.file_id == null || uploadedFile.file_name == null) {
            throw new Error(`saveWordsFromFile invalid arguments - uploadedFile: ${uploadedFile}`);
        }

        await TelegramAPI.sendMessageToAdmin(`START TO UPLOAD WORDS \n ${JSON.stringify(uploadedFile)}`);
        const fileInfo = await this.getFileInfo(uploadedFile.file_id);
        // download file from telegram
        const file = await TelegramAPI.downloadFile(fileInfo.file_path, uploadedFile.file_name);
        const words = getWordsFromExcel(file);

        await this.wordsUploader.uploadWordsToDb(words);

        const updateMsg = "SUCCESSFULLY WRITEN WORDS COUNT:" + words.length;
        console.info(updateMsg);
        await TelegramAPI.sendMessageToAdmin(updateMsg);
    }

}

exports.FileService = FileService;