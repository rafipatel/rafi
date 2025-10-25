import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 glass border-primary/20">
        <DialogHeader className="p-6 pb-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold gradient-text">
              Resume - Rafi Ahmed Patel
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                asChild
              >
                <a
                  href="https://docs.google.com/document/d/1sNF1vzBpYc1qbRfekIac0mYG5mOGdx-V/export?format=pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="h-full p-6">
          <div className="prose prose-invert max-w-none">
            <iframe
              src="https://docs.google.com/document/d/e/2PACX-1vS-BxYeE0l_l4EeZIDiQLKZlw2-lwNPeHj_zi5EpxWnOKnciREOG1bVka4Uc3gurg/pub?embedded=true"
              className="w-full h-[70vh] rounded-lg border border-border/50"
              title="Resume"
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;