import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/user";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { email } = await request.json();
    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const user = await User.findOne({ token });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
