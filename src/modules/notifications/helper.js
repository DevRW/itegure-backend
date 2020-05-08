import cron from 'node-cron';
import notificationService from './service';
import notificationCtrl from './controller';
import dotenv from 'dotenv';
dotenv.config();
export class NotificationHelper {
  runCron() {
    cron
      .schedule(
        '0 * * * *',
        async () => {
          const notify = await notificationService.notifyParent();
          const sendRemider = await notificationCtrl.sendReminder(notify);
          return sendRemider;
        },
        { scheduled: true }
      )
      .start();
  }
}
export default new NotificationHelper();
