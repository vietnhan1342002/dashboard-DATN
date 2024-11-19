import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import Link from "next/link";

const Register = () => {
    return (
        <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
            <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
                <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
                    <div className="my-4">
                        <h1 className="text-3x1 font-semibold mt-4">Sign Up</h1>
                        <p className="mt-2 text-xs text-slate-400">{' '}Enter your information to login to your account</p>
                    </div>
                    <form>
                        <Button className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full" variant="outline">
                            <FcGoogle /> Login with Google
                        </Button>

                        <Label htmlFor="name">Name *</Label>
                        <Input className="mt-2 mb-4 bg-transparent rounded-full" type="name" id="name" placeholder="Name" />

                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input className="mt-2 mb-4 bg-transparent rounded-full" type="phone" id="phone" placeholder="Phone" />

                        <Label htmlFor="phone">Email *</Label>
                        <Input className="mt-2 mb-4 bg-transparent rounded-full" type="email" id="email" placeholder="Email" />

                        <Label htmlFor="phone">Address *</Label>
                        <Input className="mt-2 mb-4 bg-transparent rounded-full" type="address" id="address" placeholder="Address" />

                        <Label htmlFor="password">Password *</Label>
                        <Input className="mt-2 mb-4 bg-transparent rounded-full" type="password" id="password" placeholder="Password" />

                        <Button type="submit" className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700">
                            Register
                        </Button>
                    </form>

                    <div className="mt-4 text-xs text-slate-200">
                        Don&apos;t have an account?
                        <Link className="underline ml-2" href="/login">Login</Link>
                    </div>
                </div>
                <div className="relative hidden md:block">
                    <Image className='object-cover' fill={true} src="/bg.jpg" alt="background image" />
                </div>
            </div>
        </main>
    )
}
export default Register;