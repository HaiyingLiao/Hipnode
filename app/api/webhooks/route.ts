/* eslint-disable camelcase */
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { DeletedObjectJSON, WebhookEvent } from '@clerk/nextjs/server';

import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Get event type
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { email_addresses, first_name, last_name, id: clerkId } = evt.data;

    // create user in db.
    const user = await createUser({
      clerkId,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name || ''}`,
    });

    return NextResponse.json({ user }, { status: 201 });
  }

  if (eventType === 'user.updated') {
    const { email_addresses, first_name, last_name } = evt.data;

    // updated user
    const updatedUser = await updateUser({
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name || ''}`,
    });
    return NextResponse.json({ updatedUser }, { status: 200 });
  }

  if (eventType === 'user.deleted') {
    type ExtendedDeletedObjectJSON = DeletedObjectJSON & {
      email_addresses: { email_address: string }[];
    };

    const { email_addresses } = evt.data as ExtendedDeletedObjectJSON;

    // deleted user
    const deletedUser = await deleteUser({
      email: email_addresses[0].email_address,
    });
    return NextResponse.json({ deletedUser }, { status: 200 });
  }

  return new Response('', { status: 201 });
}
