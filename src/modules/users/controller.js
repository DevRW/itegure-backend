export class UserCtrl {
  welcome(req, res) {
    return res.json('welcome');
  }
}
export default new UserCtrl();
