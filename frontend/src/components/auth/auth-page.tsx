"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Train } from "lucide-react";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-[420px] space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2">
            <Train className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">
              TrainScheduler
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your train schedules efficiently
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Fixed-height panel; inner content scrolls if taller */}
              <TabsContent value="signin" className="h-[420px] mt-4">
                <div className="h-full overflow-y-auto">
                  <SignInForm />
                </div>
              </TabsContent>

              <TabsContent value="signup" className="h-[420px] mt-4">
                <div className="h-full overflow-y-auto">
                  <SignUpForm />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
