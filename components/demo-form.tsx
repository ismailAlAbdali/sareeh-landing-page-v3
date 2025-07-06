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
import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';
import { useRouter } from 'next/navigation';

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

export default function DemoForm() {
  const { language } = useI18n();
  const t_sum = translations[language].industries;
  const t = translations[language].industries.types;
  const demoT = translations[language].demo.form;

  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Prepare form data
      const formData = {
        businessname: data.businessname,
        contactname: data.contactname,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        otherindustry: data.otherindustry,
        language: language
      };

      // Submit to local API route for development (or Netlify function for production)
      const apiEndpoint = process.env.NODE_ENV === 'development' 
        ? '/api/contact' 
        : '/.netlify/functions/contact';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Show success message
      toast.success(language === 'ar' ? 'تم إرسال طلب التجربة بنجاح!' : 'Demo request submitted successfully!');

      // Redirect to thank you page with form data
      const thankYouUrl = `/${language}/thank-you?request=${result.requestNumber || `DEMO-${Date.now()}`}&business=${encodeURIComponent(data.businessname)}&contact=${encodeURIComponent(data.contactname)}&industry=${encodeURIComponent(data.industry)}`;
      router.push(thankYouUrl);
      
      reset();
      setSelectedIndustry('');
    } catch (err: any) {
      toast.error(language === 'ar' ? 'فشل إرسال النموذج. يرجى المحاولة مرة أخرى.' : 'Failed to submit form. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-gray-50 dark:bg-gray-900">
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
              disabled={isSubmitting}
            >
              {isSubmitting ? demoT.submitting : demoT.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}