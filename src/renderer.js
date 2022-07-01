import Logo from './assets/images/logo512.png';

export const Notify = async (title, body) => {
  try {
    await Notification.requestPermission();
    new Notification(title, {
      body: body,
      icon: Logo,
    });
  } catch (error) {
    console.log(error);
  }
};
