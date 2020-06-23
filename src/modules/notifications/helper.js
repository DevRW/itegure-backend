import cron from 'node-cron';
import notificationService from './service';
import notificationCtrl from './controller';
import dotenv from 'dotenv';
dotenv.config();
export class NotificationHelper {
  runCron() {
    cron
      .schedule(
        '0 18 * * *',
        () => {
          notificationService
            .notifyParent(null, null)
            .then((response) => {
              notificationCtrl.sendReminder(response).then((notification) => {});
            })
            .catch((error) => {});
        },
        { scheduled: true }
      )
      .start();
  }
  toPamelCase(word) {
    word = word.toLowerCase();
    word = word.split(' ');
    let chars = '';
    word.forEach((singleWord) => {
      singleWord.split('').forEach((element, index) => {
        chars += index === 0 ? singleWord[index].toUpperCase() : singleWord[index];
      });
      chars += ' ';
    });
    return chars.slice(0, -1);
  }
  formartWord(word) {
    word = word.toUpperCase();
    if (word.split(' ').length == 1) {
      word = this.toPamelCase(word);
    }
    return word;
  }
}
export default new NotificationHelper();
