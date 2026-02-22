import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client intake functions
export const clientIntakeAPI = {
  // Create a new client intake record
  async createClientIntake(intakeData) {
    try {
      const { data, error } = await supabase
        .from('client_intakes')
        .insert([{
          // Client Information
          full_name: intakeData.fullName,
          email: intakeData.email,
          phone: intakeData.phone || null,
          business_name: intakeData.businessName,
          current_url: intakeData.currentUrl || null,
          industry: intakeData.industry || null,
          
          // Business Details
          business_description: intakeData.businessDescription || null,
          primary_growth_goal: intakeData.primaryGoal || null,
          success_metric: intakeData.successMetric || null,
          
          // Qualification Data (Stage 1)
          annual_revenue_range: intakeData.annualRevenueRange,
          offer_structure: intakeData.offerStructure,
          monthly_leads_expected: intakeData.monthlyLeadsExpected,
          content_frequency: intakeData.contentFrequency,
          service_path: intakeData.servicePath,
          project_vision: intakeData.projectVision,
          hosting_expectation: intakeData.hostingExpectation,
          
          // Project Details
          project_types: Array.isArray(intakeData.projectType) ? intakeData.projectType : [intakeData.projectType].filter(Boolean),
          required_capabilities: Array.isArray(intakeData.requiredCapabilities) ? intakeData.requiredCapabilities : [intakeData.requiredCapabilities].filter(Boolean),
          
          // Technical Requirements (Stage 2 - optional)
          primary_users: intakeData.primaryUsers || null,
          desired_user_action: intakeData.desiredUserAction || null,
          current_stack: intakeData.currentStack || null,
          integrations_needed: intakeData.integrationsNeeded || null,
          auth_requirements: intakeData.authRequirements || null,
          security_requirements: intakeData.securityRequirements || null,
          technical_requirements: intakeData.technicalRequirements || null,
          
          // Assets & Timeline
          content_readiness: intakeData.contentReadiness || null,
          brand_readiness: intakeData.brandReadiness || null,
          brand_colors: intakeData.brandColors || null,
          timeline: intakeData.timeline || null,
          constraints_and_risks: intakeData.constraintsAndRisks || null,
          
          // Plan Recommendation
          recommended_plan: (() => {
            const planRec = intakeData.planRecommendation;
            const planData = typeof planRec === 'string' ? JSON.parse(planRec) : planRec;
            return planData?.recommendedPlan || 'custom';
          })(),
          complexity_score: (() => {
            const planRec = intakeData.planRecommendation;
            const planData = typeof planRec === 'string' ? JSON.parse(planRec) : planRec;
            return planData?.score || 0;
          })(),
          plan_flags: (() => {
            const planRec = intakeData.planRecommendation;
            const planData = typeof planRec === 'string' ? JSON.parse(planRec) : planRec;
            return planData?.flags || {};
          })(),
          plan_reasoning: (() => {
            const planRec = intakeData.planRecommendation;
            const planData = typeof planRec === 'string' ? JSON.parse(planRec) : planRec;
            return planData?.reasoning || [];
          })(),
          
          // Build Information
          build_prompt: intakeData.buildPrompt || null,
          form_payload: intakeData,
          
          // Geo detection data (should be passed from client)
          detected_currency: intakeData.detected_currency || null,
          detected_country: intakeData.detected_country || null,
          
          // Metadata (should be passed from client)
          user_agent: intakeData.user_agent || null,
          referrer: intakeData.referrer || null,
        }])
        .single();

      if (error) {
        console.error('Error creating client intake:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Client intake creation failed:', error);
      throw error;
    }
  },

  // Update client intake status
  async updateStatus(intakeId, status, additionalData = {}) {
    try {
      const { data, error } = await supabase
        .from('client_intakes')
        .update({
          status,
          ...additionalData,
          updated_at: new Date().toISOString()
        })
        .eq('id', intakeId)
        .select()
        .single();

      if (error) {
        console.error('Error updating client intake status:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Status update failed:', error);
      throw error;
    }
  },

  // Update Stripe information
  async updateStripeInfo(intakeId, stripeCustomerId, stripeSubscriptionId, trialStartDate, trialEndDate) {
    try {
      const { data, error } = await supabase
        .from('client_intakes')
        .update({
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          trial_start_date: trialStartDate,
          trial_end_date: trialEndDate,
          accepted_plan: true,
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('id', intakeId)
        .select()
        .single();

      if (error) {
        console.error('Error updating Stripe info:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Stripe info update failed:', error);
      throw error;
    }
  },

  // Get client intake by ID
  async getClientIntake(intakeId) {
    try {
      const { data, error } = await supabase
        .from('client_intakes')
        .select('*')
        .eq('id', intakeId)
        .single();

      if (error) {
        console.error('Error fetching client intake:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Client intake fetch failed:', error);
      throw error;
    }
  },

  // Get all client intakes (admin function)
  async getAllClientIntakes(filters = {}) {
    try {
      let query = supabase
        .from('client_intakes')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.recommended_plan) {
        query = query.eq('recommended_plan', filters.recommended_plan);
      }
      if (filters.date_from) {
        query = query.gte('created_at', filters.date_from);
      }
      if (filters.date_to) {
        query = query.lte('created_at', filters.date_to);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching client intakes:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Client intakes fetch failed:', error);
      throw error;
    }
  },

  // Get client intake statistics
  async getStatistics() {
    try {
      const { data, error } = await supabase
        .from('client_intakes')
        .select('status, recommended_plan, created_at, complexity_score');

      if (error) {
        console.error('Error fetching statistics:', error);
        throw error;
      }

      // Calculate statistics
      const stats = {
        total: data.length,
        by_status: {},
        by_plan: {},
        this_month: data.filter(item => {
          const createdAt = new Date(item.created_at);
          const now = new Date();
          return createdAt.getMonth() === now.getMonth() && 
                 createdAt.getFullYear() === now.getFullYear();
        }).length,
        average_complexity: data.reduce((sum, item) => sum + item.complexity_score, 0) / data.length
      };

      data.forEach(item => {
        stats.by_status[item.status] = (stats.by_status[item.status] || 0) + 1;
        stats.by_plan[item.recommended_plan] = (stats.by_plan[item.recommended_plan] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Statistics fetch failed:', error);
      throw error;
    }
  }
};

export default supabase;
