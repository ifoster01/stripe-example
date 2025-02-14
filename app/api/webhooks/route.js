import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(req) {
  let event

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      (await headers()).get('stripe-signature'),
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    const errorMessage = err.message
    // On error, log and return the error message.
    if (err) console.log(err)
    console.log(`Error message: ${errorMessage}`)
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      console.log(`Subscription for ${subscription.id} was updated!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object;
      console.log(`Subscription for ${subscriptionCreated.id} was created!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object;
      console.log(`Subscription for ${subscriptionDeleted.id} was deleted!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.paused':
      const subscriptionPaused = event.data.object;
      console.log(`Subscription for ${subscriptionPaused.id} was paused!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.pending_update_applied':
      const subscriptionPendingUpdateApplied = event.data.object;
      console.log(`Subscription for ${subscriptionPendingUpdateApplied.id} was updated!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.pending_update_expired':
      const subscriptionPendingUpdateExpired = event.data.object;
      console.log(`Subscription for ${subscriptionPendingUpdateExpired.id} was updated!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.resumed':
      const subscriptionResumed = event.data.object;
      console.log(`Subscription for ${subscriptionResumed.id} was resumed!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.trial_will_end':
      const subscriptionTrialWillEnd = event.data.object;
      console.log(`Subscription for ${subscriptionTrialWillEnd.id} will end!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    default:
      // Unexpected event type
      throw new Error(`Unhandled event type ${event.type}.`);
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 })
}