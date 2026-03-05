/**
 * Chatbot Knowledge Test Suite
 *
 * Sends real queries to /api/chat covering every data category across all 20 leads.
 * Checks if the chatbot's responses contain the expected information.
 *
 * Usage:
 *   1. Start the backend:  node server.js
 *   2. Run tests:          node test-chatbot-context.js
 */

import 'dotenv/config';

const API_URL = 'http://localhost:3001/api/chat';

// ─── Full leads context (mirrors the updated ChatbotPage.jsx mapping) ───

const leadsContext = [
  { name: "Margaret Chen", stage: "inquiry", careLevel: "Memory Care", facility: "Sunrise Gardens", contactPerson: "Lisa Chen", contactRelation: "Daughter", contactPhone: "(213) 555-0142", contactEmail: "lisa.chen@email.com", salesRep: "Alex Rivera", nextActivity: "Follow-up call Feb 14", source: "Website", lastContactDate: "2026-02-12", inquiryDate: "2026-01-28", initialContact: "2026-01-29", intakeNote: { leadSource: "Google search, 'Memory care near me'", zipcode: "90007", caller: "Lisa Chen (daughter)", dateTime: "Feb 12 — 10:42 AM", salesRep: "Alex Rivera", situationSummary: ["Daughter exploring options for mother after recent fall", "Currently living alone at home", "Doctor recommended considering memory care within 3–6 months", "No immediate move needed but 'starting research now'"], careNeeds: ["Early-stage memory concerns", "Needs help with meds + meals", "Mild mobility issues — uses walker", "Independent with bathing/dressing currently"], budgetFinancial: ["Budget range: $5,000–$7,000/month", "Paying private for now", "Sold house last year → has savings"], decisionMakers: ["Lisa (primary decision maker)", "Brother in Seattle will join later in process"], timeline: "Ideal move: Summer or sooner if health declines", preferences: ["Wants community with activities", "Social environment", "Outdoor space", "Strong preference for private room"], objections: ["Fear mother will resist moving", "Wants reassurance transition support is gentle"], salesRepAssessment: ["Warm lead", "High likelihood to tour", "Needs education + trust building"], nextStep: ["Scheduled tour for Feb 15 at 2 PM", "Sent brochure + pricing sheet via email"] } },
  { name: "Robert Williams", stage: "inquiry", careLevel: "Assisted Living", facility: "Oakwood Manor", contactPerson: "Karen Williams", contactRelation: "Wife", contactPhone: "(213) 555-0198", contactEmail: "karen.williams@email.com", salesRep: "Sarah Johnson", nextActivity: "Send brochure Feb 13", source: "Digital Ads", lastContactDate: "2026-02-11", inquiryDate: "2026-02-01", initialContact: "2026-02-02", intakeNote: { leadSource: "Facebook ad, 'Senior living options'", zipcode: "90015", caller: "Karen Williams (wife)", situationSummary: ["Wife looking for help as husband's mobility declined", "Currently at home with part-time aide", "Wants more social interaction for husband"], careNeeds: ["Needs assistance with walking and transfers", "Medication management required", "Meals and housekeeping needed", "Mostly independent cognitively"], budgetFinancial: ["Budget range: $4,000–$5,500/month", "VA benefits pending", "Retirement savings available"], decisionMakers: ["Karen (primary)", "Adult son consulted occasionally"], timeline: "Within 2–3 months ideally", preferences: ["Ground floor unit preferred", "Wants active social calendar", "Pet-friendly community"], objections: ["Worried husband will feel isolated", "Concerned about cost long-term"] } },
  { name: "Dorothy Martinez", stage: "inquiry", careLevel: "Independent Living", facility: "Lakeside Living", contactPerson: "Carlos Martinez", contactRelation: "Son", contactPhone: "(310) 555-0267", contactEmail: "carlos.martinez@email.com", salesRep: "Mike Peters", nextActivity: "Schedule tour Feb 15", source: "Referral", lastContactDate: "2026-02-13", inquiryDate: "2026-02-05", initialContact: "2026-02-06", intakeNote: { leadSource: "Referral from Dr. Patel at Valley Medical", situationSummary: ["Mother wants to downsize from large home", "Very active and social, just wants simpler living", "No major health concerns, proactive planning"], careNeeds: ["No daily care needed currently", "Wants access to dining options", "Light housekeeping preferred", "Wants fitness/wellness programs"], budgetFinancial: ["Budget: $3,500–$5,000/month", "Selling current home", "Pension + Social Security"], timeline: "Flexible, aiming for spring move", preferences: ["Active community with events", "Near shopping and restaurants", "Wants a garden or patio space"], objections: ["Doesn't want to feel 'old'", "Wants to maintain independence"] } },
  { name: "Harold Foster", stage: "inquiry", careLevel: "Skilled Nursing", facility: "Sunrise Gardens", contactPerson: "Amy Foster", contactRelation: "Daughter", contactPhone: "(323) 555-0331", contactEmail: "amy.foster@email.com", salesRep: "Emily Brown", nextActivity: "Needs assessment Feb 14", source: "Phone Call", lastContactDate: "2026-02-10", inquiryDate: "2026-01-20", initialContact: "2026-01-20", intakeNote: { leadSource: "Direct phone call", situationSummary: ["Father recovering from hip surgery", "Currently in rehab facility", "Needs long-term skilled nursing care", "Family overwhelmed with current situation"], careNeeds: ["24/7 skilled nursing required", "Physical therapy ongoing", "Wound care needed", "Diabetes management"], budgetFinancial: ["Medicare coverage for initial period", "Long-term care insurance active", "Budget: $7,000–$9,000/month"], timeline: "Urgent — within 2–4 weeks", preferences: ["Close to daughter's home", "Strong rehab program", "Private room essential"], objections: ["Worried about quality of care", "Previous bad experience at another facility"] } },
  { name: "Patricia Davis", stage: "connection", careLevel: "Assisted Living", facility: "Oakwood Manor", contactPerson: "Tom Davis", contactRelation: "Son", contactPhone: "(213) 555-0455", contactEmail: "tom.davis@email.com", salesRep: "Alex Rivera", nextActivity: "Second call Feb 13", source: "Walk-in", lastContactDate: "2026-02-09", inquiryDate: "2026-01-15", initialContact: "2026-01-15", intakeNote: { leadSource: "Walk-in visit to community", situationSummary: ["Son visited during lunch hour", "Mother living with him but needs more support", "Family dynamics making home care difficult"], careNeeds: ["Help with daily activities", "Medication reminders", "Social engagement needed", "Mild arthritis management"], budgetFinancial: ["Budget: $4,500–$6,000/month", "Mother's pension covers most", "Tom can supplement"], timeline: "1–2 months", preferences: ["Warm, family-like atmosphere", "Good food program", "Transportation services"], objections: ["Mother doesn't want to leave neighborhood", "Worried about adjustment period"] } },
  { name: "William Anderson", stage: "connection", careLevel: "Independent Living", facility: "Lakeside Living", contactPerson: "Self", contactRelation: "", contactPhone: "(310) 555-0512", contactEmail: "w.anderson@email.com", salesRep: "Mike Peters", nextActivity: "Email info packet Feb 14", source: "Website", lastContactDate: "2026-02-10", inquiryDate: "2026-01-22", initialContact: "2026-01-23", intakeNote: { leadSource: "Website contact form", situationSummary: ["Recently widowed, living alone in large house", "Wants community and social connections", "Very active — plays golf, volunteers"], careNeeds: ["No care needs currently", "Wants meal plan flexibility", "Fitness center access important", "Concierge-style services"], budgetFinancial: ["Budget: $4,000–$6,500/month", "Substantial savings from career", "House sale will fund move"], timeline: "3–6 months, no rush", preferences: ["Upscale community feel", "Golf or outdoor recreation nearby", "Fine dining options", "Dog-friendly"], objections: ["Doesn't want to feel 'institutionalized'", "Wants flexible meal plan"] } },
  { name: "Barbara Wilson", stage: "connection", careLevel: "Memory Care", facility: "Sunrise Gardens", contactPerson: "Nancy Wilson", contactRelation: "Daughter", contactPhone: "(323) 555-0634", contactEmail: "nancy.wilson@email.com", salesRep: "Sarah Johnson", nextActivity: "Tour confirmation Feb 12", source: "Referral", lastContactDate: "2026-02-08", inquiryDate: "2026-01-18", initialContact: "2026-01-19", intakeNote: { leadSource: "Referral from Alzheimer's Association", situationSummary: ["Mother diagnosed with early Alzheimer's", "Currently at home with full-time caregiver", "Caregiver leaving in 2 months", "Family exhausted from caregiving"], careNeeds: ["Memory care programming needed", "Wandering prevention", "Structured daily routine", "Medication management", "Nutritional support"], budgetFinancial: ["Budget: $6,000–$8,000/month", "Long-term care insurance", "Family pooling resources"], timeline: "Within 2 months before caregiver leaves", preferences: ["Secure memory care unit", "Music therapy programs", "Garden walking paths", "Family visiting areas"], objections: ["Guilt about placing mother", "Wants to ensure dignity maintained"] } },
  { name: "James Thompson", stage: "pre_tour", careLevel: "Independent Living", facility: "Oakwood Manor", contactPerson: "Self", contactRelation: "", contactPhone: "(310) 555-0789", contactEmail: "j.thompson@email.com", salesRep: "David Kim", nextActivity: "Tour Feb 14 10am", source: "Digital Ads", lastContactDate: "2026-02-07", inquiryDate: "2026-01-10", initialContact: "2026-01-11", intakeNote: { leadSource: "Google Ads, 'Independent senior living'", situationSummary: ["Retired professor looking for intellectual community", "Lives alone in condo, wants more engagement", "Very independent and active"], careNeeds: ["No care needs", "Wants intellectual programming", "Library and study space", "Walking/hiking group"], budgetFinancial: ["Budget: $3,800–$5,000/month", "University pension", "Investment income"], timeline: "Spring or summer", preferences: ["Intellectual community", "Book clubs and lectures", "Quiet study areas", "Walking trails"], objections: ["Doesn't want rigid schedules", "Values privacy highly"] } },
  { name: "Eleanor Foster", stage: "pre_tour", careLevel: "Assisted Living", facility: "Sunrise Gardens", contactPerson: "John Foster", contactRelation: "Son", contactPhone: "(213) 555-0856", contactEmail: "john.foster@email.com", salesRep: "Alex Rivera", nextActivity: "Tour Feb 15 2pm", source: "Phone Call", lastContactDate: "2026-02-11", inquiryDate: "2026-01-25", initialContact: "2026-01-25", intakeNote: { leadSource: "Phone call from hospital referral", situationSummary: ["Mother recently hospitalized for pneumonia", "Recovering but can't return to independent living", "Son lives nearby, wants mother close"], careNeeds: ["Daily living assistance needed", "Post-illness recovery support", "Regular health monitoring", "Physical therapy continuation"], budgetFinancial: ["Budget: $5,000–$6,500/month", "Mother's savings and SS", "John can contribute monthly"], timeline: "Within 3–4 weeks post-discharge", preferences: ["Near son's home", "Strong health services", "Comfortable recovery environment", "Good dining program"], objections: ["Eleanor worried about losing independence", "Cost concerns long-term"] } },
  { name: "Richard Taylor", stage: "pre_tour", careLevel: "Memory Care", facility: "Oakwood Manor", contactPerson: "Susan Taylor", contactRelation: "Wife", contactPhone: "(310) 555-0923", contactEmail: "susan.taylor@email.com", salesRep: "Sarah Johnson", nextActivity: "Tour Feb 13 11am", source: "Website", lastContactDate: "2026-02-12", inquiryDate: "2026-01-30", initialContact: "2026-01-31", intakeNote: { leadSource: "Website inquiry after reading blog", situationSummary: ["Husband diagnosed with moderate dementia", "Susan providing all care at home", "She's exhausted and needs support", "Doctor strongly recommends placement"], careNeeds: ["Full memory care needed", "Behavioral management", "24-hour supervision", "Activities for cognitive engagement"], budgetFinancial: ["Budget: $6,500–$8,500/month", "Long-term care insurance covers $5k/mo", "Joint savings available"], timeline: "As soon as possible", preferences: ["Compassionate staff", "Couples visiting program", "Art and music therapy", "Secure outdoor area"], objections: ["Feels like she's abandoning husband", "Worried about quality of memory care"] } },
  { name: "Virginia Clark", stage: "post_tour", careLevel: "Skilled Nursing", facility: "Lakeside Living", contactPerson: "David Clark", contactRelation: "Son", contactPhone: "(323) 555-1045", contactEmail: "david.clark@email.com", salesRep: "Emily Brown", nextActivity: "Follow-up meeting Feb 14", source: "Referral", lastContactDate: "2026-02-06", inquiryDate: "2026-01-05", initialContact: "2026-01-06", intakeNote: { leadSource: "Referral from discharge planner at Cedar Sinai", situationSummary: ["Mother post-stroke, needs skilled care", "Currently in hospital rehab unit", "Discharge planned within 2 weeks", "Complex medical needs"], careNeeds: ["Skilled nursing 24/7", "Speech therapy", "Occupational therapy", "Feeding assistance", "Catheter care"], budgetFinancial: ["Medicare Part A initially", "Medicaid application in process", "Budget: $8,000–$10,000/month without insurance"], timeline: "Urgent — 1–2 weeks", preferences: ["Strong therapy team", "Private or semi-private room", "Family-friendly visiting hours"], objections: ["Overwhelmed by process", "Medicaid uncertainty"] }, postTourNote: { tourDate: "Feb 4 — 11 AM", attendees: "David Clark + sister (video call)", tourGuide: "Emily Brown", firstImpressions: ["David impressed by therapy gym and equipment", "Sister asked detailed questions about staffing ratios", "Both noted cleanliness and organization"], emotionalSignals: ["David visibly relieved after meeting nursing director", "Said: 'This feels like the right place'", "Sister emotional but supportive"], likes: ["Comprehensive therapy program", "Nursing staff experience and credentials", "24/7 medical oversight", "Family communication portal"], concernsRaised: ["Medicaid acceptance timeline unclear", "Wants dedicated speech therapist assigned", "Asked about discharge/transition planning from hospital"], pricingReaction: ["Sticker shock initially at full private-pay rate", "Relieved when Medicare coverage explained", "Interested in Medicaid bridge plan"], buyingSignals: ["Asked about bed availability", "Wanted to know admission timeline", "Requested to meet the therapy team lead"], riskSignals: ["Medicaid approval could delay admission", "Sister wants to research one more facility in Oregon"], probabilityToClose: "75% — contingent on Medicaid timeline", followUpActions: ["Connect family with Medicaid specialist", "Send therapy program detail packet", "Arrange call with speech therapy director", "Confirm bed hold policy"], nextStepScheduled: "Follow-up meeting — Feb 14 @ 10 AM" } },
  { name: "George Lewis", stage: "post_tour", careLevel: "Assisted Living", facility: "Sunrise Gardens", contactPerson: "Mary Lewis", contactRelation: "Daughter", contactPhone: "(213) 555-1178", contactEmail: "mary.lewis@email.com", salesRep: "Mike Peters", nextActivity: "Send pricing Feb 13", source: "Walk-in", lastContactDate: "2026-02-08", inquiryDate: "2026-01-12", initialContact: "2026-01-12", intakeNote: { leadSource: "Walk-in with daughter during event", situationSummary: ["Father attended open house event", "Enjoyed the community atmosphere", "Daughter managing his finances", "Ready to move forward"], careNeeds: ["Light daily assistance", "Medication management", "Social programming", "Nutritional support — diabetic diet"], budgetFinancial: ["Budget: $4,500–$5,500/month", "Father's retirement + SS", "Property sale pending"], timeline: "After property sale, ~6 weeks", preferences: ["Room near dining hall", "Diabetic-friendly menu", "Activities and outings", "Close to daughter's work"], objections: ["Wants to wait for property sale", "George nervous about new people"] }, postTourNote: { tourDate: "Feb 6 — 2 PM", attendees: "George Lewis + Mary Lewis", tourGuide: "Mike Peters", firstImpressions: ["George quiet initially but warmed up during lunch", "Smiled during activity room visit", "Asked questions about food and garden areas"], emotionalSignals: ["Mary relieved after seeing staff interaction with residents", "George said: 'This doesn't feel like a hospital'", "Both laughed during resident social hour observation"], likes: ["Outdoor courtyard and walking paths", "Dining room atmosphere and menu variety", "Residents looked happy and socially engaged", "Staff warmth and attentiveness"], concernsRaised: ["Room size slightly smaller than expected", "Asked if they can bring personal furniture", "Wanted clarification on medication management process", "George asked about TV and internet in rooms"], pricingReaction: ["Comfortable with pricing after detailed explanation", "Interested in mid-tier floor plan with garden view", "Asked about move-in specials or discounts"], buyingSignals: ["Asked: 'How long is the waitlist?'", "Asked: 'What happens if his care needs increase?'", "Asked: 'Can we reserve a specific unit?'", "Mary took photos of the room and common areas"], riskSignals: ["Property sale timeline could delay decision", "George wants to 'think about it' before committing"], probabilityToClose: "70% — if follow-up handled well and property sells", followUpActions: ["Send floor plan options with garden view units", "Email weekly activity calendar", "Share testimonial from resident family with similar situation", "Call in 48 hours to check in"], nextStepScheduled: "Follow-up call — Feb 10 @ 11 AM" } },
  { name: "Helen Moore", stage: "post_tour", careLevel: "Memory Care", facility: "Oakwood Manor", contactPerson: "Paul Moore", contactRelation: "Husband", contactPhone: "(310) 555-1234", contactEmail: "paul.moore@email.com", salesRep: "David Kim", nextActivity: "Family meeting Feb 16", source: "Digital Ads", lastContactDate: "2026-02-09", inquiryDate: "2026-01-08", initialContact: "2026-01-09", intakeNote: { leadSource: "Facebook ad, 'Memory care for loved ones'", situationSummary: ["Wife has moderate Alzheimer's", "Paul has been sole caregiver for 3 years", "His own health declining from stress", "Children live out of state"], careNeeds: ["Full memory care", "Sundowning management", "Structured activities", "Medication management", "Personal care assistance"], budgetFinancial: ["Budget: $7,000–$9,000/month", "Long-term care insurance", "Retirement savings substantial"], timeline: "Within 1 month", preferences: ["Beautiful outdoor spaces", "Art therapy program", "Spouse visiting suite available", "Gentle, patient staff"], objections: ["Paul feels guilty", "Wants daily visiting access", "Worried about wife's reaction"] }, postTourNote: { tourDate: "Feb 7 — 3 PM", attendees: "Paul Moore (alone, without Helen)", tourGuide: "David Kim", firstImpressions: ["Paul emotional from the start — this is very hard for him", "Spent extra time in the memory care garden", "Asked many questions about daily routines and safety"], emotionalSignals: ["Teared up when seeing couples visiting program brochure", "Said: 'I just want her to be safe and happy'", "Staff member's warmth visibly moved him"], likes: ["Memory care garden with sensory stations", "Art therapy room — Helen loves painting", "Low staff-to-resident ratio", "Spouse visiting suite for overnight stays", "Gentle redirection approach for residents"], concernsRaised: ["How will Helen react to being left there?", "Can he visit every day without restrictions?", "What happens during sundowning episodes?", "Wants to know about overnight staffing levels"], pricingReaction: ["Price within budget, not a concern", "More focused on quality than cost", "Asked about all-inclusive vs. tiered pricing"], buyingSignals: ["Asked to see a specific room facing the garden", "Requested names of current family references", "Asked about the move-in process timeline", "Wanted to know if room can be personalized"], riskSignals: ["Daughter hasn't seen facility yet — wants her approval", "Paul may postpone out of guilt and emotional difficulty", "Comparing with one other memory care community nearby"], probabilityToClose: "80% — family meeting is the tipping point" } },
  { name: "Frank White", stage: "deposit", careLevel: "Independent Living", facility: "Lakeside Living", contactPerson: "Jenny White", contactRelation: "Daughter", contactPhone: "(310) 555-1367", contactEmail: "jenny.white@email.com", salesRep: "Alex Rivera", nextActivity: "Deposit paperwork Feb 14", source: "Website", lastContactDate: "2026-02-05", inquiryDate: "2025-12-20", initialContact: "2025-12-21", intakeNote: { leadSource: "Website research, compared 5 communities", situationSummary: ["Father very ready to move", "Has visited multiple communities", "Chose Lakeside for its location and amenities", "Wants to move before spring"], careNeeds: ["No daily care needed", "Wants wellness programs", "Pool and fitness access", "Social dining"], budgetFinancial: ["Budget: $4,000–$5,500/month", "Pension + investments", "Daughter helps with paperwork"], timeline: "Move in by March", preferences: ["Lake view if possible", "Near walking trails", "Good restaurant-style dining", "Active social calendar"], objections: ["Wants to negotiate price", "Concerned about pet policy for cat"] } },
  { name: "Ruth Harris", stage: "deposit", careLevel: "Assisted Living", facility: "Sunrise Gardens", contactPerson: "Mike Harris", contactRelation: "Son", contactPhone: "(213) 555-1456", contactEmail: "mike.harris@email.com", salesRep: "Sarah Johnson", nextActivity: "Room selection Feb 15", source: "Phone Call", lastContactDate: "2026-02-10", inquiryDate: "2025-12-15", initialContact: "2025-12-15", intakeNote: { leadSource: "Phone call referral from friend", situationSummary: ["Mother excited to join friend already living here", "Has toured twice and loved it", "Ready to put down deposit", "Friend is great advocate"], careNeeds: ["Light assistance with mobility", "Medication reminders", "Social engagement — friend already here", "Dietary management"], budgetFinancial: ["Budget: $5,000–$6,000/month", "Mother's savings", "Son supplements $500/mo"], timeline: "Room ready by March 1", preferences: ["Room near friend if possible", "Ground floor", "Garden access", "Group activities"], objections: ["Wants specific room near friend", "Slight concern about dining quality"] } },
  { name: "Thomas Martin", stage: "move_in", careLevel: "Skilled Nursing", facility: "Oakwood Manor", contactPerson: "Laura Martin", contactRelation: "Wife", contactPhone: "(323) 555-1578", contactEmail: "laura.martin@email.com", salesRep: "Emily Brown", nextActivity: "Move-in day Feb 17", source: "Referral", lastContactDate: "2026-02-04", inquiryDate: "2025-11-20", initialContact: "2025-11-21", intakeNote: { leadSource: "Referral from neurologist Dr. Kim", situationSummary: ["Husband has advanced Parkinson's disease", "Home care no longer sufficient", "All paperwork completed", "Move-in scheduled"], careNeeds: ["24/7 skilled nursing", "Parkinson's-specific care protocol", "Physical and occupational therapy", "Fall prevention program", "Specialized nutrition"], budgetFinancial: ["Insurance covers 70%", "Supplemental from savings", "Budget managed: ~$9,000/month total"], timeline: "Move-in Feb 17", preferences: ["Experienced Parkinson's caregivers", "Adaptive equipment in room", "Easy spouse visiting", "Therapy gym access"], objections: ["None remaining — fully committed", "Slight anxiety about transition day"] } },
  { name: "Betty Jackson", stage: "inquiry", careLevel: "Memory Care", facility: "Sunrise Gardens", contactPerson: "Sarah Jackson", contactRelation: "Granddaughter", contactPhone: "(213) 555-1690", contactEmail: "sarah.jackson@email.com", salesRep: "David Kim", nextActivity: "Intro call Feb 14", source: "Digital Ads", lastContactDate: "2026-02-13", inquiryDate: "2026-02-10", initialContact: "2026-02-11", intakeNote: { leadSource: "Instagram ad, 'Memory care with heart'", situationSummary: ["Granddaughter primary caregiver for grandmother", "Betty has moderate dementia", "Currently in adult day program", "Granddaughter can't continue full-time caregiving"], careNeeds: ["Memory care program", "Engaging daily activities", "Personal care assistance", "Nutritional monitoring", "Social interaction"], budgetFinancial: ["Budget: $5,500–$7,000/month", "Grandmother's savings and SS", "Family contributing"], timeline: "Within 2 months", preferences: ["Warm, home-like environment", "Intergenerational activities", "Music and art programs", "Good outdoor spaces"], objections: ["Worried grandmother will be confused by move", "Wants to visit daily initially"] } },
  { name: "Charles Robinson", stage: "connection", careLevel: "Independent Living", facility: "Lakeside Living", contactPerson: "Self", contactRelation: "", contactPhone: "(310) 555-1745", contactEmail: "c.robinson@email.com", salesRep: "Mike Peters", nextActivity: "Virtual tour Feb 13", source: "Walk-in", lastContactDate: "2026-02-11", inquiryDate: "2026-01-28", initialContact: "2026-01-28", intakeNote: { leadSource: "Drove by and walked in", situationSummary: ["Recently retired executive", "Downsizing from large estate", "Wants maintenance-free luxury living", "Very particular about quality"], careNeeds: ["No care needs", "Wants concierge services", "Fine dining important", "Fitness and wellness programs"], budgetFinancial: ["Budget: $6,000–$9,000/month", "Very comfortable financially", "Looking for value, not cheapest option"], timeline: "4–6 months, waiting for estate sale", preferences: ["Premium finishes and furnishings", "Wine club or tasting events", "Cultural outings", "Executive-level privacy"], objections: ["Wants to see comparable options first", "Particular about noise levels"] } },
  { name: "Marie Garcia", stage: "pre_tour", careLevel: "Assisted Living", facility: "Oakwood Manor", contactPerson: "Rosa Garcia", contactRelation: "Daughter", contactPhone: "(323) 555-1823", contactEmail: "rosa.garcia@email.com", salesRep: "Emily Brown", nextActivity: "Tour Feb 14 3pm", source: "Referral", lastContactDate: "2026-02-07", inquiryDate: "2026-01-15", initialContact: "2026-01-16", intakeNote: { leadSource: "Referral from parish priest Father Rodriguez", situationSummary: ["Mother's health declining after spouse's death", "Not eating well, losing weight", "Daughter works full-time, can't provide enough care", "Church community recommended our facility"], careNeeds: ["Meal preparation and nutrition monitoring", "Grief counseling support", "Light daily care", "Social engagement critical", "Medication management"], budgetFinancial: ["Budget: $4,000–$5,000/month", "Mother's SS and small pension", "Daughter supplements", "Looking into Medicaid"], timeline: "Within 6 weeks", preferences: ["Spanish-speaking staff", "Chapel or spiritual services", "Home-cooked meal style", "Warm community feel"], objections: ["Language barrier concern", "Mother has never lived away from family"] } },
  { name: "Donald Brown", stage: "move_in", careLevel: "Skilled Nursing", facility: "Sunrise Gardens", contactPerson: "Kevin Brown", contactRelation: "Son", contactPhone: "(213) 555-1967", contactEmail: "kevin.brown@email.com", salesRep: "Alex Rivera", nextActivity: "Move-in day Feb 20", source: "Phone Call", lastContactDate: "2026-02-03", inquiryDate: "2025-11-10", initialContact: "2025-11-10", intakeNote: { leadSource: "Direct phone call from hospital social worker", situationSummary: ["Father has COPD and heart failure", "Multiple hospitalizations last year", "Needs continuous medical oversight", "All paperwork finalized"], careNeeds: ["24/7 skilled nursing", "Respiratory therapy", "Cardiac monitoring", "Wound care", "Complex medication regimen"], budgetFinancial: ["Medicare + supplemental insurance", "VA benefits approved", "Budget managed at ~$8,500/month"], timeline: "Move-in Feb 20", preferences: ["Experienced pulmonary care team", "Oxygen therapy setup", "Comfortable private room", "Good visiting room for family"], objections: ["None — fully committed", "Wants smooth transition from hospital"] } },
];

