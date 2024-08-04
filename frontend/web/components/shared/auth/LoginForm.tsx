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
import SubmitButton from "../ActionSubmitButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ClientSubmitButton from "../ClientSubmitButton";

const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.ok) {
        router.push("/dashboard");
      } else {
        toast(
          "Credentials do not match. Please check your email and password and try again."
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("An unexpected error has occured.");
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md px-5 flex flex-col">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        placeholder="ojangole.jordan@gmail.com"
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
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-10">
              <ClientSubmitButton loading={loading} label="LOGIN" />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
