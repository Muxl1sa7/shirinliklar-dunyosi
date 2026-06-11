import { useEffect, useState } from 'react';
import { adminGetMessages, type MessageRecord } from '../../lib/api';

export default function MessagesList() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetMessages()
      .then((data) => setMessages(data.messages))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Xabarlar</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Sana</th>
              <th className="px-4 py-3 font-medium">Ism</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Mavzu</th>
              <th className="px-4 py-3 font-medium">Xabar</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  Yuklanmoqda...
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  Xabarlar topilmadi.
                </td>
              </tr>
            ) : (
              messages.map((message, index) => (
                <tr key={index} className="border-b border-slate-50 align-top last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {new Date(message.createdAt).toLocaleString('uz-UZ')}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{message.name}</td>
                  <td className="px-4 py-3 text-slate-600">{message.email}</td>
                  <td className="px-4 py-3 text-slate-600">{message.subject}</td>
                  <td className="px-4 py-3 text-slate-600">{message.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
