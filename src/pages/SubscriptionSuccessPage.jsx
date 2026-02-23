import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Calendar, CreditCard, Mail, Phone } from "lucide-react";
import { SECTION_LABEL_STYLES, SECTION_TITLE_STYLES, SECTION_DESCRIPTION_STYLES } from "../constants/formStyles";
import { clientIntakeAPI } from "../utils/supabaseClient";

export default function SubscriptionSuccessPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [intakeData, setIntakeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const intakeId = urlParams.get('intake');
    const sessionId = urlParams.get('session_id');

    if (!intakeId) {
      navigate('/services/ai-saas');
      return;
    }

    const loadIntakeData = async () => {
      try {
        const intake = await clientIntakeAPI.getClientIntake(intakeId);
        setIntakeData(intake);
        
        // Update status to 'building' if confirmed
        if (intake.status === 'confirmed') {
          await clientIntakeAPI.updateStatus(intakeId, 'building');
        }
        
      } catch (error) {
        console.error('Error loading intake data:', error);
        setError('Unable to load your subscription details. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    loadIntakeData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-white">Loading your subscription details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-void text-white">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 25%, rgba(16,185,129,0.14) 0%, transparent 55%), radial-gradient(circle at 80% 35%, rgba(16,185,129,0.14) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-400" strokeWidth={2} />
            </div>
          </div>
          
          <span className={SECTION_LABEL_STYLES.primary}>Payment Successful</span>
          <h1 className={`${SECTION_TITLE_STYLES.main} mt-4`}>
            Welcome to SaaSy Cookies!
          </h1>
          <p className={SECTION_DESCRIPTION_STYLES}>
            Your subscription is active and we're ready to start building your digital infrastructure.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="bg-zinc-800/50 rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Subscription Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-emerald-300 mb-4">Plan Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Plan:</span>
                    <span className="text-white capitalize">{intakeData.recommended_plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Status:</span>
                    <span className="text-emerald-300 capitalize">{intakeData.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Trial End:</span>
                    <span className="text-white">
                      {intakeData.trial_end_date ? new Date(intakeData.trial_end_date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-emerald-300 mb-4">Business Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Business:</span>
                    <span className="text-white">{intakeData.business_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Contact:</span>
                    <span className="text-white">{intakeData.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Email:</span>
                    <span className="text-white">{intakeData.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                What Happens Next
              </h3>
              <div className="space-y-3 text-sm text-zinc-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-300 text-xs font-semibold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">30-Day Build Phase</p>
                    <p className="text-zinc-400">We'll build your system during the trial period at no additional cost.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-300 text-xs font-semibold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Project Kickoff</p>
                    <p className="text-zinc-400">You'll receive an email with project timeline and next steps within 24 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-300 text-xs font-semibold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Launch & Support</p>
                    <p className="text-zinc-400">After successful launch, your monthly subscription begins and ongoing support starts.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-7 py-3 hover:bg-zinc-800 transition"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
