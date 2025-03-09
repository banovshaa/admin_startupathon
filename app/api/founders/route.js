import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Founder from "../../../models/founder";

export async function POST(request) {
  const {
    firstName,
    lastName,
    position,
    linkedInUrl,
    profilePicture,
    description,
  } = await request.json();

  await connectMongoDB();

  const created = await Founder.create({
    firstName,
    lastName,
    position,
    linkedInUrl,
    profilePicture,
    description,
  });

  return NextResponse.json({ created }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const founders = await Founder.find();
  return NextResponse.json({ founders });
}