// ─── Helper: send a message and get the full response ───

async function askChatbot(question) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', parts: [{ type: 'text', text: question }] }],
      leadsContext,
    }),
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${response.statusText}`);
  }

  const raw = await response.text();
  let result = '';
  for (const line of raw.split('\n')) {
    if (line.startsWith('data: ')) {
      try {
        const obj = JSON.parse(line.slice(6));
        if (obj.type === 'text-delta' && obj.delta) {
          result += obj.delta;
        }
      } catch {}
    }
  }
  return result;
}

// ─── Helper: check if response contains expected keywords ───

function checkResponse(response, expectedKeywords, label) {
  const lower = response.toLowerCase();
  const found = [];
  const missing = [];

  for (const kw of expectedKeywords) {
    if (lower.includes(kw.toLowerCase())) {
      found.push(kw);
    } else {
      missing.push(kw);
    }
  }

  // Pass if at least half the keywords are found (AI paraphrases)
  const passThreshold = Math.ceil(expectedKeywords.length / 2);
  const passed = found.length >= passThreshold;

  return { passed, found, missing, label };
}

// ─── Test definitions ───

const tests = [
  // ── BASIC FIELDS (these always worked) ──
  {
    category: "Basic Fields",
    name: "Stage counts",
    question: "How many leads are in the inquiry stage? Just give me the count and list their names.",
    expectedKeywords: ["margaret chen", "robert williams", "dorothy martinez", "harold foster", "betty jackson"],
  },
  {
    category: "Basic Fields",
    name: "Sales rep assignment",
    question: "Which leads are assigned to Sarah Johnson? List their names.",
    expectedKeywords: ["robert williams", "barbara wilson", "richard taylor", "ruth harris"],
  },
  {
    category: "Basic Fields",
    name: "Care level filter",
    question: "List all leads that need Memory Care.",
    expectedKeywords: ["margaret chen", "barbara wilson", "richard taylor", "helen moore", "betty jackson"],
  },

  // ── FACILITY (was missing) ──
  {
    category: "Facility",
    name: "Facility assignment",
    question: "Which facility is Margaret Chen interested in?",
    expectedKeywords: ["sunrise gardens"],
  },
  {
    category: "Facility",
    name: "Facility breakdown",
    question: "How many leads are interested in each facility? Break it down by Sunrise Gardens, Oakwood Manor, and Lakeside Living.",
    expectedKeywords: ["sunrise gardens", "oakwood manor", "lakeside living"],
  },

  // ── CONTACT RELATION (was missing) ──
  {
    category: "Contact Relation",
    name: "Contact relationship",
    question: "What is Lisa Chen's relationship to Margaret Chen?",
    expectedKeywords: ["daughter"],
  },
  {
    category: "Contact Relation",
    name: "Self-contacts",
    question: "Which leads are their own contact person (contacting for themselves, not through a family member)?",
    expectedKeywords: ["william anderson", "james thompson", "charles robinson"],
  },

  // ── BUDGET / FINANCIAL (was missing - in intakeNote) ──
  {
    category: "Budget",
    name: "Specific lead budget",
    question: "What is Margaret Chen's budget range?",
    expectedKeywords: ["5,000", "7,000"],
  },
  {
    category: "Budget",
    name: "Highest budget lead",
    question: "Which lead has the highest budget? What is their budget range?",
    expectedKeywords: ["charles robinson", "9,000"],
  },
  {
    category: "Budget",
    name: "VA benefits",
    question: "Which leads have VA benefits or are pursuing them?",
    expectedKeywords: ["robert williams", "donald brown"],
  },

  // ── CARE NEEDS (was missing - in intakeNote) ──
  {
    category: "Care Needs",
    name: "Specific care needs",
    question: "What are Harold Foster's specific care needs? List them.",
    expectedKeywords: ["skilled nursing", "physical therapy", "wound care", "diabetes"],
  },
  {
    category: "Care Needs",
    name: "Wandering prevention",
    question: "Which lead needs wandering prevention as part of their care?",
    expectedKeywords: ["barbara wilson"],
  },
  {
    category: "Care Needs",
    name: "Diabetic needs",
    question: "Which leads have diabetes-related care needs or dietary requirements?",
    expectedKeywords: ["harold foster", "george lewis"],
  },

  // ── SITUATION SUMMARY (was missing - in intakeNote) ──
  {
    category: "Situation",
    name: "Lead situation",
    question: "What is Margaret Chen's current situation? Why is she looking for care?",
    expectedKeywords: ["fall", "living alone", "memory care"],
  },
  {
    category: "Situation",
    name: "Medical urgency",
    question: "Which leads have urgent medical situations requiring immediate placement?",
    expectedKeywords: ["harold foster", "virginia clark", "donald brown"],
  },
  {
    category: "Situation",
    name: "Caregiver burnout",
    question: "Which leads involve caregiver burnout or exhaustion as a factor?",
    expectedKeywords: ["richard taylor", "helen moore", "betty jackson"],
  },

  // ── TIMELINE (was missing - in intakeNote) ──
  {
    category: "Timeline",
    name: "Specific timeline",
    question: "What is the move-in timeline for Margaret Chen?",
    expectedKeywords: ["summer"],
  },
  {
    category: "Timeline",
    name: "Urgent timelines",
    question: "Which leads have the most urgent timelines? List them with their timeframes.",
    expectedKeywords: ["harold foster", "virginia clark"],
  },

  // ── PREFERENCES (was missing - in intakeNote) ──
  {
    category: "Preferences",
    name: "Specific preferences",
    question: "What are William Anderson's preferences for a community?",
    expectedKeywords: ["golf", "fine dining", "dog"],
  },
  {
    category: "Preferences",
    name: "Pet-related preferences",
    question: "Which leads have preferences or concerns related to pets?",
    expectedKeywords: ["william anderson", "frank white"],
  },
  {
    category: "Preferences",
    name: "Spanish-speaking staff",
    question: "Which lead specifically wants Spanish-speaking staff?",
    expectedKeywords: ["marie garcia"],
  },

  // ── OBJECTIONS (was missing - in intakeNote) ──
  {
    category: "Objections",
    name: "Specific objections",
    question: "What are the objections or concerns from the Chen family about Margaret's move?",
    expectedKeywords: ["resist", "transition"],
  },
  {
    category: "Objections",
    name: "Guilt-related objections",
    question: "Which leads' families are dealing with guilt about placing their loved one?",
    expectedKeywords: ["barbara wilson", "helen moore", "richard taylor"],
  },
  {
    category: "Objections",
    name: "Cost objections",
    question: "Which leads have objections or concerns specifically about cost?",
    expectedKeywords: ["robert williams", "eleanor foster"],
  },

  // ── LEAD SOURCE (was missing - in intakeNote) ──
  {
    category: "Lead Source",
    name: "Specific lead source",
    question: "How did Dorothy Martinez find us? What was the specific referral source?",
    expectedKeywords: ["dr. patel", "valley medical"],
  },
  {
    category: "Lead Source",
    name: "Social media leads",
    question: "Which leads came from social media ads (Facebook, Instagram, etc.)?",
    expectedKeywords: ["robert williams", "betty jackson", "helen moore"],
  },

  // ── DECISION MAKERS (was missing - in intakeNote) ──
  {
    category: "Decision Makers",
    name: "Who decides for Margaret Chen",
    question: "Who are the decision makers for Margaret Chen's placement?",
    expectedKeywords: ["lisa", "brother", "seattle"],
  },
  {
    category: "Decision Makers",
    name: "Sole decision makers",
    question: "Which leads are their own sole decision maker?",
    expectedKeywords: ["william anderson", "james thompson", "charles robinson"],
  },

  // ── POST-TOUR NOTES (was missing) ──
  {
    category: "Post-Tour",
    name: "Tour impressions",
    question: "What were the first impressions from Virginia Clark's tour?",
    expectedKeywords: ["therapy gym", "staffing ratios", "cleanliness"],
  },
  {
    category: "Post-Tour",
    name: "Buying signals",
    question: "What buying signals did George Lewis show during his tour?",
    expectedKeywords: ["waitlist", "reserve"],
  },
  {
    category: "Post-Tour",
    name: "Probability to close",
    question: "What is the probability to close for Helen Moore? What is the key factor?",
    expectedKeywords: ["80%", "family meeting"],
  },
  {
    category: "Post-Tour",
    name: "Tour concerns raised",
    question: "What concerns did Helen Moore's husband Paul raise during the tour?",
    expectedKeywords: ["sundowning", "visit", "staffing"],
  },
  {
    category: "Post-Tour",
    name: "Emotional signals",
    question: "What emotional signals were observed during George Lewis's tour?",
    expectedKeywords: ["hospital", "laughed", "relieved"],
  },
  {
    category: "Post-Tour",
    name: "Risk signals",
    question: "What are the risk signals for Virginia Clark's placement?",
    expectedKeywords: ["medicaid", "oregon"],
  },
  {
    category: "Post-Tour",
    name: "Pricing reaction",
    question: "How did Virginia Clark's family react to the pricing?",
    expectedKeywords: ["sticker shock", "medicare", "medicaid bridge"],
  },

  // ── DATES (was missing) ──
  {
    category: "Dates",
    name: "Last contact date",
    question: "When was the last contact with Harold Foster?",
    expectedKeywords: ["feb", "10"],
  },
  {
    category: "Dates",
    name: "Inquiry date",
    question: "When did Margaret Chen first inquire?",
    expectedKeywords: ["jan", "28"],
  },

  // ── CROSS-FIELD ANALYSIS ──
  {
    category: "Cross-Field",
    name: "High-value urgent leads",
    question: "Which leads have both a high budget (over $7,000/month) AND an urgent timeline? Summarize each.",
    expectedKeywords: ["harold foster", "virginia clark"],
  },
  {
    category: "Cross-Field",
    name: "Post-tour follow-up priorities",
    question: "Of the post-tour leads, rank them by probability to close. Include the percentage and what needs to happen next.",
    expectedKeywords: ["helen moore", "80%", "virginia clark", "75%", "george lewis", "70%"],
  },
  {
    category: "Cross-Field",
    name: "Memory care pipeline summary",
    question: "Give me a full pipeline summary of all Memory Care leads — their stage, budget, timeline, and key objections for each.",
    expectedKeywords: ["margaret chen", "barbara wilson", "richard taylor", "helen moore", "betty jackson"],
  },
];

// ─── Run ───

async function main() {
  console.log('\n══════════════════════════════════════════════════════════════');
  console.log('  CHATBOT KNOWLEDGE TEST SUITE');
  console.log('  Testing if the chatbot can answer questions about all data');
  console.log('══════════════════════════════════════════════════════════════\n');

  // Check if server is running
  try {
    await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }).catch(() => { throw new Error(); });
  } catch {
    console.log('  ERROR: Backend not running!\n');
    console.log('  Start it first:  node server.js\n');
    console.log('  Then re-run:     node test-chatbot-context.js\n');
    process.exit(1);
  }

  const categories = [...new Set(tests.map(t => t.category))];
  console.log(`  Running ${tests.length} tests across ${categories.length} categories CONCURRENTLY...\n`);

  // Fire all queries in parallel
  const testPromises = tests.map(async (test, i) => {
    try {
      const response = await askChatbot(test.question);
      const result = checkResponse(response, test.expectedKeywords, test.name);
      return { test, index: i, result, response, error: null };
    } catch (error) {
      return { test, index: i, result: null, response: null, error };
    }
  });

  const settled = await Promise.all(testPromises);

  // Print results in order
  const results = { passed: 0, failed: 0, errors: 0, byCategory: {} };

  for (const { test, index, result, response, error } of settled) {
    const prefix = `[${index + 1}/${tests.length}]`;

    if (!results.byCategory[test.category]) {
      results.byCategory[test.category] = { passed: 0, failed: 0, errors: 0, total: 0 };
    }
    results.byCategory[test.category].total++;

    if (error) {
      console.log(`  ${prefix} ${test.category} > ${test.name}... ERROR: ${error.message}`);
      results.errors++;
      results.byCategory[test.category].errors++;
    } else if (result.passed) {
      console.log(`  ${prefix} ${test.category} > ${test.name}... PASS (${result.found.length}/${test.expectedKeywords.length} keywords)`);
      results.passed++;
      results.byCategory[test.category].passed++;
    } else {
      console.log(`  ${prefix} ${test.category} > ${test.name}... FAIL (${result.found.length}/${test.expectedKeywords.length} keywords)`);
      console.log(`     Question: "${test.question}"`);
      console.log(`     Found:    ${result.found.length > 0 ? result.found.join(', ') : '(none)'}`);
      console.log(`     Missing:  ${result.missing.join(', ')}`);
      const short = response.length > 150 ? response.substring(0, 150) + '...' : response;
      console.log(`     Response:  ${short}`);
      results.failed++;
      results.byCategory[test.category].failed++;
    }
  }

  // Summary
  console.log('\n══════════════════════════════════════════════════════════════');
  console.log('  RESULTS SUMMARY');
  console.log('══════════════════════════════════════════════════════════════\n');

  console.log('  By category:');
  for (const [cat, data] of Object.entries(results.byCategory)) {
    const icon = data.failed === 0 && data.errors === 0 ? '✅' : data.passed === 0 ? '❌' : '⚠️';
    console.log(`    ${icon} ${cat}: ${data.passed}/${data.total} passed`);
  }

  console.log(`\n  Total: ${results.passed} passed, ${results.failed} failed, ${results.errors} errors out of ${tests.length} tests`);
  console.log(`  Pass rate: ${Math.round((results.passed / tests.length) * 100)}%\n`);

  if (results.failed > 0 || results.errors > 0) {
    console.log('  Note: Some failures may be due to AI paraphrasing (not using exact keywords).');
    console.log('  Review the responses above to check if the answer was semantically correct.\n');
  }
}

main();
