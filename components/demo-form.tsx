'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Store, Utensils, Stethoscope, Shirt, Coffee, Scissors, Wheat, Car, Droplet, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useDemoRequests } from '@/hooks/use-demo-requests';
import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';
import { AnimatePresence } from 'framer-motion';
import LoadingOverlay from '@/components/loading-overlay';

const formSchema = (language: string) => z.object({
  businessname: z.string().min(2, {
    message: language === 'ar' ? 'اسم النشاط التجاري مطلوب' : 'Business name is required',
  }),
  contactname: z.string().min(2, {
    message: language === 'ar' ? 'اسم المسؤول مطلوب' : 'Contact name is required',
  }),
  email: z.string().email({
    message: language === 'ar' ? 'عنوان البريد الإلكتروني غير صالح' : 'Invalid email address',
  }),
  phone: z.string().min(8, {
    message: language === 'ar' ? 'رقم هاتف صالح مطلوب' : 'Valid phone number is required',
  }),
  industry: z.string().min(1, {
    message: language === 'ar' ? 'يرجى اختيار قطاع' : 'Please select an industry',
  }),
  otherindustry: z.string().optional(),
});

type FormData = z.infer<ReturnType<typeof formSchema>>;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  !WHATSAPP_NUMBER
) {
  throw new Error('Missing environment variables');
}

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

export default function DemoForm() {
  const { language } = useI18n();
  const t_sum = translations[language].industries;
  const t = translations[language].industries.types;
  const demoT = translations[language].demo.form;

  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { submitDemoRequest, isSubmitting } = useDemoRequests();

  const industries = [
    { icon: Store, name: t.retail },
    { icon: Utensils, name: t.restaurants },
    { icon: Stethoscope, name: t.healthcare },
    { icon: Shirt, name: t.fashion },
    { icon: Coffee, name: t.cafes },
    { icon: Scissors, name: t.salons },
    { icon: Wheat, name: t.Agriculture },
    { icon: Car, name: t.automotive },
    { icon: Droplet, name: t.Perfumes },
    { icon: Plus, name: t.other },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema(language)),
  });

  const redirectToWhatsApp = (message: string) => {
    setIsRedirecting(true);
    setTimeout(() => {
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
     
      
      window.location.href = whatsappURL;
      setIsRedirecting(false);
    }, 1500);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Submit to database
      const dbResult = await submitDemoRequest({
        businessname: data.businessname,
        contactname: data.contactname,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        otherindustry: data.otherindustry
      });
      
      if (!dbResult.success) {
        throw new Error(dbResult.error);
      }

      // Submit to Netlify function for email notifications
      const emailData = {
        businessname: data.businessname,
        contactname: data.contactname,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        otherindustry: data.otherindustry,
        language: language
      };

      const emailResponse = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const emailResult = await emailResponse.json();

      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.error);
        // Don't throw error here as database submission was successful
      } else {
        console.log('Email notifications sent successfully:', emailResult.requestNumber);
      }

      // Show success message
      toast.success(language === 'ar' ? 'تم إرسال طلب التجربة بنجاح!' : 'Demo request submitted successfully!');

      // Also redirect to WhatsApp for immediate contact
      const message = language === 'ar' 
        ? encodeURIComponent(
            `اريد تجربة نظام المحاسبة صريح:\n\nاسم النشاط التجاري: ${data.businessname}\nاسم المسؤول: ${data.contactname}\nالقطاع: ${data.industry}${
              data.otherindustry ? ` - ${data.otherindustry}` : ''
            }`
          )
        : encodeURIComponent(
            `I want to try the Sareeh POS system:\n\nBusiness: ${data.businessname}\nContact: ${data.contactname}\nIndustry: ${data.industry}${
              data.otherindustry ? ` - ${data.otherindustry}` : ''
            }`
          );

      toast.success(language === 'ar' ? 'جاري تحويلك الى واتساب' : 'Redirecting you to WhatsApp!');
      redirectToWhatsApp(message);
      reset();
      setSelectedIndustry('');
    } catch (err: any) {
      toast.error(language === 'ar' ? 'فشل إرسال النموذج. يرجى المحاولة مرة أخرى.' : 'Failed to submit form. Please try again.');
      console.error('Error submitting form:', err);
    }
  };

  return (
    <section id="demo" className="py-24 bg-gray-50 dark:bg-gray-900">
      <AnimatePresence>
        {isRedirecting && (
          <LoadingOverlay 
            message={language === 'ar' ? "جارٍ توجيهك إلى واتساب..." : "Directing you to WhatsApp..."}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t_sum.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t_sum.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessname">{demoT.businessName}</Label>
                <Input
                  id="businessname"
                  {...register('businessname')}
                  className={errors.businessname ? 'border-destructive' : ''}
                  aria-invalid={errors.businessname ? 'true' : 'false'}
                />
                {errors.businessname && (
                  <p className="text-sm text-destructive">{errors.businessname.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactname">{demoT.contactName}</Label>
                <Input
                  id="contactname"
                  {...register('contactname')}
                  className={errors.contactname ? 'border-destructive' : ''}
                  aria-invalid={errors.contactname ? 'true' : 'false'}
                />
                {errors.contactname && (
                  <p className="text-sm text-destructive">{errors.contactname.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">{demoT.email}</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{demoT.phone}</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  className={errors.phone ? 'border-destructive' : ''}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>{demoT.industry}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {industries.map((industry) => (
                  <button
                    key={industry.name}
                    type="button"
                    onClick={() => {
                      setSelectedIndustry(industry.name);
                      setValue('industry', industry.name, {
                        shouldValidate: true,
                      });
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedIndustry === industry.name
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-primary/50'
                    } ${errors.industry ? 'border-destructive' : ''}`}
                  >
                    <industry.icon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{industry.name}</span>
                  </button>
                ))}
              </div>
              {errors.industry && (
                <p className="text-sm text-destructive">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {selectedIndustry === t.other && (
              <div className="space-y-2">
                <Label htmlFor="otherindustry">{demoT.otherIndustry}</Label>
                <Input
                  id="otherindustry"
                  {...register('otherindustry')}
                  className={errors.otherindustry ? 'border-destructive' : ''}
                  aria-invalid={errors.otherindustry ? 'true' : 'false'}
                />
                {errors.otherindustry && (
                  <p className="text-sm text-destructive">
                    {errors.otherindustry.message}
                  </p>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || isRedirecting}
            >
              {isSubmitting ? demoT.submitting : demoT.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}