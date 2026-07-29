"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "success" | "error" | "missing-config";

export function StoryContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("missing-config");
      return;
    }

    const form = event.currentTarget;
    setStatus("sending");
    setErrorMessage("");

    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="user_name">Name</Label>
        <Input
          id="user_name"
          name="user_name"
          placeholder="Your name"
          required
          autoComplete="name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user_email">Email</Label>
        <Input
          id="user_email"
          name="user_email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Build with us, learn with us, or simply say hello."
          required
          rows={4}
        />
      </div>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
      {status === "success" ? (
        <p className="text-sm text-mbb-green">Message sent. Thank you.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : null}
      {status === "missing-config" ? (
        <p className="text-sm text-muted-foreground">
          Contact form is not configured yet. Reach out via LinkedIn in the meantime.
        </p>
      ) : null}
    </form>
  );
}
