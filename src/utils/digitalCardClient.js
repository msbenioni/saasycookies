import { supabase } from './supabaseClient';

export const digitalCardAPI = {
  // Create a new digital card (draft state)
  async createDigitalCard(cardData) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .insert([{
          slug: cardData.slug,
          edit_token: cardData.editToken,
          card_json: cardData.cardJson || {},
          status: 'draft'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating digital card:', error);
      throw error;
    }
  },

  // Get card by slug (public view)
  async getCardBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching card by slug:', error);
      throw error;
    }
  },

  // Get card by edit token (private edit access)
  async getCardByToken(token) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .select('*')
        .eq('edit_token', token)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching card by token:', error);
      throw error;
    }
  },

  // Update card by token (secure edit endpoint)
  async updateCardByToken(token, updates) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('edit_token', token)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating card by token:', error);
      throw error;
    }
  },

  // Start free trial (when user begins trial)
  async startFreeTrial(cardId, stripeCustomerId, stripeSubscriptionId, trialEndDate) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .update({
          status: 'trialing',
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          trial_ends_at: trialEndDate,
          updated_at: new Date().toISOString()
        })
        .eq('id', cardId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error starting free trial:', error);
      throw error;
    }
  },

  // Activate subscription (after trial ends or payment)
  async activateSubscription(cardId, currentPeriodEnd) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .update({
          status: 'active',
          current_period_end: currentPeriodEnd,
          updated_at: new Date().toISOString()
        })
        .eq('id', cardId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error activating subscription:', error);
      throw error;
    }
  },

  // Cancel subscription
  async cancelSubscription(cardId) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .update({
          status: 'paused',
          updated_at: new Date().toISOString()
        })
        .eq('id', cardId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  },

  // Get card status (for polling)
  async getCardStatus(cardId) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .select('status, trial_ends_at, current_period_end')
        .eq('id', cardId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching card status:', error);
      throw error;
    }
  },

  // Update Stripe info (webhook handler)
  async updateStripeInfo(cardId, stripeCustomerId, stripeSubscriptionId, status) {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .update({
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', cardId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating Stripe info:', error);
      throw error;
    }
  }
};
