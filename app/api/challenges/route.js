import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Challenge from "../../../models/challenge";

export async function POST(request) {
  const { title, fundingAmount, deadline, description, image, isVisible } =
    await request.json();

  await connectMongoDB();

  const created = await Challenge.create({
    title,
    fundingAmount,
    deadline,
    description,
    image,
    isVisible,
  });

  return NextResponse.json({ created }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const challenges = await Challenge.find();
  return NextResponse.json({ challenges });
}
