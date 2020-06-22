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
  toCamelCase(sentenceCase) {
    let out = '';
    sentenceCase.split('').forEach(function (el, idx) {
      var add = el.toLowerCase();
      out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
    return out;
  }
  formartWord(word) {
    word = word.toUpperCase();
    if (word.split(' ').length == 1) {
      word = this.toCamelCase(word);
    }
    return word;
  }
}
export default new NotificationHelper();
