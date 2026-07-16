import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  // Define a secret key in your .env file
  const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'site_tech_secure_webhook_12345';

  const { searchParams } = new URL(req.url);
  
  if (searchParams.get('token') !== WEBHOOK_SECRET) {
    return new NextResponse('Forbidden: Invalid or missing token', { status: 403 });
  }

  try {
    const logPath = path.join(process.cwd(), 'deploy.log');
    
    if (!fs.existsSync(logPath)) {
      return new NextResponse('Deploy log file not found.', { status: 404 });
    }

    const logContent = fs.readFileSync(logPath, 'utf8');

    // Return the log formatted as a stylish terminal UI
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Deployment Logs - WakeeL</title>
        <style>
          body {
            background-color: #0F172A;
            color: #38BDF8;
            font-family: 'Courier New', Courier, monospace;
            padding: 20px;
            margin: 0;
            line-height: 1.6;
            font-size: 14px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #1E293B;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border: 1px solid #334155;
            overflow-x: auto;
          }
          h1 {
            color: #F8FAFC;
            margin-top: 0;
            border-bottom: 1px solid #334155;
            padding-bottom: 15px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .refresh-btn {
            background: #3B82F6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
            font-size: 14px;
          }
          .refresh-btn:hover { background: #2563EB; }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            margin: 0;
          }
          .success { color: #10B981; }
          .error { color: #EF4444; }
          .warning { color: #F59E0B; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <span>WakeeL Deployment Logs 🚀</span>
            <button class="refresh-btn" onclick="window.location.reload()">Refresh Logs</button>
          </h1>
          <pre>${logContent
            .replace(/Error|failed|fail/gi, '<span class="error">$&</span>')
            .replace(/success|successfully|done/gi, '<span class="success">$&</span>')
            .replace(/warning|warn/gi, '<span class="warning">$&</span>')
          }</pre>
        </div>
        <script>
          // Auto-scroll to bottom
          window.scrollTo(0, document.body.scrollHeight);
        </script>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (error) {
    console.error('Error reading log file:', error);
    return new NextResponse('Internal Server Error while reading logs.', { status: 500 });
  }
}
