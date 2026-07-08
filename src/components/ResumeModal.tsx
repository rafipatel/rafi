import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { socialLinks } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const previewLink = socialLinks.cv.replace("/view?usp=sharing", "/preview");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] max-w-4xl gap-0 p-0">
        <DialogHeader className="border-b border-border p-5">
          <div className="mr-8 flex items-center justify-between">
            <DialogTitle className="font-serif text-xl font-semibold">
              Resume — Raafi Riyaz
            </DialogTitle>
            <Button size="sm" asChild>
              <a href={socialLinks.cv} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </DialogHeader>

        <div className="p-5">
          <iframe
            src={previewLink}
            className="h-[72vh] w-full rounded-md border border-border"
            title="Resume"
            allow="autoplay"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
