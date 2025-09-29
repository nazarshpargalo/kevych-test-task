"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/auth-context";
import Input from "../ui/form/index";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { login, isLoading } = useAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    await login(data.email, data.password);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input.Default
          name="email"
          label="Email"
          type="email"
          placeholder="admin@trainscheduler.com"
        />
        <Input.Password
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting || isLoading}
        >
          {form.formState.isSubmitting || isLoading
            ? "Signing in..."
            : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
