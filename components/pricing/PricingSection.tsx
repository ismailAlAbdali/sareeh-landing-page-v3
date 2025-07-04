"use client";

import { ErrorBoundary } from "react-error-boundary";
import { PricingCard } from "./PricingCard";
import { getPricingTiers } from "@/lib/data/pricing-plans";
import { useI18n } from "@/components/i18n-provider";
import { translations } from "@/lib/translations";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-center p-4 text-red-500">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export function PricingSection() {
  const { language } = useI18n();
  const t = translations[language].pricing;
  const tiers = getPricingTiers(language);

  return (
    <section id = "pricing" className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <PricingCard 
                key={tier.name}
                {...tier}
                monthlyText={t.month}
                getStartedText={t.getStarted}
              />
            ))}
          </div>
        </ErrorBoundary>
      </div>
    </section>
  );
}