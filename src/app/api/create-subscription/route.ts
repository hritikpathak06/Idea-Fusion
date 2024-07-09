// /api/create-subscription
import { config_env } from "@/config/env_config";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    // const {} = await req.json();
    let instance = new Razorpay({
      key_id: config_env.RAZORPAY_API_KEY!,
      key_secret: config_env.RAZORPAY_API_SECRET!,
    });

    const result = await instance.subscriptions.create({
      plan_id: config_env.RAZORPAY_PLAN_ID!,
      customer_notify: 1,
      quantity: 1,
      total_count: 1,
      addons: [],
      notes: {
        key1: "Note 1",
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
}
