<!-- 66e6e5fe-4bee-40b5-a018-e0e86b70c3a0 5a6cc2e6-3361-45dd-81d2-acc976f3945e -->
# Assessment Platform Improvements Plan

## Priority 1: Fix Mobile Responsiveness

### Issue Identified (Based on Screenshots)

The mobile UI has a critical horizontal overflow issue on the questions page:

- **Root Cause**: The five Likert scale answer buttons are forced into a single horizontal row without wrapping
- **Visual Impact**: Content overflows beyond screen width, causing horizontal scrolling
- **User Impact**: The "Strongly Agree" button and potentially other options are cut off and inaccessible
- **Technical Issue**: The flex container lacks `flex-wrap`, causing buttons to overflow instead of wrapping to new lines

Additional issues on other pages:

- TabsList with 4 tabs needs better mobile handling on results page
- RadarChart has fixed 500px size that doesn't adapt to mobile
- Resource page layouts need verification

### Files to Modify

**app/assessment/questions/page.tsx** (CRITICAL FIX)

**Line 111: Likert Scale Button Container**

Current problem:

```tsx
<div className="flex justify-between gap-2">
```

Fix with `flex-wrap`:

```tsx
<div className="flex flex-wrap justify-center gap-2 sm:justify-between">
```

Changes explained:

- `flex-wrap` - Allows buttons to wrap to next line on narrow screens
- `justify-center` - Centers wrapped buttons for better mobile appearance
- `sm:justify-between` - Returns to space-between layout on larger screens
- `gap-2` - Provides consistent spacing both horizontally and vertically

**Lines 113-138: Individual Likert Buttons**

Add responsive width classes to each button wrapper:

```tsx
<button
  className={cn(
    "w-[48%] sm:flex-1 flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border-2 transition-all",
    // ... rest of classes
  )}
>
```

Changes:

- `w-[48%]` - Makes buttons take ~half width on mobile (2-column grid)
- `sm:flex-1` - Returns to flexible width on larger screens
- `p-3 sm:p-4` - Reduces padding on mobile for better fit

**Lines 101-108: Scale Labels**

Add mobile responsiveness:

```tsx
<div className="flex justify-between items-start gap-4 text-xs sm:text-sm">
```

**Lines 179-188: Navigation Buttons**

Ensure proper mobile sizing:

```tsx
<div className="flex justify-between gap-2 sm:gap-4 pt-4">
  <Button className="flex-1 sm:flex-initial">...</Button>
</div>
```

**app/assessment/demographics/page.tsx**

- Verify form inputs have proper mobile padding
- Ensure Select components don't overflow

**app/assessment/results/page.tsx**

- Line 196: Change TabsList to wrap on mobile:
```tsx
<TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
```

- Line 233: Make RadarChart responsive (pass smaller size on mobile)

**app/resources/tools/page.tsx**

- Verify existing responsive classes work correctly
- Test all tabs for proper mobile rendering

**components/radar-chart.tsx**

- Accept responsive size or calculate internally based on viewport

### Testing Checklist

- [ ] No horizontal scrolling on any assessment page at 375px width
- [ ] All 5 Likert scale buttons are visible and tappable on mobile
- [ ] Buttons wrap to 2-column layout on narrow screens
- [ ] Navigation buttons are properly sized and accessible
- [ ] TabsList doesn't overflow and tabs are accessible
- [ ] RadarChart scales appropriately for screen size

## Priority 2: Enhance Landing Page

### Goal

Add comprehensive educational section explaining the assessment, 12 metrics, and 5 archetypes

### New Component to Create

**components/landing/assessment-intro.tsx**

- Create accordion component with three main sections:

  1. "How It Works" - Explain the 29-question assessment and 4-layer scoring
  2. "The 12 Learning Dimensions" - Card grid showing each metric with icon and brief description
  3. "The 5 Archetypes" - Card grid showing each archetype with icon and 2-3 sentence description

- Use Accordion from shadcn/ui for expandable sections
- Use Card components for metrics and archetypes
- Add icons from lucide-react for visual appeal

**lib/constants/landing-content.ts** (Create new file)

