import fs from 'fs';
import path from 'path';

export default function handler(req: { method: string; body: { kebabName: any; comment: any; rating: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    const { kebabName, comment, rating } = req.body;

    const filePath = path.resolve('./public/comments.json');
    const comments = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    comments.push({ kebabName, comment, rating, date: new Date().toISOString() });

    fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));
    res.status(200).json({ message: 'Comment saved!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}