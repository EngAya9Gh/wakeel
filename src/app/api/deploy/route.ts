import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
  // Define a secret key in your .env file
  const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'site_tech_secure_webhook_12345';

  const signature = req.headers.get('x-hub-signature-256');

  if (!signature) {
    // Alternatively, allow manual trigger via a query parameter ?token=xxx
    const { searchParams } = new URL(req.url);
    if (searchParams.get('token') === WEBHOOK_SECRET) {
      // Continue execution
    } else {
      return NextResponse.json({ error: 'Forbidden: No signature or token provided' }, { status: 401 });
    }
  } else {
    // Validate GitHub signature
    const payload = await req.text();
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    hmac.update(payload);
    const calculatedSignature = `sha256=${hmac.digest('hex')}`;

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(calculatedSignature)
      )
    ) {
      return NextResponse.json({ error: 'Forbidden: Invalid signature' }, { status: 403 });
    }
  }

  // Run the deploy script in the background
  try {
    const deployScript = path.join(process.cwd(), 'deploy.sh');
    
    const child = spawn('nohup', ['bash', deployScript, '>', 'deploy.log', '2>&1', '&'], {
      detached: true,
      stdio: 'ignore', // Important for the process to run independently
      shell: true,
    });

    child.unref();

    return NextResponse.json({ message: 'Deployment started in the background.' }, { status: 200 });
  } catch (error) {
    console.error('Deployment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
