"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FeedbackModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formUrl?: string
}

export function FeedbackModal({ open, onOpenChange, formUrl }: FeedbackModalProps) {
  // Default Google Form URL - user should replace this with their actual form URL
  const defaultFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdExample/viewform?embedded=true"
  const iframeUrl = formUrl || defaultFormUrl

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">Share Your Feedback</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Help us improve the assessment by sharing your experience and suggestions.
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          {formUrl ? (
            <div className="w-full h-[600px] border rounded-lg overflow-hidden">
              <iframe
                src={iframeUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Feedback Form"
                className="w-full h-full"
              >
                Loading feedback form...
              </iframe>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <X className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Feedback Form Not Configured</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                To enable feedback collection, please provide a Google Form URL in the FeedbackModal component.
              </p>
              <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg max-w-lg mx-auto">
                <p className="font-medium mb-2">To set up feedback collection:</p>
                <ol className="text-left space-y-1">
                  <li>1. Create a Google Form for feedback</li>
                  <li>2. Get the embed URL from Form → Send → Embed HTML</li>
                  <li>3. Replace the formUrl prop in the FeedbackModal component</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
