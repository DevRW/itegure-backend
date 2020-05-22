import cron from 'node-cron';
import notificationService from './service';
import notificationCtrl from './controller';
import dotenv from 'dotenv';
dotenv.config();
export class NotificationHelper {
  runCron() {
    cron
      .schedule(
        '0 20 * * *',
        () => {
          notificationService
            .notifyParent(null)
            .then((response) => {
              notificationCtrl.sendReminder(response).then((notification) => {});
            })
            .catch((error) => {});
        },
        { scheduled: true }
      )
      .start();
  }
}
export default new NotificationHelper();
