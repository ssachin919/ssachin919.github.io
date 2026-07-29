"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SampleSection } from "@/components/samples/sample-section";

type Status = "idle" | "sending" | "success" | "error" | "missing-config";

export function EmailJsSample() {
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
    <SampleSection
      id="emailjs"
      title="Contact form"
      library="@emailjs/browser"
      description="Client-side email via EmailJS. Add keys to .env.local (see .env.example)."
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
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
            placeholder="What should we build?"
            required
            rows={4}
          />
        </div>

        <Button type="submit" disabled={status === "sending"} className="w-full">
          <FontAwesomeIcon icon={faPaperPlane} className="size-3.5" />
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>

        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-mbb-green">
            <FontAwesomeIcon icon={faCircleCheck} />
            Message sent. Check your EmailJS dashboard.
          </p>
        )}

        {status === "missing-config" && (
          <p className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
            <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5" />
            Missing EmailJS env vars. Copy `.env.example` → `.env.local` and fill
            in your service / template / public key.
          </p>
        )}

        {status === "error" && (
          <p className="flex items-start gap-2 text-sm text-destructive">
            <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5" />
            {errorMessage}
          </p>
        )}
      </form>
    </SampleSection>
  );
}
