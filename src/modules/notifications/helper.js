import cron from 'node-cron';
import notificationService from './service';
export class NotificationHelper {
  runCron() {
    cron
      .schedule(
        '0 * * * *',
        () => {
          console.log(notificationService.notifyParent());
        },
        { scheduled: true }
      )
      .start();
  }
}
export default new NotificationHelper();
