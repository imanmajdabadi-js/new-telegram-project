import { ChangeEvent, useEffect, useState } from 'react';
import { ApiResponse, PhotoSize } from './types/types';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const token = process.env.REACT_APP_TOKEN;
  const baseUrl = process.env.REACT_APP_BASEURL;
  const chatId = process.env.REACT_APP_CHAT_ID;
  const baseImageurl = process.env.REACT_APP_BASEURL_IMG;
  const [images, setImages] = useState<string[]>([]);

  async function sendPost(text: string) {
    const response = await fetch(`${baseUrl}${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });
    const result = await response.json();
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    await sendPhoto(file);
  };

  async function sendPhoto(file: File) {
    const formData = new FormData();
    formData.append('chat_id', chatId!);
    formData.append('photo', file);
    const response = await fetch(`${baseUrl}${token}/sendPhoto`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    console.log(result.status);
  }

  async function getFileUrl(file_id: string): Promise<string> {
    const res = await fetch(`${baseUrl}${token}/getFile?file_id=${file_id}`);

    const data = await res.json();

    return `${baseImageurl}${token}/${data.result.file_path}`;
  }
  async function getPhotos() {
    try {
      const res = await fetch(`${baseUrl}${token}/getUpdates`);
      const data: ApiResponse = await res.json();

      const photos = data.result
        .filter((item) => item.channel_post)
        .map((item) => item.channel_post!.photo)
        .filter((p): p is PhotoSize[] => Boolean(p))
        .map((p) => p.at(-1))
        .filter((p): p is PhotoSize => Boolean(p));

      const fileIds = photos.map((p) => p.file_id);
      const urls: string[] = [];
      for (let i = 0; i < fileIds.length; i++) {
        const element = fileIds[i];
        const url = await getFileUrl(element!);
        urls.push(url);
      }
      // const urls = await Promise.all(fileIds.map((id) => getFileUrl(id)));

      setImages(urls);
    } catch (error) {
      console.log('خطایی رخ داد:', error);
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await sendPost('سلام خوبی');
    setLoading(false);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div>
      {images.map((url) => (
        <img alt="" key={url} src={url} style={{ width: 200 }} />
      ))}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : 'Send Post'}
      </button>
      <input onChange={handleFileChange} type="file" />
    </div>
  );
}

export default App;
