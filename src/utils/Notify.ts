import Logo from '../assets/images/logo512.png';

interface NotifyProps {
  title: string;
  body: string;
}

export const Notify = async ({title, body}: NotifyProps) => {
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
