"use client";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ClientSubmitButton from "../ClientSubmitButton";

const registerSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          ...values,
        }),
      });

      const json = await response.json();

      console.log(json);

      if (response?.ok) {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/dashboard",
        });

        if (!result?.ok) {
          toast("An unexpected error occured while trying to sign you up.");
        }
      } else {
        toast(json["message"]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("An unexpected error has occured.");
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md px-5 py-10 flex flex-col">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <div className="relative mt-7">
                    <FormLabel className="absolute bottom-[40px]  ml-2 bg-white px-2 text-xs text-gray-500">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-12 max-w-md"
                        placeholder="John"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <div className="relative mt-7">
                    <FormLabel className="absolute bottom-[40px]  ml-2 bg-white px-2 text-xs text-gray-500">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-12 max-w-md"
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="relative mt-7">
                    <FormLabel className="absolute bottom-[40px]  ml-2 bg-white px-2 text-xs text-gray-500">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-12 max-w-md"
                        placeholder="johndoe@mail.com"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative mt-7">
                    <FormLabel className="absolute bottom-[40px]  ml-2 bg-white px-2 text-xs text-gray-500">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="w-full h-12 max-w-md"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-10">
              <ClientSubmitButton loading={loading} label="REGISTER" />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
