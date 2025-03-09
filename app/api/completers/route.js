import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Completer from "../../../models/completer";

export async function POST(request) {
  const {
    firstName,
    lastName,
    position,
    linkedInUrl,
    fundingAmount,
    projectName,
    profilePicture,
    description,
  } = await request.json();

  await connectMongoDB();

  const created = await Completer.create({
    firstName,
    lastName,
    position,
    linkedInUrl,
    fundingAmount,
    projectName,
    profilePicture,
    description,
  });

  return NextResponse.json({ created }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const completers = await Completer.find();
  return NextResponse.json({ completers });
}
