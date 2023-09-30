import { useState } from 'react';
import { Expand, Loader2 } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import { useResizeDetector } from 'react-resize-detector';
import { Document, Page } from 'react-pdf';

import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface PDFFullscreenProps {
  fileUrl: string;
}

const PDFFullScreen = ({ fileUrl }: PDFFullscreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  const [totalNumberOfPages, setTotalNumberOfPages] = useState<
    number | undefined
  >();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) {
          setIsOpen(false);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant="ghost" className="gap-1.5" aria-label="fullscreen">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                });
              }}
              onLoadSuccess={({ numPages }) => setTotalNumberOfPages(numPages)}
              file={fileUrl}
              className="max-h-full"
            >
              {new Array(totalNumberOfPages).fill(0).map((_, i) => (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              ))}
            </Document>
            S
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PDFFullScreen;
