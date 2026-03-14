"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Linkedin, Mail, Phone, FileText } from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { z } from "zod";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.enum(["Job Opportunity", "Collaboration", "Other"], {
    message: "Please select a subject"
  }),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "Job Opportunity",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

      if (fieldErrors.name) newErrors.name = fieldErrors.name[0];
      if (fieldErrors.email) newErrors.email = fieldErrors.email[0];
      if (fieldErrors.subject) newErrors.subject = fieldErrors.subject[0];
      if (fieldErrors.message) newErrors.message = fieldErrors.message[0];

      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
        console.warn("EmailJS credentials not configured.");
        toast.success("Message recorded (Development Mode). I'll get back to you soon!");
        setFormData({ name: "", email: "", subject: "Job Opportunity", message: "" });
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "Job Opportunity", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try emailing directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="Currently open for Senior Software Engineer opportunities. Let's build something great."
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <Card className="p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-text-primary">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-text-secondary">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md bg-bg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-accent-primary'} focus:outline-none focus:ring-2`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md bg-bg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-accent-primary'} focus:outline-none focus:ring-2`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-text-secondary">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md bg-bg border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-accent-primary'} focus:outline-none focus:ring-2 appearance-none`}
                >
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-text-secondary">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-md bg-bg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-accent-primary'} focus:outline-none focus:ring-2 resize-none`}
                  placeholder="Hi Yash, I'd like to discuss..."
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="p-6 md:p-8 h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-6 text-text-primary">Contact Details</h3>

            <div className="space-y-6 flex-grow">
              <a href="mailto:yashdesai3011@gmail.com" className="flex items-start gap-4 group">
                <div className="p-3 rounded-full bg-surface border border-border text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">Email</p>
                  <p className="text-text-primary font-medium group-hover:text-accent-primary transition-colors">yashdesai3011@gmail.com</p>
                </div>
              </a>

              <a href="tel:+919033746279" className="flex items-start gap-4 group">
                <div className="p-3 rounded-full bg-surface border border-border text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">Phone</p>
                  <p className="text-text-primary font-medium group-hover:text-accent-primary transition-colors">+91 9033746279</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/yash-desai-33471916b/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="p-3 rounded-full bg-surface border border-border text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">LinkedIn</p>
                  <p className="text-text-primary font-medium group-hover:text-accent-primary transition-colors">linkedin.com/in/yash-desai</p>
                </div>
              </a>
            </div>

            <div className="pt-8 mt-8 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">
                Prefer to review my qualifications offline?
              </p>
              <a href="/YashDesai_Resume.pdf" download className="block w-full">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 w-4 h-4" /> Download Resume
                </Button>
              </a>
            </div>
          </Card>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
