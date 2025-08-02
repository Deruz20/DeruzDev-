import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  try {
      const { name, email, password } = await req.json();

          if (!name || !email || !password) {
                return new NextResponse("Missing name, email, or password", { status: 400 });
                    }

                        const hashedPassword = await hash(password, 10);

                            const user = await prisma.user.create({
                                  data: {
                                          name,
                                                  email: email.toLowerCase(),
                                                          hashedPassword, // Assumes you add this field to your User schema
                                                                },
                                                                    });

                                                                        return NextResponse.json(user);
                                                                          } catch (error: any) {
                                                                              console.error("REGISTRATION_ERROR", error);
                                                                                  return new NextResponse("Internal Server Error", { status: 500 });
                                                                                    }
                                                                                    }
                                                                                    