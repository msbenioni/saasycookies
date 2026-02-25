import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase env vars: REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client intake functions
export const clientIntakeAPI = {
  // Create a new client intake record
  async createClientIntake(intakeData) {
    try {
      // Validate required fields
      const requiredFields = [
        'fullName', 'email', 'businessName', 'country', 'designVibe',
        'annualRevenueRange', 'offerStructure', 'monthlyLeadsExpected',
        'contentFrequency', 'servicePath', 'projectVision', 'hostingExpectation'
      ];
      
      const missingFields = requiredFields.filter(field => !intakeData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      
      // Whitelist of allowed columns (future-proofing)
      const ALLOWED_COLUMNS = [
        "full_name",
        "email", 
        "phone",
        "business_name",
        "country",
        "current_url",
        "industry",
        "business_description",
        "annual_revenue_range",
        "offer_structure", 
        "monthly_leads_expected",
        "content_frequency",
        "service_path",
        "project_vision",
        "hosting_expectation",
        "project_types",
        "required_capabilities",
        "brand_colors",
        "preferred_fonts", 
        "inspiration_websites",
        "design_vibe",
        "recommended_plan",
        "complexity_score",
        "plan_flags",
        "plan_reasoning",
        "build_prompt",
        "form_payload",
        "user_agent",
        "referrer",
      ];

      // Build the data object with only allowed columns
      const supabaseData = {
        // Client Information
        full_name: intakeData.fullName || '',
        email: intakeData.email || '',
        phone: intakeData.phone || '',
        business_name: intakeData.businessName || '',
        country: intakeData.country || '',
        current_url: intakeData.currentUrl || '',
        industry: intakeData.industry || '',
        
        // Business Details (only what's still in DB)
        business_description: intakeData.businessDescription || '',
        
        // Qualification Data (Stage 1) - All required
        annual_revenue_range: intakeData.annualRevenueRange || '',
        offer_structure: intakeData.offerStructure || '',
        monthly_leads_expected: intakeData.monthlyLeadsExpected || '',
        content_frequency: intakeData.contentFrequency || '',
        service_path: intakeData.servicePath || '',
        project_vision: intakeData.projectVision || '',
        hosting_expectation: intakeData.hostingExpectation || '',
        
        // Design & Brand
        brand_colors: intakeData.brandColors || '',
        preferred_fonts: intakeData.preferredFonts || '',
        inspiration_websites: intakeData.inspirationWebsites || '',
        design_vibe: intakeData.designVibe || '',
        
        // Project Details (multi-select arrays)
        project_types: Array.isArray(intakeData.projectType) ? intakeData.projectType : [intakeData.projectType].filter(Boolean),
        required_capabilities: Array.isArray(intakeData.requiredCapabilities) ? intakeData.requiredCapabilities : [intakeData.requiredCapabilities].filter(Boolean),
        
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
        
        // Metadata
        user_agent: intakeData.user_agent || null,
        referrer: intakeData.referrer || null,
      };

      // Filter to only allowed columns (future-proofing)
      const cleanedData = Object.fromEntries(
        Object.entries(supabaseData).filter(([key]) => ALLOWED_COLUMNS.includes(key))
      );

      const { data, error } = await supabase
        .from('client_intakes')
        .insert([cleanedData])
        .select('id')
        .single();

      if (error) {
        logger.error('Supabase error creating client intake:', error);
        logger.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      if (!data?.id) {
        logger.error('Insert succeeded but no ID was returned');
        throw new Error("Insert succeeded but no ID was returned. Check .select() on insert.");
      }

      return data;
    } catch (error) {
      logger.error('Client intake creation failed:', error);
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
          updated_at: new Date().toISOString(),
          ...additionalData 
        })
        .eq('id', intakeId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error updating client intake status:', error);
      throw error;
    }
  },

  // Update Stripe information
  async updateStripeInfo(intakeId, stripeCustomerId, stripeSubscriptionId) {
    try {
      const { data, error } = await supabase
        .from('client_intakes')
        .update({
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          accepted_plan: true,
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('id', intakeId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating Stripe info:', error);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error('Stripe info update failed:', error);
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
        logger.error('Error fetching client intake:', error);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error('Client intake fetch failed:', error);
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
        logger.error('Error fetching client intakes:', error);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error('Client intakes fetch failed:', error);
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
        logger.error('Error fetching statistics:', error);
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
      logger.error('Statistics fetch failed:', error);
      throw error;
    }
  }
};

export default supabase;
