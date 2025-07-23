import { message } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendError(e: any) {
  console.log('Sending');
  message.error(e?.data?.message ?? e?.message ?? 'An error occured');
  if (import.meta.env.DEV) {
    console.error(e);
  }
}
