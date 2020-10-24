class QueueUploader {
    constructor(dbRepository, queueRepository) {
        this.repository = dbRepository;
        this.queueRepository = queueRepository;
    }

    async backfillQueue() {
        const keys = await this.repository.getAllKeys();
        await this.queueRepository.backfillQueue(shuffleArray(keys));
    }
}

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

exports.QueueUploader = QueueUploader;