"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthCard } from "./AuthCard";
import { AuthToggle } from "./AuthToggle";
import { SubmitButton } from "./SubmitButton";
import { Eye, EyeOff } from "lucide-react";

export function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // clear error when typing
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!isLogin) {
      if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
      if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Login successful!");
        router.navigate({ to: "/dashboard" });
      } else {
        toast.error("Invalid credentials!");
      }
    } else {
      const user = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Account created successfully!");
      router.navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="flex h-screen font-roboto">
      <div className="flex w-full items-center justify-center bg-gray-50 p-6 dark:bg-neutral-900">
        <AuthCard>
          <img src="/logo.png" alt="logo" width={300} className="mx-auto" />
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            {isLogin
              ? "Enter your email and password to continue."
              : "Fill out the details to create your account."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {!isLogin && (
              <div className="flex gap-4">
                <LabelInputContainer>
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    placeholder="John"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && (
                    <p className="text-sm text-red-500">{errors.firstname}</p>
                  )}
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    placeholder="Doe"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  {errors.lastname && (
                    <p className="text-sm text-red-500">{errors.lastname}</p>
                  )}
                </LabelInputContainer>
              </div>
            )}

            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </LabelInputContainer>

            {!isLogin && (
              <LabelInputContainer>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </LabelInputContainer>
            )}

            <SubmitButton isLogin={isLogin} />
          </form>

          <AuthToggle isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
        </AuthCard>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
