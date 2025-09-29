"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/auth-context";
import Input from "../ui/form/index";
import type { RegisterRequest } from "@/types/auth";

const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { register, isLoading } = useAuth();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    const payload: RegisterRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      await register(payload);
    } catch {
      // toast handled in context
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input.Default
          name="firstName"
          label="First name"
          type="text"
          placeholder="John"
          autoComplete="given-name"
        />
        <Input.Default
          name="lastName"
          label="Last name"
          type="text"
          placeholder="Doe"
          autoComplete="family-name"
        />

        <Input.Default
          name="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
        />

        <Input.Password
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting || isLoading}
        >
          {form.formState.isSubmitting || isLoading
            ? "Creating account..."
            : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