```typescript
export const METRICS_INFO = [
  { key: "self-regulation", name: "Self-Regulation", icon: "Target", description: "..." },
  // ... 11 more metrics
]

export const ARCHETYPES_INFO = [
  { key: "organizer", name: "The Organizer", icon: "Calendar", description: "...", color: "blue" },
  // ... 4 more archetypes
]
```

### File to Modify

**app/page.tsx**

- Add import for new AssessmentIntro component
- Insert component after the features grid (after line 60) and before CTA section (line 63)
- Position: Between features and "Ready to Begin" card

## Priority 3: Implement PDF Report Download

### Dependencies to Install

```bash
pnpm add jspdf html2canvas
```

### New Component to Create

**components/report/printable-report.tsx**

- Create print-optimized layout component
- Include: Archetype header, radar chart, top 3 strengths, top 3 development areas, metric breakdown
- Use A4 page dimensions: 210mm x 297mm
- Exclude: Tabs, interactive elements, navigation
- Style for print: black text on white, simplified layout

### Files to Modify

**app/assessment/results/page.tsx**

- Add imports: `import jsPDF from 'jspdf'` and `import html2canvas from 'html2canvas'`
- Add state: `const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)`
- Create handleDownload function:
```typescript
const handleDownload = async () => {
  setIsGeneratingPdf(true)
  // Render PrintableReport to hidden div
  // Use html2canvas to convert to image
  // Use jsPDF to create PDF
  // Trigger download
  setIsGeneratingPdf(false)
}
```

- Line 349: Change Download button from disabled to active with onClick handler
- Add hidden div with PrintableReport component for PDF generation

## Priority 4: Integrate Feedback Modal

### New Component to Create

**components/feedback/feedback-modal.tsx**

- Create Dialog component wrapper (using shadcn/ui Dialog)
- Embed Google Form iframe inside dialog
- Props: `open`, `onOpenChange`, `formUrl`
- Styling: max-width 800px, responsive height
- Close button in dialog header

### Files to Modify

**app/assessment/results/page.tsx**

- Add state: `const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)`
- Add button in actions section:
```tsx
<Button onClick={() => setFeedbackModalOpen(true)}>
  <MessageSquare className="mr-2 w-4 h-4" />
  Share Feedback
</Button>
```

- Import and render FeedbackModal at bottom of component
- You'll need to provide the Google Form embed URL

### Google Form Setup

- User needs to create Google Form first
- Get embed URL from Form → Send → Embed HTML
- Pass URL to FeedbackModal component as prop

## Priority 5: Populate Resource Content

### Files to Modify

**Database Seeding Scripts**

1. **scripts/02-seed-organizer-archetype.sql** through **scripts/06-seed-reflective-thinker-archetype.sql**

   - User has archetype content ready
   - Update the INSERT statements for archetypes table with enhanced content
   - Add more interaction_stories if available
   - Expand growth_strategies with user's content

2. **scripts/08-seed-tools-bank.sql**

   - Already well-populated (50+ tools)
   - Verify all archetype_tools mappings are complete

3. **Create new file: scripts/09-seed-techniques-bank.sql**

   - Add INSERT statements for techniques table
   - Add technique_tools mappings

### UI Pages to Verify/Update

**app/resources/techniques/page.tsx** (May need to create)

- Similar structure to tools page
- Fetch from `/api/resources/techniques`
- Display techniques with linked tools

**app/resources/archetypes/page.tsx** (May need to create)

- Browse all 5 archetypes
- Show detailed breakdown of each
- Display associated tools and strategies

## Implementation Order

1. Mobile Responsiveness (2-3 hours) - Critical for usability
2. Landing Page Enhancement (2-3 hours) - High impact on conversions
3. PDF Download (3-4 hours) - Key feature addition
4. Feedback Modal (1-2 hours) - Quick win for user insights
5. Resource Content (4-6 hours) - Content-heavy, can iterate

### To-dos

- [ ] Fix mobile UI issues across assessment flow, results, and resources pages
- [ ] Create and integrate comprehensive educational section on landing page
- [ ] Implement PDF report download functionality with print-optimized layout
- [ ] Create and integrate feedback modal with Google Form embed
- [ ] Populate database with archetype details and techniques content