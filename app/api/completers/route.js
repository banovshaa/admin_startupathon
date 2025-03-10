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
  const response = NextResponse.json({ completers });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
