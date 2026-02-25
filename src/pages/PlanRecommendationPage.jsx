import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, ArrowLeft, Calculator, CreditCard, Clock, Loader2 } from "lucide-react";
import { tiers } from "./PricingPage";
import { SECTION_LABEL_STYLES, SECTION_TITLE_STYLES, CARD_STYLES, SECTION_DESCRIPTION_STYLES } from "../constants/formStyles";
import { acceptPlanAndSubscribe } from "../utils/stripeService";

export default function PlanRecommendationPage() {
  const navigate = useNavigate();
  const [recommendedPlan, setRecommendedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Load plan recommendation from sessionStorage
    const stored = sessionStorage.getItem('planRecommendation');
    if (stored) {
      setRecommendedPlan(JSON.parse(stored));
    } else {
      // Redirect back to assessment if no recommendation data
      navigate('/services/ai-saas');
    }
  }, [navigate]);

  if (!recommendedPlan) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-white">Redirecting to assessment...</div>
      </div>
    );
  }

  const getRecommendedTier = () => {
    return tiers.find(tier => tier.planId === recommendedPlan.recommendedPlan);
  };

  const handleAcceptPlan = async (planId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get form data from session storage for country
      const stage1Payload = JSON.parse(sessionStorage.getItem('stage1Payload') || '{}');
      
      // Create subscription and redirect to Stripe with correct currency
      const subscriptionData = await acceptPlanAndSubscribe(planId, stage1Payload.country || 'OTHER');
      
      // Redirect to Stripe checkout
      window.location.href = subscriptionData.checkoutUrl;
      
    } catch (error) {
      console.error('Plan acceptance error:', error);
      setError(error.message || 'Failed to process subscription. Please try again.');
      setLoading(false);
    }
  };

  const recommendedTier = getRecommendedTier();

  return (
    <div className="bg-void text-white">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 25%, rgba(6,182,212,0.14) 0%, transparent 55%), radial-gradient(circle at 80% 35%, rgba(16,185,129,0.14) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/services/ai-saas')}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Qualification
            </button>
          </div>

          <span className={SECTION_LABEL_STYLES.primary}>Your Personalized Recommendation</span>
          <h1 className={`${SECTION_TITLE_STYLES.main} mt-4 max-w-4xl`}>
            We Recommend: {recommendedPlan.planName}
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
            Based on your business requirements and complexity assessment, this plan provides the best value and features for your growth stage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mb-8">
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <Calculator className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{recommendedPlan.score}/10</div>
              <div className="text-sm text-zinc-400">Complexity Score</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{recommendedPlan.flags.revenueStage}</div>
              <div className="text-sm text-zinc-400">Revenue Stage</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{recommendedPlan.flags.leadVolume}</div>
              <div className="text-sm text-zinc-400">Monthly Leads</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{recommendedPlan.flags.funnelComplexity}</div>
              <div className="text-sm text-zinc-400">Funnel Complexity</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.main}>Why This Plan For You</h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            Our algorithm analyzed your responses and matched you with the optimal plan based on complexity, growth potential, and feature requirements.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {tiers.map((tier) => {
              const isRecommended = tier.planId === recommendedPlan.recommendedPlan;
              return (
                <article
                  key={tier.name}
                  className={`${CARD_STYLES.base} ${isRecommended ? "ring-emerald-400/70 shadow-[0_0_0_1px_rgba(52,211,153,0.4)]" : ""} flex flex-col h-full relative`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-400/10 border border-emerald-400/30 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <div className={`${CARD_STYLES.padding} flex-1 flex flex-col pt-6`}>
                    <h3 className="font-heading text-2xl font-bold mb-2 text-white">{tier.name}</h3>
                    <p className="text-3xl font-extrabold mb-1">{tier.price}</p>
                    <p className="text-sm text-zinc-400 mb-4">{tier.subtitle}</p>
                    <p className="text-zinc-200/90 mb-6">{tier.description}</p>

                    <div className="mb-6">
                      <div className="text-sm text-zinc-400 mb-2">Scope Limits:</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Max Pages:</span>
                          <span className="text-zinc-200">{tier.scopeLimits.maxPages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Funnels:</span>
                          <span className="text-zinc-200">{tier.scopeLimits.maxFunnels}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Content Updates:</span>
                          <span className="text-zinc-200">{tier.scopeLimits.contentUpdates}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Support Response:</span>
                          <span className="text-zinc-200">{tier.scopeLimits.supportResponse}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6 text-sm text-zinc-200 flex-1">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-400" strokeWidth={2} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>


                    <div className="mt-auto">
                      <button
                        onClick={() => handleAcceptPlan(tier.planId)}
                        disabled={loading}
                        className={`inline-flex items-center justify-center w-full gap-2 rounded-md px-5 py-3 font-semibold transition relative ${
                          isRecommended
                            ? "bg-emerald-400 text-black hover:bg-emerald-300 disabled:opacity-50"
                            : "bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 disabled:opacity-50"
                        }`}
                      >
                        {loading && isRecommended ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            {isRecommended ? "Accept & Subscribe" : `Choose ${tier.name}`}
                            <ArrowRight className="w-4 h-4" strokeWidth={2} />
                          </>
                        )}
                      </button>
                      
                      {error && isRecommended && (
                        <div className="mt-2 text-xs text-red-400 text-center">
                          {error}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className={SECTION_TITLE_STYLES.main}>What Happens Next</h2>
          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-400/20 rounded-full flex items-center justify-center">
                <span className="text-emerald-300 font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Plan Confirmation</h3>
                <p className="text-zinc-300 text-sm">You'll receive a detailed plan confirmation with scope, timeline, and payment instructions.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-400/20 rounded-full flex items-center justify-center">
                <span className="text-emerald-300 font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">30-Day Build Phase</h3>
                <p className="text-zinc-300 text-sm">We build your system during the first 30 days. No payment until successful launch.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-400/20 rounded-full flex items-center justify-center">
                <span className="text-emerald-300 font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Launch & Ongoing Support</h3>
                <p className="text-zinc-300 text-sm">After launch, we provide ongoing management, updates, and support as per your plan.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-xl p-6 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-white">30-Day Build Phase Details</h3>
            </div>
            <p className="text-zinc-300 text-sm mb-4">
              This protects both parties. You get a working system before paying, we get commitment to the partnership. Billing begins only after successful launch.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300">$10 build-fee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300">12-month partnership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className={SECTION_TITLE_STYLES.small}>Have Questions?</h2>
          <p className="text-zinc-300 text-lg mb-8">
            Want to discuss custom requirements or need clarification on scope? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/services/ai-saas')}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition"
            >
              Retake Assessment
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
