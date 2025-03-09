import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
